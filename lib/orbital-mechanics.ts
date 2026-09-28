export type KeplerianOrbit = {
  eccentricity: number;
  inclination: number;
  meanAnomaly: number;
  semiMajorAxis: number;
};

/**
 * Solves Kepler's equation M = E - e·sin(E) for the eccentric anomaly E
 * via Newton-Raphson iteration. Five iterations comfortably converge for
 * the low-eccentricity orbits used in this scene.
 */
export function solveEccentricAnomaly(
  meanAnomaly: number,
  eccentricity: number,
  iterations = 5,
) {
  let eccentricAnomaly = meanAnomaly;

  for (let i = 0; i < iterations; i += 1) {
    eccentricAnomaly -=
      (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly) /
      (1 - eccentricity * Math.cos(eccentricAnomaly));
  }

  return eccentricAnomaly;
}

/**
 * Mean motion from Kepler's third law (n = sqrt(GM / a^3)) with a
 * normalised gravitational parameter, so outer bodies orbit slower than
 * inner ones without hand-tuning per-body speeds.
 */
export function meanMotion(semiMajorAxis: number, gravitationalParameter: number) {
  return Math.sqrt(gravitationalParameter / semiMajorAxis ** 3);
}

/**
 * Cartesian position for a body on a Keplerian ellipse, with a simple
 * rotation around the X axis to give each orbital plane a distinct tilt.
 */
export function keplerianPosition({
  eccentricity,
  inclination,
  meanAnomaly,
  semiMajorAxis,
}: KeplerianOrbit): readonly [number, number, number] {
  const eccentricAnomaly = solveEccentricAnomaly(meanAnomaly, eccentricity);
  const xOrbital = semiMajorAxis * (Math.cos(eccentricAnomaly) - eccentricity);
  const zOrbital =
    semiMajorAxis * Math.sqrt(1 - eccentricity ** 2) * Math.sin(eccentricAnomaly);

  const y = zOrbital * Math.sin(inclination);
  const z = zOrbital * Math.cos(inclination);

  return [xOrbital, y, z] as const;
}
