import type { RcFile } from "syncpack"

const config: RcFile = {
  strict: true,
  semverGroups: [
    {
      // - Don't allow "1.2.3"
      // - Allow "^1.2.3", ">=1.2.3" or "^13 || ^14".
      label: "peerDependencies must not be exact pins",
      dependencyTypes: ["peer"],
      specifierTypes: ["exact"],
      range: "^",
    },
  ],
  versionGroups: [
    {
      // Keeps peer ranges mutually compatible, and rejects specifiers syncpack
      // cannot parse. Syncpack seems to be picky here - ">= 1.2.3" reports
      // SameRangeMismatch, ">=1.2.3" is fine (no space).
      label: "Peer deps must be parseable, mutually compatible ranges",
      dependencyTypes: ["peer"],
      policy: "sameRange",
    },
    {
      label: "Local workspace packages use the workspace: protocol",
      dependencies: ["$LOCAL"],
      dependencyTypes: ["dev", "prod"],
      pinVersion: "workspace:*",
    },
    {
      // a package cannot catalog its own version, so keep local instances
      // (each package's own .version) out of the catalog group below
      // https://syncpack.dev/status/refuse-to-catalog-local/
      label: "A package's own version is not a catalog entry",
      dependencyTypes: ["local"],
      isIgnored: true,
    },
    {
      label: "Deps must come from the catalog (single source of truth)",
      policy: "catalog",
    },
  ],
}

export default config
