/** @type {import("syncpack").RcFile} */
// oxlint-disable-next-line import/no-default-export
export default {
  strict: true,
  versionGroups: [
    {
      label: "Ignore peer dependencies",
      dependencyTypes: ["peer"],
      isIgnored: true,
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
