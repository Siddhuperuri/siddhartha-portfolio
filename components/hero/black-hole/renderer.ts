import {
  clock,
  frame,
  frameLoop,
  init,
  surface,
  type Frame,
  type FrameLoopHandle,
  type Gpu,
  type Surface,
} from "vgpu";

import {
  createEffects,
  createTargets,
  destroyTargets,
  prewarm,
  renderChain,
  setBindings,
  type Orbit,
} from "./pipeline";

interface RendererOptions {
  canvas: HTMLCanvasElement;
  /**
   * Fires when rendering fails *after* `ready` has resolved (resize, a frame,
   * device loss). The renderer has already disposed itself by then. Failures
   * during start-up reject `ready` instead.
   */
  onError?: (error: unknown) => void;
}

interface RenderSize {
  width: number;
  height: number;
  dpr: number;
}

const REST_ORBIT: Orbit = [0, 0.05];
// Disc phase used for the single still frame under prefers-reduced-motion.
const STILL_TIME = 6;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

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
  let loop: FrameLoopHandle | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let visibilityObserver: IntersectionObserver | undefined;
  let resizeFrame = 0;
  let pendingSize: RenderSize | undefined;
  let lastDpr = window.devicePixelRatio;

  const motionQuery = window.matchMedia(reducedMotionQuery);
  let reducedMotion = motionQuery.matches;

  const drawFrame = (currentFrame: Frame) => {
    if (disposed || !effects || !targets || !canvasSurface || !input || !gpuClock)
      return;
    effects.scene.set({
      params: {
        pointer: reducedMotion ? REST_ORBIT : input.update(),
        time: reducedMotion ? STILL_TIME : gpuClock.time,
      },
    });
    renderChain(currentFrame, effects, targets, canvasSurface);
  };

  // A throwing frame callback ends the loop with the error escaping into
  // requestAnimationFrame, where nothing can catch it. Cancel the frame and
  // fail outside it instead (disposing the device mid-frame is not allowed).
  const tick = (currentFrame: Frame) => {
    try {
      drawFrame(currentFrame);
    } catch (error) {
      currentFrame.cancel();
      queueMicrotask(() => fail(error));
    }
  };

  const renderStill = () => {
    if (disposed || !gpu) return;
    try {
      frame(gpu, tick);
    } catch (error) {
      fail(error);
    }
  };

  // The disc only needs the loop while it is on screen and allowed to move.
  // Otherwise: no GPU work at all (offscreen), or one still frame (reduced motion).
  const sync = () => {
    if (disposed || !started || !gpu) return;
    const animate = visible && !reducedMotion;

    if (animate && !loop) {
      loop = frameLoop(gpu, tick);
    } else if (!animate && loop) {
      loop.stop();
      loop = undefined;
    }

    if (visible && reducedMotion) renderStill();
  };

  const applyResize = () => {
    resizeFrame = 0;
    const size = pendingSize;
    pendingSize = undefined;
    if (disposed || !size || !gpu || !effects || !targets || !canvasSurface) return;

    try {
      const previousTargets = targets;
      const nextTargets = createTargets(gpu, [
        Math.max(1, Math.round(size.width * size.dpr)),
        Math.max(1, Math.round(size.height * size.dpr)),
      ]);

      try {
        setBindings(effects, nextTargets);
      } catch (error) {
        destroyTargets(nextTargets);
        throw error;
      }

      targets = nextTargets;
      destroyTargets(previousTargets);
    } catch (error) {
      fail(error);
      return;
    }

    // No loop is running to pick up the new size in reduced-motion mode.
    if (reducedMotion && visible) renderStill();
  };

  const resize = (size: RenderSize) => {
    if (disposed || size.width <= 0 || size.height <= 0) return;
    pendingSize = size;
    if (!resizeFrame) resizeFrame = requestAnimationFrame(applyResize);
  };

  const measure = () => {
    const rect = options.canvas.getBoundingClientRect();
    resize({
      width: rect.width,
      height: rect.height,
      dpr: Math.min(1.6, Math.max(1, window.devicePixelRatio || 1)),
    });
  };

  const onWindowResize = () => {
    if (window.devicePixelRatio === lastDpr) return;
    lastDpr = window.devicePixelRatio;
    measure();
  };

  const onMotionChange = () => {
    reducedMotion = motionQuery.matches;
    sync();
  };

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    resizeObserver?.disconnect();
    visibilityObserver?.disconnect();
    window.removeEventListener("resize", onWindowResize);
    motionQuery.removeEventListener("change", onMotionChange);
    input?.dispose();
    loop?.stop();
    loop = undefined;
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

    const nextGpu = await init();
    if (disposed) {
      nextGpu.dispose();
      return;
    }

    gpu = nextGpu;
    gpuClock = clock(gpu);
    canvasSurface = surface(gpu, options.canvas, { dpr: [1, 1.6] });
    targets = createTargets(gpu, canvasSurface.size);
    effects = createEffects(gpu, targets);
    setBindings(effects, targets);
    await prewarm(effects, targets, canvasSurface);
    if (disposed) return;

    input = installOrbitInput(options.canvas);
    resizeObserver =
      typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(measure);
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
    measure();

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

  return { ready, resize, dispose };
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
    update(): Orbit {
      yaw += (targetYaw - yaw) * 0.12;
      pitch += (targetPitch - pitch) * 0.12;
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
