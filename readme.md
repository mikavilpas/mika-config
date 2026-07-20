# mika-config

This repository contains

- the shared [renovate configuration](./default.json) for my projects
- [oxfmt-config](packages/oxfmt-config) for the [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) code formatter,
  released as an [npm package](https://www.npmjs.com/package/@mikavilpas/oxfmt-config)

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
