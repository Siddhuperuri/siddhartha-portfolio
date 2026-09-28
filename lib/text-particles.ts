export type TextParticlePoint = {
  x: number;
  y: number;
};

/**
 * Deterministic hash standing in for Math.random(): a pure function of its
 * seed, matching the pattern used for the hero/work starfields so this
 * scene reads as part of the same procedural system.
 */
export function pseudoRandom(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

export type TextParticleConfig = {
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  sampleStep: number;
  targetCount: number;
  text: string;
};

/**
 * Rasterises `text` onto an offscreen canvas and samples the filled pixels
 * into a normalised 2D point cloud (x/y in roughly -aspect/2..aspect/2 by
 * -0.5..0.5 units) — the "letters made of nodes" source data for the
 * capabilities network visual. Canvas-only, so this must run client-side
 * after mount, never during SSR.
 */
export function sampleTextPoints({
  fontFamily,
  fontSize,
  fontWeight,
  sampleStep,
  targetCount,
  text,
}: TextParticleConfig): TextParticlePoint[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return [];
  }

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const measured = ctx.measureText(text);
  const padding = fontSize * 0.3;
  const width = Math.ceil(measured.width + padding * 2);
  const height = Math.ceil(fontSize * 1.4);

  canvas.width = width;
  canvas.height = height;

  // Resizing the canvas resets context state, so the font must be reapplied.
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";
  ctx.fillText(text, padding, height / 2);

  const { data } = ctx.getImageData(0, 0, width, height);
  const raw: TextParticlePoint[] = [];

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const alpha = data[(y * width + x) * 4 + 3];

      if (alpha > 128) {
        raw.push({
          x: (x - width / 2) / height,
          y: -(y - height / 2) / height,
        });
      }
    }
  }

  if (raw.length <= targetCount || targetCount <= 0) {
    return raw;
  }

  const stride = Math.ceil(raw.length / targetCount);

  return raw.filter((_, index) => index % stride === 0);
}

export type NetworkEdge = readonly [number, number];

/**
 * Connects each point to its nearest few neighbours within `maxDistance`,
 * giving the point cloud a constellation/wireframe read instead of a loose
 * scatter. O(n^2) — fine at the point counts this feeds (a few hundred).
 */
export function buildNetworkEdges(
  points: readonly TextParticlePoint[],
  neighborCount: number,
  maxDistance: number,
): NetworkEdge[] {
  const edges = new Map<string, NetworkEdge>();

  for (let i = 0; i < points.length; i += 1) {
    const distances: Array<{ distance: number; index: number }> = [];

    for (let j = 0; j < points.length; j += 1) {
      if (i === j) {
        continue;
      }

      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= maxDistance) {
        distances.push({ distance, index: j });
      }
    }

    distances.sort((a, b) => a.distance - b.distance);

    for (const { index: j } of distances.slice(0, neighborCount)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;

      if (!edges.has(key)) {
        edges.set(key, i < j ? [i, j] : [j, i]);
      }
    }
  }

  return Array.from(edges.values());
}
