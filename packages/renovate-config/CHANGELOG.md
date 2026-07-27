# @mikavilpas/renovate-config

## 1.0.0

### Major Changes

- [#682](https://github.com/mikavilpas/mika-config/pull/682) [`bc0d9c8`](https://github.com/mikavilpas/mika-config/commit/bc0d9c8963fa1faf23d3951ded2fb78fe8b36ff4) Thanks [@mikavilpas](https://github.com/mikavilpas)! - release the renovate config as a private changesets package

  `packages/renovate-config/` now has a `package.json` of its own, so changesets versions it and writes this changelog
  separately from the rest of the repository. It is a
  [private package](https://changesets.dev/guide/private-packages): `privatePackages.tag` makes `changeset publish` tag it
  as `@mikavilpas/renovate-config@<version>` and the release workflow turns that tag into a github release, while nothing
  is ever sent to npm.

  Consumers need no changes: the preset is still consumed over git, and presets tracking the latest ref keep working.
