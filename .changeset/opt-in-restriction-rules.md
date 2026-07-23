---
"@mikavilpas/oxlint-config": major
---

Stop enabling oxlint's entire `restriction` category and instead opt into
hand-picked rules from it.

It was previously e.g. banning the use of async/await, which is not a
good idea.
