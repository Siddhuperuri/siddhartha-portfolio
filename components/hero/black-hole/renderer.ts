import {
  clock,
  frame,
  init,
  surface,
  timer,
  type Frame,
  type Gpu,
  type Surface,
  type Timer,
  type TimerSpan,
} from "vgpu";

import {
  createEffects,
  createTargets,
  destroyTargets,
  PASS_COUNT,
  prewarm,
  renderChain,
  setBindings,
  type Orbit,
} from "./pipeline";
import {
  createQualityGovernor,
  MIN_DETAIL,
  PROBE_DETAIL,
  type Detail,
} from "./quality";

interface RendererOptions {
  canvas: HTMLCanvasElement;
  /**
   * Fires when rendering fails *after* `ready` has resolved (resize, a frame,
   * device loss). The renderer has already disposed itself by then. Failures
   * during start-up reject `ready` instead.
   */
  onError?: (error: unknown) => void;
}

type Size = readonly [number, number];

const REST_ORBIT: Orbit = [0, 0.05];
// Disc phase used for the single still frame under prefers-reduced-motion.
const STILL_TIME = 6;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const DPR_RANGE = [1, 1.6] as const;
const FRAME_SECONDS = 1 / 60;

// Start-up probe: GPU time it may spend per detail level, and the most frames.
const PROBE_BUDGET_MS = 60;
const PROBE_FRAMES = 6;
// A probe frame that has not completed by now means the device cannot draw this.
const PROBE_TIMEOUT_MS = 1000;
// Display refreshes sampled to learn the refresh interval, and how long to wait
// for them: a busy page start can hold them back, and a background tab gets no
// animation frames at all.
const REFRESH_SAMPLES = 12;
const REFRESH_TIMEOUT_MS = 1500;
// With frames still counted as on the GPU this long after the last one was
// submitted, a completion callback was lost; the count starts over.
const IN_FLIGHT_TIMEOUT_MS = 1000;
// Completed frames in a row without an exact timing before giving up on those.
// Some go missing in normal running: only a few readbacks can be pending at once.
const UNTIMED_FRAMES = 60;

export function createRenderer(options: RendererOptions) {
  let disposed = false;
  let started = false;
  let visible = true;
  let gpu: Gpu | undefined;
  let gpuClock: ReturnType<typeof clock> | undefined;
  let canvasSurface: Surface | undefined;
  let effects: ReturnType<typeof createEffects> | undefined;
  let targets: ReturnType<typeof createTargets> | undefined;
  let input: ReturnType<typeof installOrbitInput> | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let visibilityObserver: IntersectionObserver | undefined;
  let resizeFrame = 0;
  let lastDpr = window.devicePixelRatio;

  // What the current targets were built for, and the detail frames are drawn at.
  let targetSize: Size = [0, 0];
  let detail: Detail = MIN_DETAIL;

  const governor = createQualityGovernor();
  let loopFrame = 0;
  let lastDraw = 0;
  let frameDelta = FRAME_SECONDS;

  // GPU time per frame, for the governor. Exact pass timings where the device
  // has timestamp queries (they are not thrown off by a busy main thread);
  // otherwise the wait for each frame to complete.
  let gpuTimer: Timer | undefined;
  let passTimers: TimerSpan[] | undefined;
  // Whether an exact timing ever arrived, and frames completed since the last
  // one: timestamp queries that do not report are no use, and the wait is the
  // fallback.
  let timed = false;
  let untimed = 0;
  // Frames submitted and not yet completed, and when the last one completed.
  let inFlight = 0;
  let lastDoneAt = 0;
  // Start-up probe in progress: exact timings seen so far, and what to call as
  // each frame completes.
  let probe: { exact: number[]; completed: () => void } | undefined;
  let probeTimeout = 0;

  const motionQuery = window.matchMedia(reducedMotionQuery);
  let reducedMotion = motionQuery.matches;

  const drawFrame = (currentFrame: Frame) => {
    if (disposed || !effects || !targets || !canvasSurface || !input || !gpuClock)
      return;
    effects.scene.set({
      params: {
        pointer: reducedMotion ? REST_ORBIT : input.update(frameDelta),
        time: reducedMotion ? STILL_TIME : gpuClock.time,
        farStep: detail.farStep,
      },
    });
    renderChain(currentFrame, effects, targets, canvasSurface, passTimers);
  };

  // A throwing frame callback would escape into requestAnimationFrame, where
  // nothing can catch it. Cancel the frame and fail outside it instead
  // (disposing the device mid-frame is not allowed).
  const tick = (currentFrame: Frame) => {
    try {
      drawFrame(currentFrame);
    } catch (error) {
      currentFrame.cancel();
      queueMicrotask(() => fail(error));
    }
  };

  // Detail for the next frame. A still frame (reduced motion, or a device that
  // cannot animate this) has no frame rate to hold, so it gets full detail
  // wherever one frame of that is affordable; an animated one gets whatever the
  // governor settled on.
  const sceneDetail = () =>
    reducedMotion || governor.still ? governor.stillDetail() : governor.detail;

  /** Backing size of the canvas, or undefined while it has no layout box. */
  const measure = (): Size | undefined => {
    const rect = options.canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return undefined;
    const dpr = Math.min(
      DPR_RANGE[1],
      Math.max(DPR_RANGE[0], window.devicePixelRatio || 1),
    );
    return [
      Math.max(1, Math.round(rect.width * dpr)),
      Math.max(1, Math.round(rect.height * dpr)),
    ];
  };

  /**
   * Makes `next` the detail frames are drawn at, rebuilding the targets when
   * its scale or the canvas size no longer matches them. Never called from
   * inside a frame. Returns false on failure, after the renderer was torn down.
   */
  const applyDetail = (next: Detail, size: Size = targetSize): boolean => {
    if (!gpu || !effects || !targets) return false;
    if (
      size[0] !== targetSize[0] ||
      size[1] !== targetSize[1] ||
      next.scale !== detail.scale
    ) {
      try {
        const previousTargets = targets;
        const nextTargets = createTargets(gpu, size, next.scale);
        try {
          setBindings(effects, nextTargets);
        } catch (error) {
          destroyTargets(nextTargets);
          throw error;
        }
        targets = nextTargets;
        targetSize = size;
        destroyTargets(previousTargets);
      } catch (error) {
        fail(error);
        return false;
      }
    }
    detail = next;
    return true;
  };

  const renderStill = () => {
    if (disposed || !gpu || !applyDetail(sceneDetail())) return;
    try {
      frame(gpu, tick);
    } catch (error) {
      fail(error);
    }
  };

  const reportFrameTime = (ms: number, source: "exact" | "waited") => {
    if (disposed) return;
    if (source === "exact") {
      if (ms <= 0) return;
      timed = true;
      untimed = 0;
    } else if (passTimers && ++untimed > UNTIMED_FRAMES) {
      dropExactTimings();
    }

    if (probe) {
      if (source === "exact") probe.exact.push(ms);
      else probe.completed();
    } else if (loopFrame && (source === "exact") === (passTimers !== undefined)) {
      governor.frameDone(ms);
    }
  };

  /** Draws a frame and reports how long the GPU took over it. */
  const present = (device: Gpu) => {
    const submitted = performance.now();
    frame(device, tick);
    inFlight++;
    const completed = () => {
      inFlight = Math.max(0, inFlight - 1);
      // Counted from when the GPU could start on this frame, which is not
      // before it finished the previous one.
      const doneAt = performance.now();
      const waited = doneAt - Math.max(submitted, lastDoneAt);
      lastDoneAt = doneAt;
      reportFrameTime(waited, "waited");
    };
    device.gpu.queue.onSubmittedWorkDone().then(completed, completed);
  };

  const dropExactTimings = () => {
    passTimers = undefined;
    gpuTimer?.dispose();
    gpuTimer = undefined;
    untimed = 0;
  };

  /**
   * Draws `count` frames back to back and resolves with the GPU time per frame,
   * in ms. Rejects when they do not complete in time: a device that slow (or
   * one that was lost meanwhile) is better served by the static backdrop.
   */
  const burst = (device: Gpu, count: number) =>
    new Promise<number>((resolve, reject) => {
      const exact: number[] = [];
      const started = performance.now();
      let pending = count;
      const settle = (error?: unknown) => {
        window.clearTimeout(probeTimeout);
        probe = undefined;
        if (error) {
          reject(error);
          return;
        }
        const elapsed = performance.now() - started;
        // Exact timings are the better figure, where frames this close
        // together got any. A pass cannot outlast the whole burst, though.
        if (exact.length && Math.min(...exact) > elapsed + 1) dropExactTimings();
        resolve(passTimers && exact.length ? Math.min(...exact) : elapsed / count);
      };
      probe = {
        exact,
        completed: () => {
          if (--pending === 0) settle();
        },
      };
      probeTimeout = window.setTimeout(
        () => settle(new Error("The GPU is too slow to render the black hole.")),
        PROBE_TIMEOUT_MS,
      );
      try {
        for (let i = 0; i < count; i++) present(device);
      } catch (error) {
        settle(error);
      }
    });

  /**
   * Times a few frames before anything is shown and lets the governor pick the
   * starting level from them, so a slow GPU never has to stutter through
   * full-detail frames first. Two detail levels separate the per-pixel cost of
   * the ray-march from the fixed cost of a frame.
   */
  const calibrate = async (device: Gpu, displayMs: number | undefined) => {
    const fastest = async (level: Detail, frames: number) => {
      if (!applyDetail(level)) return undefined;
      const frameMs = await burst(device, frames);
      return disposed ? undefined : frameMs;
    };
    const affordable = (frameMs: number) =>
      Math.min(PROBE_FRAMES, Math.floor(PROBE_BUDGET_MS / Math.max(frameMs, 0.1)));

    // One frame first: its time decides how many more the probe can afford.
    // The rest go back to back — an idle GPU runs at a low clock, and it takes
    // sustained work to bring it up — and the faster figure counts.
    const first = await fastest(MIN_DETAIL, 1);
    if (first === undefined) return;
    const more = affordable(first);
    const rest = more > 1 ? await fastest(MIN_DETAIL, more) : first;
    if (rest === undefined) return;
    const minDetailMs = Math.min(first, rest);

    const frames = affordable((minDetailMs * PROBE_DETAIL.cost) / MIN_DETAIL.cost);
    const probeDetailMs = frames > 0 ? await fastest(PROBE_DETAIL, frames) : undefined;
    if (disposed) return;
    // Not one exact timing over the whole probe: they are not coming.
    if (!timed) dropExactTimings();

    governor.calibrate({
      displayMs,
      minDetailMs,
      probeDetailMs,
      exact: passTimers !== undefined,
    });
  };

  const loopTick = (timestamp: number) => {
    loopFrame = requestAnimationFrame(loopTick);
    const device = gpu;
    if (!device) return;
    if (inFlight > 0 && timestamp - lastDraw > IN_FLIGHT_TIMEOUT_MS) inFlight = 0;

    // One frame still on the GPU is normal: it may complete just after the
    // next refresh. Two means the GPU is not keeping up, and queueing a third
    // would only add latency and starve the rest of the page; skipping the
    // refresh instead lets the frame rate follow what the GPU can do.
    const draw = governor.tick(timestamp, inFlight >= 2);
    if (governor.still) {
      sync();
      return;
    }
    // The governor may have changed level since the last frame.
    if (!applyDetail(sceneDetail()) || !draw) return;

    // Capped so the orbit eases back in, rather than snapping, after a pause.
    frameDelta = lastDraw ? Math.min((timestamp - lastDraw) / 1000, 0.1) : FRAME_SECONDS;
    lastDraw = timestamp;
    try {
      present(device);
    } catch (error) {
      fail(error);
    }
  };

  const stopLoop = () => {
    if (!loopFrame) return;
    cancelAnimationFrame(loopFrame);
    loopFrame = 0;
  };

  // The disc only needs the loop while it is on screen and allowed to move.
  // Otherwise: no GPU work at all (offscreen), or one still frame (reduced
  // motion, or a device that cannot animate this).
  const sync = () => {
    if (disposed || !started || !gpu) return;
    const animate = visible && !reducedMotion && !governor.still;

    if (animate && !loopFrame) {
      lastDraw = 0;
      governor.resume();
      loopFrame = requestAnimationFrame(loopTick);
    } else if (!animate) {
      stopLoop();
    }

    if (visible && !animate) renderStill();
  };

  const applyResize = () => {
    resizeFrame = 0;
    const size = measure();
    if (disposed || !size || !applyDetail(sceneDetail(), size)) return;
    // No loop is running to pick up the new size when the frame is a still.
    if (visible && !loopFrame) renderStill();
  };

  const scheduleResize = () => {
    if (disposed || resizeFrame) return;
    resizeFrame = requestAnimationFrame(applyResize);
  };

  const onWindowResize = () => {
    if (window.devicePixelRatio === lastDpr) return;
    lastDpr = window.devicePixelRatio;
    scheduleResize();
  };

  const onMotionChange = () => {
    reducedMotion = motionQuery.matches;
    sync();
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    window.clearTimeout(probeTimeout);
    stopLoop();
    resizeObserver?.disconnect();
    visibilityObserver?.disconnect();
    window.removeEventListener("resize", onWindowResize);
    motionQuery.removeEventListener("change", onMotionChange);
    input?.dispose();
    gpu?.dispose();
  };

  function fail(error: unknown): void {
    if (disposed) return;
    dispose();
    options.onError?.(error);
  }

  const initialize = async () => {
    if (!("gpu" in navigator)) {
      throw new Error("WebGPU is not available in this browser.");
    }

    // Sampled while the device and pipelines are being created.
    const displayInterval = measureDisplayInterval();

    const adapter = await navigator.gpu.requestAdapter();
    if (disposed) return;
    if (!adapter) throw new Error("No WebGPU adapter is available.");
    // A software adapter ray-marches on the CPU: seconds per frame, with the
    // page frozen meanwhile. The static backdrop is the better hero there.
    if (adapter.info?.isFallbackAdapter) {
      throw new Error("WebGPU is only available through a software adapter.");
    }

    const nextGpu = await (adapter.features.has("timestamp-query")
      ? init({ requiredFeatures: ["timestamp-query"] }).catch(() => init())
      : init());
    if (disposed) {
      nextGpu.dispose();
      return;
    }

    gpu = nextGpu;
    if (gpu.device.features.has("timestamp-query")) {
      const passTimer = timer(gpu);
      const spans = Array.from({ length: PASS_COUNT }, (_, pass) =>
        passTimer.span(`pass-${pass}`),
      );
      passTimer.onResults((results) => {
        let total = 0;
        for (const span of spans) total += results[span.name] ?? 0;
        reportFrameTime(total, "exact");
      });
      gpuTimer = passTimer;
      passTimers = spans;
    }

    gpuClock = clock(gpu);
    canvasSurface = surface(gpu, options.canvas, { dpr: DPR_RANGE });
    targetSize = canvasSurface.size;
    targets = createTargets(gpu, targetSize, detail.scale);
    effects = createEffects(gpu, targets);
    setBindings(effects, targets);
    await prewarm(effects, targets, canvasSurface);
    if (disposed) return;

    // Before the probe: its frames go through the same draw path as any other.
    input = installOrbitInput(options.canvas);
    await calibrate(gpu, await displayInterval);
    if (disposed || !applyDetail(sceneDetail(), measure() ?? targetSize)) return;

    resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(scheduleResize);
    resizeObserver?.observe(options.canvas);
    window.addEventListener("resize", onWindowResize);
    motionQuery.addEventListener("change", onMotionChange);
    if (typeof IntersectionObserver !== "undefined") {
      visibilityObserver = new IntersectionObserver((entries) => {
        visible = entries[entries.length - 1]?.isIntersecting ?? true;
        sync();
      });
      visibilityObserver.observe(options.canvas);
    }

    void gpu.gpu.lost.then((info) => {
      if (info.reason !== "destroyed")
        fail(new Error(`GPU device lost: ${info.message}`));
    });

    started = true;
    sync();
  };

  const ready = initialize().catch((error: unknown) => {
    if (disposed) return;
    dispose();
    throw error;
  });

  return { ready, resize: scheduleResize, dispose };
}

/**
 * Time between display refreshes, in ms. Resolves `undefined` when no animation
 * frames arrive (a background tab).
 */
function measureDisplayInterval(): Promise<number | undefined> {
  return new Promise((resolve) => {
    const intervals: number[] = [];
    let last = 0;
    let request = 0;

    const finish = () => {
      cancelAnimationFrame(request);
      window.clearTimeout(timeout);
      // A busy page start stretches intervals but never shortens them, so the
      // display's own interval is near the low end of what was seen.
      intervals.sort((a, b) => a - b);
      resolve(intervals.length ? intervals[intervals.length >> 2] : undefined);
    };
    const timeout = window.setTimeout(
      finish,
      document.visibilityState === "hidden" ? 0 : REFRESH_TIMEOUT_MS,
    );

    const sample = (timestamp: number) => {
      if (last) intervals.push(timestamp - last);
      last = timestamp;
      if (intervals.length >= REFRESH_SAMPLES) finish();
      else request = requestAnimationFrame(sample);
    };
    request = requestAnimationFrame(sample);
  });
}

function installOrbitInput(canvas: HTMLCanvasElement) {
  let yaw = 0;
  let pitch = 0.05;
  let targetYaw = 0;
  let targetPitch = 0.05;
  let activePointer: number | undefined;
  const previousTouchAction = canvas.style.touchAction;
  // The canvas fills a hero in a scrolling page, so touch must still be able to
  // scroll vertically over it (`none` would trap the page under the hero).
  canvas.style.touchAction = "pan-y";

  const down = (event: PointerEvent) => {
    if (!event.isPrimary || activePointer !== undefined) return;
    activePointer = event.pointerId;
    canvas.setPointerCapture?.(event.pointerId);
  };

  const move = (event: PointerEvent) => {
    if (
      !event.isPrimary ||
      (activePointer !== undefined && event.pointerId !== activePointer)
    ) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)),
    );
    const y = Math.max(
      0,
      Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)),
    );
    targetYaw = (0.5 - x) * Math.PI * 1.4;
    targetPitch = Math.max(
      -Math.PI * 0.42,
      Math.min(Math.PI * 0.42, (y - 0.5) * Math.PI * 0.7),
    );
  };

  const end = (event: PointerEvent) => {
    if (event.pointerId !== activePointer) return;
    if (canvas.hasPointerCapture?.(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
    activePointer = undefined;
  };

  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);

  return {
    /** `deltaSeconds` is the time since the previous drawn frame. */
    update(deltaSeconds: number): Orbit {
      // 12% of the remaining distance per frame at 60 fps, expressed over time
      // so the orbit eases at the same speed whatever rate frames are drawn at.
      const ease = 1 - Math.pow(1 - 0.12, deltaSeconds / FRAME_SECONDS);
      yaw += (targetYaw - yaw) * ease;
      pitch += (targetPitch - pitch) * ease;
      return [yaw, pitch];
    },
    dispose() {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", end);
      canvas.removeEventListener("pointercancel", end);
      if (activePointer !== undefined && canvas.hasPointerCapture?.(activePointer)) {
        canvas.releasePointerCapture(activePointer);
      }
      activePointer = undefined;
      canvas.style.touchAction = previousTouchAction;
    },
  };
}
