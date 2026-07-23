# @mikavilpas/oxlint-config

## 3.0.0

### Major Changes

- [#650](https://github.com/mikavilpas/mika-config/pull/650) [`37749f1`](https://github.com/mikavilpas/mika-config/commit/37749f1cb93a839b9dcfbbdcc86a00fa3091f5d2) Thanks [@mikavilpas](https://github.com/mikavilpas)! - Stop enabling oxlint's entire `restriction` category and instead opt into
  hand-picked rules from it.

  It was previously e.g. banning the use of async/await, which is not a
  good idea.

## 2.0.0

### Major Changes

- [#648](https://github.com/mikavilpas/mika-config/pull/648) [`03fdad7`](https://github.com/mikavilpas/mika-config/commit/03fdad7b693c2a12218a4c268d2e9390d65bd5f9) Thanks [@mikavilpas](https://github.com/mikavilpas)! - Add more rules:

  - prefer shorthand object properties
  - add rule to disallow builtin Omit type
  - require exhaustive switch statements

## 1.1.0

### Minor Changes

- [#645](https://github.com/mikavilpas/mika-config/pull/645) [`639a8be`](https://github.com/mikavilpas/mika-config/commit/639a8bef1f470401bc60f9e40ef8a5cbd80e89b9) Thanks [@mikavilpas](https://github.com/mikavilpas)! - remove unused imports when safe

## 1.0.0

### Major Changes

- [#642](https://github.com/mikavilpas/mika-config/pull/642) [`ee8bc68`](https://github.com/mikavilpas/mika-config/commit/ee8bc688847625a445aaa8fd1018837dd20674c1) Thanks [@mikavilpas](https://github.com/mikavilpas)! - add @mikavilpas/oxlint-config package
