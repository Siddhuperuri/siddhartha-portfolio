import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // Vendored Componentry registry code is not linted.
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "components/ui/**",
    "components/gradient-hero-01.tsx",
  ]),
]);
