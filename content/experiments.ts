import { projects } from "@/content/projects";
import { coverSrc } from "@/lib/covers";

/**
 * The lab and work-page experiments, described as data: what each one is, how
 * it wants to be laid out, and which of its parameters a visitor may edit.
 * `components/lab/experiment-stage.tsx` turns a slug plus a set of values into
 * the live component.
 */

export type ControlValue = boolean | number | string;
export type ControlValues = Record<string, ControlValue>;

type ControlBase = { key: string; label: string };

export type RangeControl = ControlBase & {
  kind: "range";
  max: number;
  min: number;
  step: number;
  value: number;
};
export type ColorControl = ControlBase & { kind: "color"; value: string };
export type TextControl = ControlBase & {
  kind: "text";
  maxLength: number;
  value: string;
};
export type SelectControl = ControlBase & {
  kind: "select";
  options: readonly { label: string; value: string }[];
  value: string;
};
export type ToggleControl = ControlBase & { kind: "toggle"; value: boolean };

export type Control =
  ColorControl | RangeControl | SelectControl | TextControl | ToggleControl;

export type Experiment = {
  controls: readonly Control[];
  /** Which page the experiment is listed on. */
  group: "lab" | "work";
  /**
   * "stage": fills a fixed viewport-sized stage, so wheel and drag belong to
   * the experiment. "scroll": driven by the page scrolling past it.
   */
  mode: "scroll" | "stage";
  note: string;
  slug: string;
  title: string;
  /** Uses the mouse wheel itself, so it fights page scrolling when embedded. */
  wheel?: boolean;
};

const RED = "#ff3d2e";
const DEEP = "#7a1810";
const INK = "#0a0a0a";
const PAPER = "#f5f5f5";

const range = (
  key: string,
  label: string,
  min: number,
  max: number,
  step: number,
  value: number,
): RangeControl => ({ key, kind: "range", label, max, min, step, value });
const color = (key: string, label: string, value: string): ColorControl => ({
  key,
  kind: "color",
  label,
  value,
});
const toggle = (key: string, label: string, value: boolean): ToggleControl => ({
  key,
  kind: "toggle",
  label,
  value,
});
const text = (
  key: string,
  label: string,
  value: string,
  maxLength = 14,
): TextControl => ({ key, kind: "text", label, maxLength, value });
const select = (
  key: string,
  label: string,
  value: string,
  options: readonly (readonly [string, string])[],
): SelectControl => ({
  key,
  kind: "select",
  label,
  options: options.map(([optionValue, optionLabel]) => ({
    label: optionLabel,
    value: optionValue,
  })),
  value,
});

/** A picker over the project covers. */
const cover = (key: string, label: string, slug: string): SelectControl =>
  select(
    key,
    label,
    coverSrc(slug),
    projects.map((project) => [coverSrc(project.slug), project.title] as const),
  );

export const experiments: readonly Experiment[] = [
  {
    controls: [
      range("lensStrength", "Lens strength", 0, 0.6, 0.01, 0.24),
      range("tileWidth", "Tile width", 140, 380, 2, 238),
      range("tileHeight", "Tile height", 160, 420, 2, 272),
      range("gap", "Gap", 0, 40, 1, 0),
      range("hoverNudge", "Hover nudge", 0, 48, 1, 16),
      range("inertia", "Glide", 0.8, 0.99, 0.01, 0.94),
      range("wheelSensitivity", "Wheel speed", 0.1, 1.5, 0.01, 0.42),
      select("theme", "Theme", "dark", [
        ["dark", "Dark"],
        ["light", "Light"],
      ]),
    ],
    group: "lab",
    mode: "stage",
    note: "Drag or scroll. The lens warps the tiles under the cursor.",
    slug: "fisheye-grid",
    title: "Fisheye grid",
    wheel: true,
  },
  {
    controls: [
      range("radius", "Radius", 120, 420, 1, 235),
      range("verticalGap", "Rise per card", 20, 140, 1, 64),
      range("cardWidth", "Card width", 140, 380, 1, 255),
      range("bend", "Bend", 0, 0.5, 0.01, 0.17),
      range("blurStrength", "Depth blur", 0, 4, 0.05, 1.65),
      range("fov", "Field of view", 24, 80, 1, 44),
      toggle("autoRotate", "Auto-rotate", true),
      range("autoSpeed", "Auto speed", 0, 0.6, 0.01, 0.13),
    ],
    group: "lab",
    mode: "stage",
    note: "Scroll or drag to turn a spiral of cover art in 3D.",
    slug: "spiral-slider",
    title: "Spiral slider",
    wheel: true,
  },
  {
    controls: [
      select("variant", "Motion", "magnetic", [
        ["magnetic", "Magnetic"],
        ["uplift", "Uplift"],
        ["simple", "Simple"],
      ]),
      text("heading", "Heading", "Surf the work", 22),
    ],
    group: "lab",
    mode: "scroll",
    note: "A looping strip that bends towards the pointer. Scroll to surf it.",
    slug: "collection-surfer",
    title: "Collection surfer",
  },
  {
    controls: [
      range("radius", "Wheel radius", 180, 520, 1, 320),
      range("spacing", "Spacing", 8, 24, 0.5, 14),
      range("visibleItems", "Visible items", 3, 11, 2, 7),
      range("photoWidth", "Photo width", 14, 40, 1, 24),
      select("photoSide", "Photo side", "left", [
        ["left", "Left"],
        ["right", "Right"],
      ]),
      toggle("snap", "Snap", true),
      toggle("momentum", "Momentum", true),
      color("markerColor", "Marker", RED),
      color("selectedColor", "Selected", PAPER),
      color("background", "Background", INK),
    ],
    group: "lab",
    mode: "stage",
    note: "Wheel through the projects; the photo follows the selection.",
    slug: "wheel-carousel",
    title: "Wheel carousel",
    wheel: true,
  },
  {
    controls: [
      range("spread", "Spread", 60, 280, 1, 168),
      range("lift", "Lift", 0, 90, 1, 34),
      range("count", "Cards", 3, 7, 1, 5),
    ],
    group: "lab",
    mode: "stage",
    note: "Hover to fan out the stack. Arrow keys move between cards.",
    slug: "orbit-card-stack",
    title: "Orbit card stack",
  },
  {
    controls: [
      text("text", "Word", "SIDDHARTHA", 12),
      range("fontSize", "Size", 60, 220, 1, 150),
      range("particleSize", "Particle size", 0.5, 4, 0.1, 1.5),
      range("particleDensity", "Spacing", 3, 12, 1, 6),
      range("dispersionStrength", "Scatter", 2, 50, 1, 15),
      range("returnSpeed", "Return speed", 0.01, 0.3, 0.01, 0.08),
      color("color", "Colour", PAPER),
    ],
    group: "lab",
    mode: "stage",
    note: "Letters scatter from the cursor and settle back.",
    slug: "particle-type",
    title: "Particle type",
  },
  {
    controls: [
      cover("imageSrc", "Image", "siddhartha"),
      range("gridSize", "Grid size", 60, 320, 10, 200),
      range("dotScale", "Dot scale", 0.3, 1.6, 0.05, 1),
      range("threshold", "Threshold", 20, 240, 1, 180),
      range("contrast", "Contrast", -100, 100, 1, 0),
      toggle("invert", "Invert", true),
      color("particleColor", "Colour", PAPER),
    ],
    group: "lab",
    mode: "stage",
    note: "Cover art re-drawn as a field of dithered dots.",
    slug: "dithered-mark",
    title: "Dithered mark",
  },
  {
    controls: [
      select("variant", "Behaviour", "trail", [
        ["trail", "Trail"],
        ["glow", "Glow"],
        ["default", "Bloom"],
      ]),
      range("gap", "Pixel gap", 3, 20, 1, 6),
      range("speed", "Speed", 0.005, 0.1, 0.005, 0.02),
      color("color1", "Colour 1", DEEP),
      color("color2", "Colour 2", RED),
      color("color3", "Colour 3", PAPER),
    ],
    group: "lab",
    mode: "stage",
    note: "Pixels light up and fade behind the cursor.",
    slug: "pixel-canvas",
    title: "Pixel canvas",
  },
  {
    controls: [
      cover("src", "Image", "helios"),
      range("pixelSize", "Pixel size", 12, 90, 1, 36),
      range("radius", "Brush radius", 20, 180, 1, 58),
      range("fadeDuration", "Fade (ms)", 200, 3000, 50, 900),
      range("maxPixels", "Max pixels", 20, 240, 1, 84),
    ],
    group: "lab",
    mode: "stage",
    note: "Move over it to uncover the image one square at a time.",
    slug: "pixel-image-trail",
    title: "Pixel image trail",
  },
  {
    controls: [
      range("duration", "Duration", 0.4, 4, 0.1, 1.4),
      range("waveSpeed", "Wave speed", 0.4, 4, 0.1, 1.6),
      range("waveFreq", "Wave frequency", 1, 14, 0.5, 5),
      range("pushAmt", "Push", 0, 0.4, 0.005, 0.145),
      range("caStrength", "Colour split", 0, 0.1, 0.002, 0.02),
      range("glow", "Glow", 0, 2, 0.01, 0.73),
      range("noiseWarp", "Warp", 0, 3, 0.05, 1),
      toggle("pinch", "Pinch", false),
      toggle("autoPlay", "Auto-play", false),
    ],
    group: "lab",
    mode: "stage",
    note: "Click anywhere to send a ripple through the next image.",
    slug: "ripple-transition",
    title: "Ripple transition",
  },
  {
    controls: [
      range("speed", "Speed", 0, 3, 0.05, 1),
      range("intensity", "Intensity", 0.2, 2, 0.05, 1),
      range("grain", "Grain", 0, 2, 0.05, 0.85),
      range("vignette", "Vignette", 0, 2, 0.05, 1),
      range("mouseInfluence", "Pointer pull", 0, 3, 0.05, 1),
      color("baseColor", "Base", INK),
      color("midColor", "Mid", DEEP),
      color("accentColor", "Accent", RED),
      color("sheenColor", "Sheen", PAPER),
    ],
    group: "lab",
    mode: "stage",
    note: "A slow silk-and-aurora field in the accent red.",
    slug: "silk-aurora",
    title: "Silk aurora",
  },
  {
    controls: [
      text("title1", "Line 1", "Prism"),
      text("title2", "Line 2", "study"),
      range("speed", "Speed", 0, 3, 0.05, 1),
      range("ditherIntensity", "Dither", 0, 0.6, 0.01, 0.15),
      range("prismIntensity", "Prism", 0, 1.5, 0.01, 0.5),
      range("particleCount", "Particles", 0, 200, 5, 50),
      color("color1", "Colour 1", INK),
      color("color2", "Colour 2", DEEP),
      color("color3", "Colour 3", RED),
    ],
    group: "lab",
    mode: "stage",
    note: "Dithered prisms with floating particles, re-tinted.",
    slug: "dither-prism",
    title: "Dither prism",
  },
  {
    controls: [
      text("title1", "Line 1", "Geometric"),
      text("title2", "Line 2", "drift"),
      range("speed", "Speed", 0, 4, 0.05, 1),
      color("color1", "Colour 1", RED),
      color("color2", "Colour 2", PAPER),
    ],
    group: "lab",
    mode: "stage",
    note: "Floating geometry in three.js.",
    slug: "geometric-hero",
    title: "Geometric hero",
  },
  {
    controls: [
      range("speed", "Speed", 0, 3, 0.05, 1),
      range("flowStrength", "Flow", 0, 3, 0.05, 1),
      range("grain", "Grain", 0, 0.3, 0.005, 0.05),
      range("contrast", "Contrast", 0.5, 2, 0.01, 1.1),
      color("colorDeep", "Deep", INK),
      color("colorMid", "Mid", DEEP),
      color("colorHighlight", "Highlight", RED),
    ],
    group: "lab",
    mode: "stage",
    note: "A liquid field that reveals itself on load.",
    slug: "liquid-field",
    title: "Liquid field",
  },
  {
    controls: [
      cover("topLeft", "Top left", "creative-design-collection"),
      cover("topRight", "Top right", "vigil-88"),
      cover("bottomLeft", "Bottom left", "gravity-playground"),
      cover("bottomRight", "Bottom right", "petponks"),
    ],
    group: "lab",
    mode: "scroll",
    note: "Four covers swap places, stack, then one fills the screen.",
    slug: "scroll-choreography",
    title: "Scroll choreography",
  },
  {
    controls: [
      cover("imageSrc", "Image", "orbit"),
      color("accent", "Middle card", RED),
      color("ground", "Outer cards", "#1a1a1a"),
    ],
    group: "lab",
    mode: "scroll",
    note: "One image splits into three cards that flip to reveal what I do.",
    slug: "scroll-split-card",
    title: "Scroll split card",
  },
  {
    controls: [
      range("panelHeight", "Panel height", 240, 560, 2, 420),
      range("gap", "Gap", 0, 48, 1, 12),
      range("aspect", "Panel ratio", 0.7, 2.2, 0.05, 1.6),
      color("background", "Background", INK),
    ],
    group: "work",
    mode: "stage",
    note: "The projects as panes of glass. Scroll, drag or use the arrow keys.",
    slug: "glass-carousel",
    title: "Glass carousel",
    wheel: true,
  },
  {
    controls: [
      range("speed", "Speed", 0, 2, 0.01, 0.45),
      range("amplitude", "Amplitude", 0, 1.5, 0.01, 0.5),
      color("baseColor", "Metal", "#8c1a12"),
      toggle("interactive", "Follow pointer", true),
    ],
    group: "work",
    mode: "stage",
    note: "The molten-metal field behind the work masthead.",
    slug: "liquid-chrome",
    title: "Liquid chrome",
  },
  {
    controls: [
      range("imageWidth", "Image width", 100, 420, 2, 240),
      range("imageHeight", "Image height", 80, 320, 2, 150),
      range("threshold", "Distance per image", 20, 200, 1, 70),
      range("duration", "Linger (s)", 0.4, 4, 0.1, 1.4),
    ],
    group: "work",
    mode: "stage",
    note: "Move the pointer: covers drop behind it and fall away.",
    slug: "image-trail",
    title: "Image trail",
  },
  {
    controls: [
      range("maxTilt", "Tilt", 0, 80, 1, 48),
      range("maxBlur", "Blur", 0, 14, 0.5, 5),
      range("perspective", "Perspective", 400, 2400, 20, 1000),
      select("aspectRatio", "Ratio", "8 / 5", [
        ["8 / 5", "8:5"],
        ["1 / 1", "1:1"],
        ["4 / 5", "4:5"],
      ]),
    ],
    group: "work",
    mode: "scroll",
    note: "A tilted wall of covers that straightens as you scroll through it.",
    slug: "tilted-grid",
    title: "Tilted grid",
  },
];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug) ?? null;
}

export function getExperimentNeighbours(slug: string) {
  const index = experiments.findIndex((experiment) => experiment.slug === slug);
  const count = experiments.length;
  return {
    index,
    next: experiments[(index + 1) % count],
    previous: experiments[(index - 1 + count) % count],
  };
}

export function defaultValues(experiment: Experiment): ControlValues {
  return Object.fromEntries(
    experiment.controls.map((control) => [control.key, control.value]),
  );
}

/** Keeps only known keys, with values of the right type and inside their range. */
export function sanitizeValues(
  experiment: Experiment,
  input: Record<string, unknown>,
): ControlValues {
  const values = defaultValues(experiment);

  for (const control of experiment.controls) {
    const raw = input[control.key];
    if (raw === undefined) continue;

    if (control.kind === "range") {
      const number = Number(raw);
      if (Number.isFinite(number)) {
        values[control.key] = Math.min(control.max, Math.max(control.min, number));
      }
    } else if (control.kind === "toggle") {
      values[control.key] = raw === true || raw === "1" || raw === "true";
    } else if (control.kind === "color") {
      if (typeof raw === "string" && /^#[0-9a-f]{6}$/i.test(raw)) {
        values[control.key] = raw.toLowerCase();
      }
    } else if (control.kind === "select") {
      if (control.options.some((option) => option.value === raw)) {
        values[control.key] = raw as string;
      }
    } else if (typeof raw === "string") {
      values[control.key] = raw.slice(0, control.maxLength);
    }
  }

  return values;
}
