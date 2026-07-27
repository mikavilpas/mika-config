---
"@mikavilpas/renovate-config": patch
---

Leave peerDependencies alone, since each bump is a breaking change for consumers.
The author must bump them manually when new versions are depended on.
