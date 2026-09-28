/**
 * Deterministic hash standing in for Math.random(): a pure function of its
 * seed, so procedural generation stays compliant with React's render-purity
 * rule while still scattering points convincingly.
 */
function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export type StarfieldConfig = {
  count: number;
  radiusMax: number;
  radiusMin: number;
};

/**
 * Positions scattered through a flattened sphere shell — the shared ambient
 * backdrop used by every scene in the spatial system (hero, work section),
 * so they read as one continuous space rather than separate demos.
 */
export function generateStarfieldPositions({ count, radiusMax, radiusMin }: StarfieldConfig) {
  const values = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = radiusMin + pseudoRandom(i * 3.1) * (radiusMax - radiusMin);
    const theta = pseudoRandom(i * 7.7 + 1) * Math.PI * 2;
    const phi = Math.acos(2 * pseudoRandom(i * 13.3 + 2) - 1);

    values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    values[i * 3 + 1] = radius * Math.cos(phi) * 0.6;
    values[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  return values;
}
