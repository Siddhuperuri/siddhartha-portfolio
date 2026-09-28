/** The word rendered as a wireframe node network above the capabilities list. */
export const capabilitiesNetworkText = "CAPABILITIES";

/** Canvas rasterisation settings feeding the point sampler — tuned so the word reads clearly at ~260 nodes. */
export const capabilitiesNetworkSampling = {
  fontSize: 220,
  fontWeight: 700,
  sampleStep: 4,
  targetCount: 260,
} as const;

/** How densely sampled nodes connect into a constellation rather than a loose scatter. */
export const capabilitiesNetworkEdges = {
  maxDistance: 0.085,
  neighborCount: 2,
} as const;

export const capabilitiesNetworkScene = {
  depthJitter: 0.4,
  driftSpeed: 0.06,
  fov: 38,
  nodeRadius: 0.05,
  reflectionOffset: 2.6,
  reflectionOpacity: 0.22,
  scale: 11,
} as const;

export const capabilitiesNetworkLighting = {
  ambientIntensity: 0.5,
  pointIntensity: 1.8,
} as const;
