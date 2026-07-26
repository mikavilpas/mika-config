---
"@mikavilpas/mika-config": minor
---

Move the renovate configuration into `packages/renovate-config/`

Existing consumers need no changes: the root `default.json` is now a shim that forwards to the new location.

Unlike the other configs this one is not published to npm, because Renovate has deprecated npm-hosted presets.
