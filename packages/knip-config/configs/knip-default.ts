import type { KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  exclude: [
    // Caught by TypeScript
    "unresolved",
    // Managed with oxlint https://github.com/mikavilpas/mika-config/blob/7cf92e8bb5048b2ac87d470eb47cd064abe6beae/packages/oxlint-config/configs/default.ts?plain=1#L140
    "cycles",
  ],

  // Don't flag exports that are used within the same file
  ignoreExportsUsedInFile: true,
}

export default config
