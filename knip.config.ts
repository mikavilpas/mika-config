import config from "@mikavilpas/knip-config"

config.workspaces = {
  ".": {
    ignoreDependencies: [
      // used locally for development, cannot be detected by knip
      "@changesets/cli",
    ],
  },
}

export default config
