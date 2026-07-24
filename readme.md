# mika-config

This repository contains

- the shared [renovate configuration](./default.json) for my projects
  - released as a git tag and github release only. This way I can roughly track the changes in the github releases view
- [oxfmt-config](packages/oxfmt-config) for the [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) code formatter,
  released as an [npm package](https://www.npmjs.com/package/@mikavilpas/oxfmt-config)
- [oxlint-config](packages/oxlint-config) for the [oxlint](https://oxc.rs/docs/guide/usage/linter.html) code linter,
  released as an [npm package](https://www.npmjs.com/package/@mikavilpas/oxlint-config)
- [knip-config](packages/knip-config) for the [knip](https://knip.dev/) unused dependency checker, released as an
  [npm package](https://www.npmjs.com/package/@mikavilpas/knip-config)

## Features

The shared configuration is defined in [`default.json`](./default.json). Tests for the regular expressions used in the
configuration can be found in [default.test.ts](./default.test.ts).

### Package Rules

- Automerge digest updates weekly

### Custom Managers

- Update github-releases in yml/lua files. Examples:
  - `# renovate: datasource=github-releases depName=X`
  - `-- renovate: datasource=github-releases depName=X`
- Track git-refs on main branch in yml/lua files. Examples:
  - `# renovate: datasource=git-refs packageName=X`
  - `-- renovate: datasource=git-refs packageName=X`
- Track git-refs on master branch in yml/lua files. Examples:
  - `# renovate: datasource=git-refs-master packageName=X`
  - `-- renovate: datasource=git-refs-master packageName=X`
- Update crate versions in toml files. Example:
  - `# renovate: datasource=crate depName=bacon`
  - `"cargo:bacon" = "3.22.0"`
  - Useful for cargo tools in mise config where the built-in mise manager doesn't update cargo: backend tools.
- Update npm packages in toml files. Example:
  - `# renovate: datasource=npm depName=@anthropic-ai/claude-code`
  - `"aqua:anthropics/claude-code" = "2.1.117"`
  - Useful for aqua tools whose registry uses http package type, which the built-in mise manager doesn't support.
- Update npm packages in GitHub Action workflow env vars. Example:
  - `# renovate: datasource=npm depName=X`
  - Useful for semantic-release which recommends CI-only installation.
- Update git tag versions in yml files such as GitHub actions and workflows. Example:
  - `# renovate: datasource=git-tags packageName=X`

A project can use this configuration by adding the following to its [`renovate.json`](renovate.json):

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["local>mikavilpas/mika-config"]
}
```

## Releasing new versions

Versions are released based on <https://changesets.dev/>. When bumps are detected, packages are released automatically
with [./.github/workflows/release.yml](./.github/workflows/release.yml).

### Initial setup for a new package

> [!NOTE]
>
> This is documented in more detail at
> <https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/> but loosely
> reiterated here.

CI uses trusted publishing via OpenID Connect (OIDC) to authenticate to <https://npmjs.org>. Before this can work, the
first version must be released manually (only once).

To publish the first version:

```sh
npm login # if you haven't logged in yet
cd packages/knip-config # your new package here
pnpm publish --access public
```

After this, set up trusted publishing in <https://www.npmjs.com/package/@mikavilpas/knip-config/access> (adapt for your
new package).

### Releasing new versions for existing packages

After the [initial setup](#initial-setup-for-a-new-package), to release a new version:

- run `pnpm changeset` to create a new changeset, and commit it. You can also add multiple ones to release multiple
  packages at once.
- submit your PR and merge it
- when it's been merged, [./.github/workflows/release.yml](./.github/workflows/release.yml) will automatically release
  the new version(s) based on the changeset(s)
