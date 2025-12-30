import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendor libraries
    "public/js/**",
  ]),
  // Preview pages intentionally use Bootstrap HTML patterns (not Next.js patterns)
  {
    files: ["app/(preview)/**/*.tsx", "components/preview/**/*.tsx"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-css-tags": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-head-element": "off",
      "@next/next/no-before-interactive-script-outside-document": "off",
    },
  },
  // Allow setState in useEffect for localStorage hydration pattern (SSR-safe)
  {
    files: ["**/*.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
