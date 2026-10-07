import {
  effect,
  sampler,
  target,
  type Frame,
  type Gpu,
  type Surface,
  type Target,
  type TimerSpan,
} from "vgpu";

import blackHoleWgsl from "./black-hole.wgsl";
import blurWgsl from "./blur.wgsl";
import brightPassWgsl from "./bright-pass.wgsl";
import compositeWgsl from "./composite.wgsl";

type Output = Surface | Target;
export type Orbit = readonly [number, number];
const CLEAR = [0, 0, 0, 1] as const;
const BLURS = [
  { direction: [1, 0], radius: 1 },
  { direction: [0, 1], radius: 1 },
  { direction: [1, 0], radius: 2.4 },
  { direction: [0, 1], radius: 2.4 },
] as const;
/** Passes in a frame: scene, bright pass, the blurs, composite. */
export const PASS_COUNT = BLURS.length + 3;

export function createEffects(gpu: Gpu, targets: Targets) {
  const samp = sampler(gpu, { minFilter: "linear", magFilter: "linear" });
  return {
    scene: effect(gpu, blackHoleWgsl, {
      set: {
        params: { resolution: targets.scene.size, pointer: [0, 0.05], time: 0, farStep: 0 },
      },
    }),
    bright: effect(gpu, brightPassWgsl, { set: { samp } }),
    blur: BLURS.map((blur, i) =>
      effect(gpu, blurWgsl, {
        set: { samp, blur: { ...blur, texelSize: targets.bloom[i % 2].texelSize } },
      }),
    ),
    composite: effect(gpu, compositeWgsl, { set: { samp } }),
  };
}

type Effects = ReturnType<typeof createEffects>;

/**
 * `size` is the canvas' backing size. The scene (the ray-march, and nearly all
 * of the GPU cost) renders at `scale` of it per axis and the composite pass
 * upsamples; bloom is sized from the canvas so the glow keeps its radius
 * whatever the scene's scale.
 */
export function createTargets(gpu: Gpu, size: readonly [number, number], scale = 1) {
  const height = Math.min(360, size[1]);
  const bloom: [number, number] = [
    Math.max(1, Math.round((height * size[0]) / size[1])),
    height,
  ];
  const sceneSize: [number, number] = [
    Math.max(1, Math.round(size[0] * scale)),
    Math.max(1, Math.round(size[1] * scale)),
  ];
  let scene: Target | undefined;
  let bloomA: Target | undefined;
  try {
    scene = target(gpu, { size: sceneSize, format: "rgba16float" });
    bloomA = target(gpu, { size: bloom, format: "rgba16float" });
    return {
      scene,
      bloom: [bloomA, target(gpu, { size: bloom, format: "rgba16float" })] as const,
    };
  } catch (error) {
    destroy(bloomA);
    destroy(scene);
    throw error;
  }
}

type Targets = ReturnType<typeof createTargets>;

export function destroyTargets(targets: Targets): void {
  destroy(targets.bloom[1]);
  destroy(targets.bloom[0]);
  destroy(targets.scene);
}

function destroy(color: Target | undefined): void {
  (color as { destroy?: () => void } | undefined)?.destroy?.();
}

export function setBindings(effects: Effects, targets: Targets): void {
  effects.scene.set({ params: { resolution: targets.scene.size } });
  effects.bright.set({ src: targets.scene });
  effects.blur.forEach((blur, i) =>
    blur.set({
      src: targets.bloom[i % 2],
      blur: { texelSize: targets.bloom[i % 2].texelSize },
    }),
  );
  effects.composite.set({ scene: targets.scene, bloom: targets.bloom[0] });
}

export async function prewarm(
  effects: Effects,
  targets: Targets,
  output: Output,
): Promise<void> {
  await Promise.all([
    effects.scene.compile(targets.scene),
    effects.bright.compile(targets.bloom[0]),
    ...effects.blur.map((blur, i) => blur.compile(targets.bloom[(i + 1) % 2])),
    effects.composite.compile({ colors: [output.format] }),
  ]);
}

/** `timers`, when given, holds one GPU timing span per pass, in pass order. */
export function renderChain(
  frame: Frame,
  effects: Effects,
  targets: Targets,
  output: Output,
  timers: readonly TimerSpan[] = [],
): void {
  frame.pass({ target: targets.scene, clear: CLEAR, timer: timers[0] }, (pass) =>
    pass.draw(effects.scene),
  );
  frame.pass({ target: targets.bloom[0], clear: CLEAR, timer: timers[1] }, (pass) =>
    pass.draw(effects.bright),
  );
  effects.blur.forEach((blur, i) => {
    frame.pass(
      { target: targets.bloom[(i + 1) % 2], clear: CLEAR, timer: timers[i + 2] },
      (pass) => pass.draw(blur),
    );
  });
  frame.pass({ target: output, clear: CLEAR, timer: timers[PASS_COUNT - 1] }, (pass) =>
    pass.draw(effects.composite),
  );
}
