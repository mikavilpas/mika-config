import type { KnipConfig } from "knip"

const config: KnipConfig = {
  include: [
    // everything knip offers
    "binaries",
    "catalog",
    "cycles",
    "dependencies",
    "devDependencies",
    "duplicates",
    "enumMembers",
    "exports",
    "files",
    "namespaceMembers",
    "nsExports",
    "nsTypes",
    "optionalPeerDependencies",
    "types",
    "unlisted",
    "unresolved",
  ],

  // catch unused symbols, but don't report unnecessarily exporting (harmless)
  ignoreExportsUsedInFile: true,

  workspaces: {
    ".": {
      ignoreDependencies: [
        // used locally for development, cannot be detected by knip
        "@changesets/cli",
      ],
    },
  },
}

// oxlint-disable-next-line import/no-default-export
export default config
