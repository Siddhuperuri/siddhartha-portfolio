import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Off, not on: the footer's physics badge (@react-three/rapier) allocates
  // a real WebGL context and kicks off Rapier's async wasm init on mount.
  // StrictMode's dev-only double-invoke (mount, cleanup, mount again) tears
  // that context down mid-init on the throwaway first mount, and the
  // browser kills it outright ("THREE.WebGLRenderer: Context Lost") rather
  // than letting it recover — leaving the badge permanently blank in
  // `next dev`. A one-frame deferred-mount gate was tried first and didn't
  // help, since StrictMode double-invokes any component's first mount,
  // not just the initial page mount. Production never double-invokes, so
  // this only affects dev-mode's extra safety net, not the shipped app.
  reactStrictMode: false,
};

export default nextConfig;
