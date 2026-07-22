import mikaConfig from "@mikavilpas/oxlint-config"
import { defineConfig } from "oxlint"

// oxlint-disable-next-line import/no-default-export
export default defineConfig({
  extends: [mikaConfig],
  jsPlugins: [
    // https://github.com/levibuzolic/eslint-plugin-no-only-tests#oxlint
    "eslint-plugin-no-only-tests",
  ],
  env: {
    builtin: true,
    es2026: true,
  },
  ignorePatterns: ["**/vite.config.js", "dist/"],
  rules: {
    "no-only-tests/no-only-tests": "error",
  },
})
