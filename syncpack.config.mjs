/** @type {import("syncpack").RcFile} */
// oxlint-disable-next-line import/no-default-export
export default {
  strict: true,
  semverGroups: [
    {
      // this allows consumers to use a matching version and save disk space
      // and installation time
      label: "peerDependencies use caret ranges",
      dependencyTypes: ["peer"],
      range: "^",
    },
  ],
  versionGroups: [
    {
      label: "Peer deps must look like ^1.2.3 (no exact pins)",
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
