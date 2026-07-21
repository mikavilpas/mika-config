import packageConfig from "@mikavilpas/oxfmt-config" with { type: "json" }

packageConfig.ignorePatterns.push("CHANGELOG.md")
// oxlint-disable-next-line import/no-default-export
export default packageConfig
