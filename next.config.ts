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

  // Hero black hole: shaders live in `.wgsl` files and are resolved (imports,
  // pruning, minification) by vgpu's loader. Turbopack is the default bundler
  // for both `next dev` and `next build` in Next 16, so only its rule is
  // needed — a `webpack()` hook here would make Turbopack builds fail.
  turbopack: {
    rules: {
      "*.wgsl": {
        as: "*.js",
        loaders: ["@vgpu/wgsl/loader-webpack"],
      },
    },
  },
};

export default nextConfig;
