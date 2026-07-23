import packageConfig from "@mikavilpas/oxfmt-config"
import { defineConfig } from "oxfmt"

export default defineConfig({
  ...packageConfig,
  ignorePatterns: ["**/CHANGELOG.md"],
})
