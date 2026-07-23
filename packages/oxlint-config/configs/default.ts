import { defineConfig, type OxlintConfig } from "oxlint"

// Design principles:
// - leave specific plugins out of the default config, so that projects can
//   choose their own plugins
// - the default config should be 99% of what each project wants out of the box
// - ok to make improvements, but let's make breaking changes major releases to
//   avoid blocking renovate
const config: OxlintConfig = defineConfig({
  options: {
    typeAware: true,
    denyWarnings: true,
    reportUnusedDisableDirectives: "warn",
  },
  plugins: ["typescript", "unicorn", "import"],
  categories: {
    correctness: "error",
    perf: "warn",
    suspicious: "warn",
    restriction: "warn",
  },
  rules: {
    "prefer-const": "error",
    "unified-signatures": "error",
    "no-useless-assignment": "error",
    "no-relative-parent-imports": "off",
    "no-case-declarations": "error",
    "no-empty": "error",
    "no-fallthrough": "error",
    "no-prototype-builtins": "error",
    "no-redeclare": "error",
    "no-regex-spaces": "error",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        minimumDescriptionLength: 10,
      },
    ],
    "no-array-constructor": "error",
    "@typescript-eslint/no-empty-object-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unsafe-function-type": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-deprecated": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-mixed-enums": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-template-expression": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-enum-comparison": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "no-useless-constructor": "error",
    "@typescript-eslint/only-throw-error": "error",
    "@typescript-eslint/prefer-literal-enum-member": "error",
    "@typescript-eslint/prefer-promise-reject-errors": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/related-getter-setter-pairs": "error",
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      {
        allowAny: false,
        allowBoolean: false,
        allowNullish: false,
        allowNumberAndString: false,
        allowRegExp: false,
      },
    ],
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowNumber: true,
        allowBoolean: true,
      },
    ],
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "no-empty-function": [
      "error",
      {
        allow: ["constructors"],
      },
    ],
    "no-void": [
      "error",
      {
        allowAsStatement: true,
      },
    ],
    "oxc/no-rest-spread-properties": "off",
    "typescript/switch-exhaustiveness-check": "warn",
    "oxc/no-optional-chaining": "off",
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        fix: {
          // remove unused imports when safe
          imports: "safe-fix",
        },
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
      rules: {
        "no-class-assign": "off",
        "no-const-assign": "off",
        "no-dupe-class-members": "off",
        "no-dupe-keys": "off",
        "no-func-assign": "off",
        "no-import-assign": "off",
        "no-new-native-nonconstructor": "off",
        "no-obj-calls": "off",
        "no-redeclare": "off",
        "no-setter-return": "off",
        "no-this-before-super": "off",
        "no-unsafe-negation": "off",
        "no-var": "error",
        "no-with": "off",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
      },
    },
  ],
})

// oxlint-disable-next-line import/no-default-export
export default config
