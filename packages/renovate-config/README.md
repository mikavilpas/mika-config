# renovate-config

The shared [renovate](https://docs.renovatebot.com/) configuration Mika Vilpas uses in personal projects.

Unlike the other packages in this repository, this one is not published to npm:
[npm-hosted presets are deprecated](https://docs.renovatebot.com/config-presets/#npm-hosted-presets) and Renovate plans
to drop them. It is consumed over git instead, and released as a git tag and github release only. This way I can roughly
track the changes in the github releases view.

Its versions are managed with [changesets](https://changesets.dev/) like the published packages: it is a
[private package](https://changesets.dev/guide/private-packages), so each release gets a
`@mikavilpas/renovate-config@<version>` git tag and a github release with the changelog entries for that version, and
nothing is sent to npm. See [the release documentation](../../readme.md#releasing-new-versions) for how that works.

## Usage

A project can use this configuration by adding the following to its `renovate.json`:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["local>mikavilpas/mika-config"]
}
```

That resolves through the [shim at the repository root](../../default.json), which forwards to this directory. You can
also point at this preset directly:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["local>mikavilpas/mika-config//packages/renovate-config/default"]
}
```

Both forms track the latest ref, which is how I use this preset in my own projects. Pinning a release with the usual
`#<tag>` suffix is not possible here: Renovate's preset parser only accepts `[\w\-./]` in the tag, and the release tags
contain an `@`.

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
