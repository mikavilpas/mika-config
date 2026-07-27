# mika-config

This repository contains

- [📂 renovate-config](packages/renovate-config) for [renovate](https://docs.renovatebot.com/), the dependency update
  bot
  - released as a git tag and github release only, as `@mikavilpas/renovate-config`. This way I can roughly track the
    changes in the github releases view
  - not published to npm, because Renovate has deprecated npm-hosted presets
- [📂 oxfmt-config](packages/oxfmt-config) for the [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) code
  formatter ![oxfmt-config NPM Version](https://img.shields.io/npm/v/%40mikavilpas%2Foxfmt-config)
- [📂 oxlint-config](packages/oxlint-config) for the [oxlint](https://oxc.rs/docs/guide/usage/linter.html) code linter
  ![oxlint-config NPM Version](https://img.shields.io/npm/v/%40mikavilpas%2Foxlint-config)
- [📂 knip-config](packages/knip-config) for the [knip](https://knip.dev/) unused dependency checker
  ![knip-config NPM Version](https://img.shields.io/npm/v/%40mikavilpas%2Fknip-config)
- [📂 syncpack-config](packages/syncpack-config) for [syncpack](https://syncpack.dev/), the command-line tool for
  consistent dependency versions in large JavaScript Monorepos
  ![syncpack-config NPM Version](https://img.shields.io/npm/v/%40mikavilpas%2Fsyncpack-config)

Each package documents its own features and usage in its README.

## Releasing new versions

There are two kinds of releases in this repository.

- Package versions are released based on <https://changesets.dev/>.
- A repository level release (`v1.2.3`) to document changes without a changeset: renovate's dependency bumps, ci work,
  tooling.

| Release               | Trigger                                      | Notes come from                                  | Workflow                                                                             |
| --------------------- | -------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| A package             | merging the changesets "Version Packages" PR | the package changesets                           | [./.github/workflows/release.yml](./.github/workflows/release.yml)                   |
| The repository itself | pushing a `v<version>` git tag               | every commit since the previous `v<version>` tag | [./.github/workflows/document-release.yml](./.github/workflows/document-release.yml) |

### Initial setup for a new package published to npm

> [!NOTE]
>
> This is documented in more detail at
> <https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/> but loosely
> reiterated here.

CI uses trusted publishing via OpenID Connect (OIDC) to authenticate to <https://npmjs.org>. Before this can work, the
first version must be released manually (only once).

To publish the first version:

```sh
pnpm login # if you haven't logged in yet
cd packages/knip-config # your new package here
pnpm publish --access public
```

After this, set up trusted publishing in <https://www.npmjs.com/package/@mikavilpas/knip-config/access> (adapt for your
new package).

### Initial setup for a new private package

A package marked `"private": true` in its `package.json`, like [📂 renovate-config](packages/renovate-config), needs
none of the npm setup above, because it is never published.

### Releasing new versions for existing packages

After the [initial setup](#initial-setup-for-a-new-package-published-to-npm), to release a new version:

- run `pnpm changeset` to create a new changeset, and commit it. You can also add multiple ones to release multiple
  packages at once.
- submit your PR and merge it
- when it's been merged, [./.github/workflows/release.yml](./.github/workflows/release.yml) will automatically release
  the new version(s) based on the changeset(s)

### Releasing (documenting) the repository itself

The repository root is intentionally **not** a changesets package (its `package.json` has no `version` field so
changesets skips it). Its releases document what happened in the repository, including the commits that no changeset
covers.

To create one, push a tag:

```sh
git tag v2.4.0
git push origin v2.4.0
```

That triggers [./.github/workflows/document-release.yml](./.github/workflows/document-release.yml) which creates the
release.
