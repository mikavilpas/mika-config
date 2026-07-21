import type { OxfmtConfig } from "oxfmt"
import { defineConfig } from "oxfmt"

const config: OxfmtConfig = defineConfig({
  arrowParens: "avoid",
  printWidth: 120,
  proseWrap: "always",
  semi: false,
  singleQuote: false,
  trailingComma: "all",
  sortImports: true,
  sortPackageJson: {},
})

// oxlint-disable-next-line import/no-default-export
export default config
