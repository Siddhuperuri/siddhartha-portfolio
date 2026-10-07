/**
 * Render-quality governor for the black hole.
 *
 * The scene pass ray-marches every pixel, so its cost is proportional to the
 * pixel count and it is by far the most expensive thing on the page. A discrete
 * GPU absorbs that at full resolution; integrated graphics and phones do not,
 * and a saturated GPU stalls scrolling and everything else the page draws.
 *
 * The governor keeps each frame inside the time available for it by moving
 * along a ladder of levels, best first:
 *
 *   1. full detail, drawing on fewer display refreshes — only matters on
 *      high-refresh screens, where 120+ fps is not worth giving up detail for;
 *   2. the same draw rate at lower detail: first longer ray-march steps far
 *      from the hole, then a lower internal resolution as well (the composite
 *      pass upsamples to the canvas, and bloom keeps its size);
 *   3. as a last resort, about 30 fps, then a still frame.
 *
 * It reacts to frames that miss their slot, not to how busy the GPU looks:
 * GPUs lower their clock when the work is light, so a frame that fits easily
 * still measures as most of its slot. For the same reason headroom cannot be
 * read off a measurement, and the way back up is to try the next level and step
 * back, waiting longer each time, if it does not hold.
 *
 * A GPU that holds the top of the ladder never leaves it, so on capable
 * hardware the output is unchanged.
 *
 * Pure logic: no GPU or DOM access, so it can be driven by a simulation.
 */

export interface Detail {
  /** Internal render scale per axis, relative to the canvas' backing size. */
  scale: number;
  /**
   * Longest ray-march step far outside the disc, or 0 to march exactly as
   * authored. Longer steps there cost a sub-pixel shift in the lensed star
   * field and save over 40% of the frame.
   */
  farStep: number;
  /** Cost of the scene pass relative to full detail. */
  cost: number;
}

const FAR_STEP = 0.9;
/**
 * Share of a frame's cost left with the longer far-field steps. Measured at
 * 0.44 to 0.57 depending on the draw rate (a GPU doing less work clocks down).
 */
const FAR_STEP_COST = 0.5;
const reduced = (scale: number): Detail => ({
  scale,
  farStep: FAR_STEP,
  cost: FAR_STEP_COST * scale * scale,
});

/** Detail levels, best first. Each step sheds a quarter to a third of the cost. */
const DETAILS: readonly Detail[] = [
  { scale: 1, farStep: 0, cost: 1 },
  ...[1, 0.86, 0.74, 0.63, 0.54, 0.46, 0.4, 0.34].map(reduced),
];
const LAST_DETAIL = DETAILS.length - 1;

/** Cheapest detail level; the start-up probe is measured at it. */
export const MIN_DETAIL = DETAILS[LAST_DETAIL];
/** Second level of the start-up probe, to separate per-pixel cost from fixed cost. */
export const PROBE_DETAIL = DETAILS[3];

/**
 * Minimum time between drawn frames, in ms: every refresh, then at most about
 * 83, 62 and 33 fps. Time-based rather than "every Nth refresh" so a display
 * that changes its refresh rate keeps the intended draw rate.
 */
const CAPS = [0, 12, 16, 30] as const;
/** Slowest cap that is still given up before detail is. */
const SMOOTH_CAP = 2;
const SLOW_CAP = CAPS.length - 1;
/** Refresh timestamps jitter; a refresh this close to the cap counts as reaching it. */
const CAP_SLACK_MS = 1.5;
/** A cap that lands on a longer draw interval than this is skipped for that display (16 ms at 75 Hz would mean 37 fps). */
const SMOOTH_INTERVAL_MS = 22.5;

/**
 * A frame taking more than this share of its slot is late. Looser when the
 * time is the wait for the frame to complete rather than an exact GPU timing,
 * since that wait includes the hand-off to and from the GPU.
 */
const OVER_LOAD = { exact: 0.95, waited: 1.15 };
/** Frames in a row this far over their slot send a level on trial back at once, without waiting for a window. */
const PANIC_LOAD = { exact: 1.25, waited: 1.5 };
const PANIC_FRAMES = 4;
/**
 * Share of draws that found two frames still on the GPU, above which the level
 * is too high. Only consulted without exact timings: with them a frame's own
 * cost is known, and a backlog it did not cause is not a reason to draw less.
 */
const MISS_SHARE = 0.1;
/** When dropping, the level picked is the best one expected to stay under this... */
const DROP_LOAD = 0.7;
/** ...but no more than this many levels down at once. */
const MAX_DROP = 2;
/**
 * Late windows in a row before a level is given up. One on its own is as
 * likely a stall elsewhere (shaders compiling, another tab) as this level
 * being too much. A level still on trial goes back at the first.
 */
const LATE_WINDOWS = 2;
/**
 * After start-up the rest of the page is still setting itself up, on the main
 * thread and on the GPU, and frames run slow whatever the level. For this long
 * only frames more than GRACE_LOAD over their slot count as late.
 */
const START_GRACE_MS = 5000;
const GRACE_LOAD = 2;
/**
 * The most a frame at full detail may use of its slot. The level below looks
 * the same, so full detail is only taken, and kept, where it is clearly affordable.
 */
const SAFE_LOAD = 0.6;
/**
 * The start-up probe runs while the page is still loading, so it reads slow.
 * Starting levels are accepted up to this predicted load; the first frames
 * correct an over-optimistic start within a fraction of a second.
 */
const START_LOAD = 1.5;
/** Probed this far over even at the lowest level, animating is not attempted at all. */
const HOPELESS_LOAD = 3;

/** Timed frames per decision. */
const WINDOW = 20;
/** Frames ignored after a move down, while new targets settle. */
const SETTLE_FRAMES = 3;
/** Frames ignored after a move up or a restart: a GPU takes a moment to raise its clock for more work. */
const RAMP_FRAMES = 12;
/** Calm windows in a row required before moving up. */
const CALM_WINDOWS = 2;
/** Windows after moving up during which the level is on trial and a failure returns to the one before. */
const TRIAL_WINDOWS = 4;
/** Refreshes this much longer than the display's interval were dropped by the page. */
const DROPPED_TICK = 1.5;
/** A level on trial fails if the page drops this much larger a share of its frames than before it. */
const DROPPED_SHARE = 0.05;
/** Refreshes needed before that share means anything. */
const DROPPED_SAMPLE = 40;
/** Late windows in a row, at the lowest level, before giving up on animating. */
const STILL_WINDOWS = 3;
/** Wait before a level that did not hold is tried again; doubles each time it fails. */
const RETRY_MS = 2500;
const MAX_RETRY_MS = 240_000;
/** A level held for this long has its wait start over. */
const HOLD_MS = 30_000;
/** Longest acceptable GPU time for a one-off still frame. */
const STILL_FRAME_BUDGET_MS = 250;

/** A frame time under this means the browser reported it without waiting for the GPU. */
const UNMEASURED_MS = 0.15;
/** Refresh intervals outside this range are stalls or noise, not a display rate. */
const MIN_TICK_MS = 3;
const MAX_TICK_MS = 100;
const DEFAULT_DISPLAY_MS = 1000 / 60;
/** Refreshes arriving this much slower than the display's rate may mean the page is dropping frames. */
const SLOW_PACE = 1.4;
/** Refreshes to sit out when checking whether a slow pace is this renderer's doing. */
const PACE_TEST_TICKS = 8;

interface Level {
  /** Index into CAPS. */
  cap: number;
  /** Index into DETAILS. */
  detail: number;
}

export interface Calibration {
  /** Refresh interval of the display, in ms, sampled before anything was drawn. */
  displayMs?: number;
  /** GPU time of a frame at MIN_DETAIL, in ms. */
  minDetailMs?: number;
  /** GPU time of a frame at PROBE_DETAIL, in ms, if it was measured. */
  probeDetailMs?: number;
  /** Whether frame times are exact GPU timings rather than the wait for a frame to complete. */
  exact?: boolean;
}

const median = (values: number[]) => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[sorted.length >> 1];
};

export function createQualityGovernor(now: () => number = () => performance.now()) {
  /** Refresh interval of the display, as far as it can be told apart from dropped frames. */
  let displayMs = DEFAULT_DISPLAY_MS;
  /** GPU time that does not shrink with the detail level (bloom, composite). */
  let fixedMs = 0;
  /** GPU time of a frame at MIN_DETAIL from the start-up probe; 0 when it could not be measured. */
  let probedMs = 0;
  let timing: "exact" | "waited" = "waited";
  let level: Level = { cap: SMOOTH_CAP, detail: 0 };
  let still = false;

  let lastTick = 0;
  let lastDraw = 0;
  let tickIntervals: number[] = [];
  let frameTimes: number[] = [];
  let recent: number[] = [];
  let draws = 0;
  let misses = 0;
  let settle = 0;

  let calmWindows = 0;
  let lateWindows = 0;
  let stillWindows = 0;
  let levelSince = 0;
  let graceUntil = 0;
  /** Refreshes, and how many of them the page dropped, over the calm windows so far. */
  let calmTicks = 0;
  let calmDropped = 0;
  /** Windows left of the trial period after a move up, and the level to return to if it fails. */
  let trial = 0;
  let trialFrom: Level | undefined;
  /** The same two counts over the trial, and the share of dropped refreshes before it. */
  let trialTicks = 0;
  let trialDropped = 0;
  let droppedBefore = 0;
  /** Levels that did not hold: when each may be tried again, and the wait after its next failure. */
  const failed = new Map<string, { retryAt: number; waitMs: number }>();
  const key = (entry: Level) => `${entry.cap}:${entry.detail}`;
  /** Refreshes left of a pace test, the intervals seen during it, and the frame time that led to it. */
  let paceTest = 0;
  let paceIntervals: number[] = [];
  let paceFrameMs = 0;

  /** Display refreshes between drawn frames that `cap` works out to. */
  const refreshes = (cap: number) =>
    Math.max(1, Math.ceil((CAPS[cap] - CAP_SLACK_MS) / displayMs));
  /** Time between drawn frames at `cap`, in ms: the slot a frame has to fit in. */
  const slot = (cap: number) => refreshes(cap) * displayMs;

  /** Every level for the current display, best first. */
  const ladder = (): Level[] => {
    // Draw rates at full detail, fastest first. Caps that work out to the same
    // rate on this display collapse into the slowest of them, and one that
    // lands on too slow a rate to count as smooth is left out.
    const rates: number[] = [];
    for (let cap = 0; cap <= SMOOTH_CAP; cap++) {
      if (cap > 0 && slot(cap) > SMOOTH_INTERVAL_MS) break;
      if (rates.length && refreshes(rates[rates.length - 1]) === refreshes(cap)) rates.pop();
      rates.push(cap);
    }
    const smooth = rates[rates.length - 1];

    const levels: Level[] = rates.map((cap) => ({ cap, detail: 0 }));
    for (let detail = 1; detail <= LAST_DETAIL; detail++)
      levels.push({ cap: smooth, detail });
    if (refreshes(SLOW_CAP) > refreshes(smooth))
      levels.push({ cap: SLOW_CAP, detail: LAST_DETAIL });
    return levels;
  };

  /** Index of the current level on `levels`, or of the closest one if the display changed under it. */
  const locate = (levels: Level[]) => {
    const exact = levels.findIndex(
      (entry) => entry.cap === level.cap && entry.detail === level.detail,
    );
    if (exact >= 0) return exact;
    let index = levels.findIndex((entry) => entry.detail === level.detail);
    while (
      levels[index + 1]?.detail === level.detail &&
      levels[index + 1].cap <= level.cap
    )
      index++;
    return index;
  };

  /** GPU time expected at detail level `to`, from a frame measured at `from`. */
  const detailCost = (frameMs: number, from: number, to: number) => {
    const fixed = Math.min(fixedMs, frameMs * 0.8);
    return fixed + ((frameMs - fixed) * DETAILS[to].cost) / DETAILS[from].cost;
  };

  /** Share of its slot a frame would take at `to`, given one measured at `from`. */
  const predictLoad = (frameMs: number, from: Level, to: Level) =>
    detailCost(frameMs, from.detail, to.detail) / slot(to.cap);

  const beginWindow = () => {
    tickIntervals = [];
    frameTimes = [];
    recent = [];
    draws = 0;
    misses = 0;
  };

  const setLevel = (next: Level, settleFrames = SETTLE_FRAMES) => {
    level = next;
    levelSince = now();
    settle = settleFrames;
    calmWindows = 0;
    calmTicks = 0;
    calmDropped = 0;
    lateWindows = 0;
    stillWindows = 0;
    beginWindow();
  };

  /** Puts `next` on trial: it has to hold for a few windows or the level goes back to `from`. */
  const tryLevel = (next: Level, from: Level, droppedShare: number) => {
    setLevel(next, RAMP_FRAMES);
    trial = TRIAL_WINDOWS;
    trialFrom = from;
    trialTicks = 0;
    trialDropped = 0;
    droppedBefore = droppedShare;
  };

  /** Moves down far enough for a frame of `frameMs` to fit again. False at the bottom of the ladder. */
  const drop = (frameMs: number): boolean => {
    const levels = ladder();
    const index = locate(levels);
    if (trial === 0 && index >= levels.length - 1) return false;

    // The level being left waits before it is tried again, longer each time.
    const waitMs = Math.min(
      (failed.get(key(level))?.waitMs ?? RETRY_MS / 2) * 2,
      MAX_RETRY_MS,
    );
    failed.set(key(level), { retryAt: now() + waitMs, waitMs });

    if (trial > 0 && trialFrom) {
      // The level on trial did not hold: back to the one before it.
      trial = 0;
      setLevel(trialFrom);
      return true;
    }
    // From full detail the first step is always the single one to the longer
    // far-field steps: it looks the same, so it is tried before any resolution goes.
    const furthest = level.detail === 0 ? index + 1 : index + MAX_DROP;
    let next = index + 1;
    while (
      next < levels.length - 1 &&
      next < furthest &&
      predictLoad(frameMs, level, levels[next]) > DROP_LOAD
    )
      next++;
    setLevel(levels[next]);
    return true;
  };

  /** Decides on the window just collected. */
  const evaluate = () => {
    const frameMs = median(frameTimes);
    const tickMs = median(tickIntervals);
    const ticks = tickIntervals.length;
    const dropped = tickIntervals.filter((ms) => ms > displayMs * DROPPED_TICK).length;
    const missShare = misses / Math.max(1, draws + misses);
    beginWindow();

    const measured = frameMs >= UNMEASURED_MS;
    const load = frameMs / slot(level.cap);
    // The exact march is held to the stricter limit; see SAFE_LOAD.
    const limit = level.detail === 0 ? SAFE_LOAD : OVER_LOAD[timing];
    const backedUp = timing === "waited" && missShare > MISS_SHARE;
    const settling = now() < graceUntil;
    const late = measured && (settling ? load > GRACE_LOAD : load > limit || backedUp);

    if (tickMs >= MIN_TICK_MS) {
      if (tickMs < displayMs * 0.9) {
        displayMs = tickMs;
      } else if (tickMs > displayMs * SLOW_PACE && !late) {
        // Refreshes are arriving much slower than the display's rate: either
        // this frame is crowding out the rest of the page, or the display
        // itself slowed down (phones and laptops lower their refresh rate to
        // save power, and a window can move to another monitor). A frame that
        // is a small part of its slot cannot be the cause; otherwise sit out a
        // few refreshes and see whether the pace recovers without it.
        if (measured && load <= SAFE_LOAD) {
          displayMs = tickMs;
        } else {
          paceTest = PACE_TEST_TICKS;
          paceIntervals = [];
          paceFrameMs = frameMs;
        }
        return;
      }
    }

    const levels = ladder();
    const index = locate(levels);
    if (levels[index].cap !== level.cap) {
      // The display changed and this draw rate is no longer on the ladder.
      setLevel(levels[index]);
      return;
    }
    if (now() - levelSince > HOLD_MS) failed.delete(key(level));
    // Without usable GPU timings nothing shows a late frame or headroom; the
    // pace test above is then the only thing that moves the level, and only down.
    if (!measured) return;

    if (late) {
      calmWindows = 0;
      if (trial === 0 && ++lateWindows < LATE_WINDOWS) return;
      if (drop(frameMs)) return;
      // Already at the lowest level.
      if (++stillWindows >= STILL_WINDOWS) still = true;
      return;
    }
    lateWindows = 0;
    stillWindows = 0;

    if (trial > 0 && !settling) {
      // On trial: the frames fit, but the level also has to leave the rest of
      // the page the GPU time it had before.
      trialTicks += ticks;
      trialDropped += dropped;
      if (
        trialTicks >= DROPPED_SAMPLE &&
        trialDropped / trialTicks > droppedBefore + DROPPED_SHARE
      ) {
        drop(frameMs);
        return;
      }
      trial--;
    }

    if (index === 0 || missShare > 0) {
      calmWindows = 0;
      calmTicks = 0;
      calmDropped = 0;
      return;
    }
    calmTicks += ticks;
    calmDropped += dropped;
    if (++calmWindows < CALM_WINDOWS) return;

    // One level at a time, and not into one that failed until its wait is over.
    const up = levels[index - 1];
    if (trial > 0 || now() < (failed.get(key(up))?.retryAt ?? 0)) return;
    // Full detail (the exact march, and draw rates above the smooth one) is
    // taken when clearly affordable, never tried on the off chance.
    if (up.detail === 0 && predictLoad(frameMs, level, up) > SAFE_LOAD) return;
    tryLevel(up, level, calmDropped / Math.max(1, calmTicks));
  };

  /** The pace test is over: was the slow pace this renderer's doing? */
  const concludePaceTest = () => {
    const pausedMs = median(paceIntervals);
    beginWindow();
    settle = SETTLE_FRAMES;
    if (pausedMs >= MIN_TICK_MS && pausedMs <= displayMs * 1.2) {
      // The page kept up as soon as this stopped drawing.
      calmWindows = 0;
      if (paceFrameMs >= UNMEASURED_MS) {
        drop(paceFrameMs);
        return;
      }
      // No timings to size the step with: one level, and never below the smooth draw rate.
      const levels = ladder();
      const next = levels[locate(levels) + 1];
      if (next && next.cap !== SLOW_CAP) setLevel(next);
    } else if (pausedMs >= MIN_TICK_MS) {
      // Just as slow without it: the display itself is running slower.
      displayMs = pausedMs;
    }
  };

  return {
    /** Detail level frames should be drawn at. */
    get detail(): Detail {
      return DETAILS[level.detail];
    },
    /** True once the device could not animate even at the lowest level. */
    get still(): boolean {
      return still;
    },

    /** Picks the starting level from the start-up probe, before the first visible frame. */
    calibrate({ displayMs: sampledMs, minDetailMs, probeDetailMs, exact }: Calibration) {
      if (sampledMs !== undefined && sampledMs >= MIN_TICK_MS && sampledMs < MAX_TICK_MS)
        displayMs = sampledMs;
      timing = exact ? "exact" : "waited";
      const levels = ladder();
      level = levels[0];
      if (minDetailMs === undefined || minDetailMs < UNMEASURED_MS) return;
      probedMs = minDetailMs;

      if (probeDetailMs !== undefined) {
        // Two levels: the part that grew with the cost is per-pixel, the rest is fixed.
        const perCost = Math.max(
          0,
          (probeDetailMs - minDetailMs) / (PROBE_DETAIL.cost - MIN_DETAIL.cost),
        );
        fixedMs = Math.max(0, minDetailMs - perCost * MIN_DETAIL.cost);
      }

      const measuredAt: Level = { cap: 0, detail: LAST_DETAIL };
      let index = 0;
      while (
        index < levels.length - 1 &&
        predictLoad(minDetailMs, measuredAt, levels[index]) > START_LOAD
      )
        index++;
      level = levels[index];
      // Do not make the page sit through a stuttering run before giving up.
      still = predictLoad(minDetailMs, measuredAt, level) > HOPELESS_LOAD;
      // The starting level is a guess, so it starts on trial like any move up.
      if (index < levels.length - 1) tryLevel(level, levels[index + 1], 0);
      graceUntil = now() + START_GRACE_MS;
    },

    /**
     * Detail for a one-off still frame, which has no frame rate to hold: full
     * detail unless that single frame would stall the GPU for too long.
     */
    stillDetail(): Detail {
      if (probedMs < UNMEASURED_MS) return DETAILS[0];
      const index = DETAILS.findIndex(
        (_, to) => detailCost(probedMs, LAST_DETAIL, to) <= STILL_FRAME_BUDGET_MS,
      );
      return index < 0 ? MIN_DETAIL : DETAILS[index];
    },

    /** Call when the loop (re)starts, so the gap before it is not read as a slow frame. */
    resume() {
      lastTick = 0;
      lastDraw = 0;
      paceTest = 0;
      settle = RAMP_FRAMES;
      calmWindows = 0;
      calmTicks = 0;
      calmDropped = 0;
      beginWindow();
    },

    /**
     * Call on every display refresh; `backedUp` is whether the GPU is still
     * working through earlier frames. Returns true when a frame should be drawn now.
     */
    tick(timestamp: number, backedUp: boolean): boolean {
      const elapsed = lastTick ? timestamp - lastTick : 0;
      const valid = elapsed >= MIN_TICK_MS && elapsed < MAX_TICK_MS;
      lastTick = timestamp;

      if (paceTest > 0) {
        if (valid) paceIntervals.push(elapsed);
        if (--paceTest === 0) concludePaceTest();
        return false;
      }
      if (valid) tickIntervals.push(elapsed);

      if (still) return false;
      if (lastDraw && timestamp - lastDraw < CAPS[level.cap] - CAP_SLACK_MS) return false;
      if (backedUp) {
        // Due, but the GPU has not caught up: this frame is late.
        misses++;
        return false;
      }
      draws++;
      lastDraw = timestamp;
      return true;
    },

    /** Call with the GPU time of each drawn frame, in ms. */
    frameDone(frameMs: number) {
      if (still || paceTest > 0) return;
      if (settle > 0) {
        if (--settle === 0) beginWindow();
        return;
      }
      frameTimes.push(frameMs);

      if (frameMs >= UNMEASURED_MS) {
        recent.push(frameMs);
        if (recent.length > PANIC_FRAMES) recent.shift();
        const limit = slot(level.cap) * PANIC_LOAD[timing];
        // Only a level on trial goes back this fast; see LATE_WINDOWS.
        if (
          trial > 0 &&
          now() >= graceUntil &&
          recent.length === PANIC_FRAMES &&
          recent.every((ms) => ms > limit)
        ) {
          drop(median(recent));
          return;
        }
      }

      if (frameTimes.length >= WINDOW) evaluate();
    },
  };
}

export type QualityGovernor = ReturnType<typeof createQualityGovernor>;
