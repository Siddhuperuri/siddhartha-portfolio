import { visualTokens } from "@/lib/visual-tokens";

export type OrbitalBody = {
  color: string;
  eccentricity: number;
  id: string;
  inclination: number;
  meanAnomalyAtEpoch: number;
  radius: number;
  semiMajorAxis: number;
};

/**
 * A small abstracted gravity field standing in for the Cosmos Engine from
 * the Gravity Playground project: a central mass with a handful of bodies
 * on real (if simplified) Keplerian orbits, not a decorative particle field.
 */
export const orbitalBodies: readonly OrbitalBody[] = [
  {
    color: visualTokens.foreground,
    eccentricity: 0.04,
    id: "inner",
    inclination: 0.12,
    meanAnomalyAtEpoch: 0.4,
    radius: 0.16,
    semiMajorAxis: 3.2,
  },
  {
    color: visualTokens.accent,
    eccentricity: 0.09,
    id: "mid",
    inclination: -0.08,
    meanAnomalyAtEpoch: 2.1,
    radius: 0.22,
    semiMajorAxis: 4.6,
  },
  {
    color: visualTokens.muted,
    eccentricity: 0.14,
    id: "outer",
    inclination: 0.2,
    meanAnomalyAtEpoch: 4.6,
    radius: 0.13,
    semiMajorAxis: 6.1,
  },
  {
    color: visualTokens.foreground,
    eccentricity: 0.02,
    id: "far",
    inclination: -0.16,
    meanAnomalyAtEpoch: 1.3,
    radius: 0.09,
    semiMajorAxis: 7.6,
  },
] as const;

/** Normalised gravitational parameter (GM) feeding Kepler's third law. */
export const gravitationalParameter = 3.2;

export const centralBodyRadius = 0.85;
export const orbitTrailSegments = 96;

export const starfield = {
  count: 260,
  radiusMax: 16,
  radiusMin: 9,
} as const;

export const sceneLighting = {
  ambientIntensity: 0.4,
  centralEmissiveIntensity: 0.9,
  orbitingEmissiveIntensity: 0.45,
  pointIntensity: 2.4,
} as const;

export const materialTuning = {
  roughness: 0.3,
} as const;

export type DollyState = {
  azimuth: number;
  elevation: number;
  radius: number;
};

/**
 * Camera vantage points for the scroll-driven dolly/orbit. `start` is the
 * resting frame before any scroll input; `end` is reached at full scroll
 * progress through the hero's pinned scroll distance.
 */
export const cameraDolly = {
  damping: 0.08,
  end: { azimuth: 1.05, elevation: 0.5, radius: 8.5 } satisfies DollyState,
  fov: 42,
  start: { azimuth: 0.15, elevation: 0.32, radius: 15 } satisfies DollyState,
};

/** Extra scroll distance (vh) dedicated to the hero's camera sequence. */
export const heroPinHeightVh = 220;

export function dollyToVector3(state: DollyState): readonly [number, number, number] {
  const { azimuth, elevation, radius } = state;

  return [
    radius * Math.cos(elevation) * Math.sin(azimuth),
    radius * Math.sin(elevation),
    radius * Math.cos(elevation) * Math.cos(azimuth),
  ] as const;
}
