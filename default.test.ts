import assert from "assert"
import { readFileSync } from "fs"

import RE2 from "re2"
import { describe, expect, it } from "vitest"

import config from "./default.json" with { type: "json" }
import { Lazy } from "./Lazy.js"

describe("README documentation", () => {
  const readme = readFileSync("readme.md", "utf-8")

  // Normalize whitespace to handle prettier line wrapping
  const normalizeWhitespace = (text: string): string => text.replace(/\s+/g, " ").trim()

  it("documents all features from default.json", () => {
    const allDescriptions: string[] = config.packageRules
      .flatMap(pr => pr.description)
      .concat(config.customManagers.flatMap(cm => cm.description))

    const normalizedReadme = normalizeWhitespace(readme)
    for (const desc of allDescriptions) {
      const normalizedDesc = normalizeWhitespace(desc)
      assert(normalizedReadme.includes(normalizedDesc), `Description not found in README: ${desc}`)
    }
  })
})

type CustomManager = (typeof config.customManagers)[number]

// Helper to test regex patterns using RE2 (same engine as Renovate)
function testPattern(pattern: string, input: string): RegExpExecArray | null {
  const regex = new RE2(pattern)
  return regex.exec(input)
}

function findManager(descriptionIncludes: string): CustomManager {
  const manager = config.customManagers.find(m => {
    // keep all descriptions as string arrays for easier testing
    assert(Array.isArray(m.description))
    const description = m.description.join(" ")

    return description.includes(descriptionIncludes)
  })
  assert(manager, `Custom manager not found: ${descriptionIncludes}`)
  return manager
}

function getPattern(manager: CustomManager, index: number): string {
  const pattern = manager.matchStrings[index]
  assert(pattern, `Pattern at index ${index} not found for manager ${manager.description.join(" ")}`)

  return pattern
}

describe("github-releases custom manager", () => {
  const manager = new Lazy(() => findManager("github-releases"))

  describe("yml files", () => {
    const pattern = getPattern(manager.get(), 0)

    it("matches github-releases comment in workflow file", () => {
      const input = [
        "- uses: NTBBloodbath/selene-action@23ef05dd5c4d687f4d3c939f76a1c342baf454aa # v1.0.0",
        "  with:",
        `  token: \${{ secrets.GITHUB_TOKEN }}`,
        "  args: --display-style=quiet ./lua/ ./spec/",
        "  # renovate: datasource=github-releases depName=Kampfkarren/selene",
        "  version: 0.29.0",
      ].join("\n")

      const match = testPattern(pattern, input)
      assert(match)
      expect(match.groups?.["depName"]).toBe("Kampfkarren/selene")
      expect(match.groups?.["currentValue"]).toBe("0.29.0")
    })

    it("matches with quotes around version", () => {
      const input = ["# renovate: datasource=github-releases depName=Kampfkarren/selene", 'version: "0.29.0"'].join(
        "\n"
      )

      const match = testPattern(pattern, input)
      assert(match)
      expect(match.groups?.["depName"]).toBe("Kampfkarren/selene")
      expect(match.groups?.["currentValue"]).toBe("0.29.0")
    })

    it("does not match unrelated content", () => {
      const input = [
        //
        "name: Test",
        "on: push",
        "jobs:",
        "  test:",
        "    runs-on: ubuntu-latest",
      ].join("\n")

      const match = testPattern(pattern, input)
      expect(match).toBeNull()
    })
  })

  describe("lua files", () => {
    const pattern = getPattern(manager.get(), 1)

    it("matches github-releases comment in lua file", () => {
      const input = [
        //
        "  -- renovate: datasource=github-releases depName=folke/lazy.nvim",
        '     version = "11.14.1"',
      ].join("\n")

      const match = testPattern(pattern, input)
      assert(match)
      expect(match.groups?.["depName"]).toBe("folke/lazy.nvim")
      expect(match.groups?.["currentValue"]).toBe("11.14.1")
    })

    it("matches without quotes around version", () => {
      const input = [
        //
        "  -- renovate: datasource=github-releases depName=neovim/neovim",
        "  version = v0.10.0",
      ].join("\n")

      const match = testPattern(pattern, input)
      assert(match)
      expect(match.groups?.["depName"]).toBe("neovim/neovim")
      expect(match.groups?.["currentValue"]).toBe("v0.10.0")
    })
  })
})

describe("git-refs (main branch) custom manager", () => {
  const manager = new Lazy(() => findManager("git-refs on main"))

  describe("yml files", () => {
    const pattern = new Lazy(() => getPattern(manager.get(), 0))

    it("matches git-refs comment in workflow file", () => {
      const input = [
        "# renovate: datasource=git-refs packageName=https://github.com/folke/lazy.nvim",
        "commit: abc123def456",
      ].join("\n")

      const match = testPattern(pattern.get(), input)
      assert(match)
      expect(match.groups?.["packageName"]).toBe("https://github.com/folke/lazy.nvim")
      expect(match.groups?.["currentDigest"]).toBe("abc123def456")
    })

    it("matches with quotes around commit", () => {
      const input = [
        "# renovate: datasource=git-refs packageName=https://github.com/folke/lazy.nvim",
        'commit: "abc123def456"',
      ].join("\n")

      const match = testPattern(pattern.get(), input)
      assert(match)
      expect(match.groups?.["packageName"]).toBe("https://github.com/folke/lazy.nvim")
      expect(match.groups?.["currentDigest"]).toBe("abc123def456")
    })
  })

  describe("lua files", () => {
    const pattern = new Lazy(() => getPattern(manager.get(), 1))

    it("matches git-refs comment in lua file", () => {
      const input = [
        "-- renovate: datasource=git-refs packageName=https://github.com/MagicDuck/grug-far.nvim",
        'commit = "abc123def456"',
      ].join("\n")

      const match = testPattern(pattern.get(), input)
      assert(match)
      expect(match.groups?.["packageName"]).toBe("https://github.com/MagicDuck/grug-far.nvim")
      expect(match.groups?.["currentDigest"]).toBe("abc123def456")
    })

    it("matches without quotes around commit", () => {
      const input = [
        "-- renovate: datasource=git-refs packageName=https://github.com/some/repo",
        "commit = abc123",
      ].join("\n")

      const match = testPattern(pattern.get(), input)
      assert(match)
      expect(match.groups?.["packageName"]).toBe("https://github.com/some/repo")
      expect(match.groups?.["currentDigest"]).toBe("abc123")
    })
  })
})

describe("git-refs-master (master branch) custom manager", () => {
  const manager = new Lazy(() => findManager("git-refs on master"))

  describe("yml files", () => {
    const pattern = new Lazy(() => getPattern(manager.get(), 0))

    it("matches git-refs-master comment in workflow file", () => {
      const input = [
        "# renovate: datasource=git-refs-master packageName=https://github.com/some/legacy-repo",
        "commit: def789",
      ].join("\n")

      const match = testPattern(pattern.get(), input)
      assert(match)
      expect(match.groups?.["packageName"]).toBe("https://github.com/some/legacy-repo")
      expect(match.groups?.["currentDigest"]).toBe("def789")
    })

    it("matches with quotes around commit", () => {
      const input = [
        "# renovate: datasource=git-refs-master packageName=https://github.com/some/legacy-repo",
        'commit: "def789"',
      ].join("\n")

      const match = testPattern(pattern.get(), input)
      assert(match)
      expect(match.groups?.["packageName"]).toBe("https://github.com/some/legacy-repo")
      expect(match.groups?.["currentDigest"]).toBe("def789")
    })
  })

  describe("lua files", () => {
    it("matches git-refs-master comment in lua file", () => {
      const pattern = getPattern(manager.get(), 1)
      const input = [
        "-- renovate: datasource=git-refs-master packageName=https://github.com/old/plugin",
        'commit = "xyz789"',
      ].join("\n")

      const match = testPattern(pattern, input)
      assert(match)
      expect(match.groups?.["packageName"]).toBe("https://github.com/old/plugin")
      expect(match.groups?.["currentDigest"]).toBe("xyz789")
    })
  })
})

describe("crate versions in toml files custom manager", () => {
  const manager = new Lazy(() => findManager("crate versions in toml"))
  const pattern = new Lazy(() => getPattern(manager.get(), 0))

  it("is the only pattern for this manager", () => {
    expect(manager.get().matchStrings.length).toBe(1)
  })

  it("matches cargo tool in mise config", () => {
    const input = [
      //
      "# renovate: datasource=crate depName=bacon",
      '"cargo:bacon" = "3.22.0"',
    ].join("\n")

    const match = testPattern(pattern.get(), input)
    assert(match)
    expect(match.groups?.["depName"]).toBe("bacon")
    expect(match.groups?.["currentValue"]).toBe("3.22.0")
  })

  it("matches cargo tool with hyphenated name", () => {
    const input = [
      //
      "# renovate: datasource=crate depName=cargo-nextest",
      '"cargo:cargo-nextest" = "0.9.117"',
    ].join("\n")

    const match = testPattern(pattern.get(), input)
    assert(match)
    expect(match.groups?.["depName"]).toBe("cargo-nextest")
    expect(match.groups?.["currentValue"]).toBe("0.9.117")
  })

  it("does not match without renovate comment", () => {
    const input = '"cargo:bacon" = "3.22.0"'

    const match = testPattern(pattern.get(), input)
    expect(match).toBeNull()
  })
})

describe("npm packages in toml files custom manager", () => {
  const manager = new Lazy(() => findManager("npm packages in toml"))
  const pattern = new Lazy(() => getPattern(manager.get(), 0))

  it("is the only pattern for this manager", () => {
    expect(manager.get().matchStrings.length).toBe(1)
  })

  it("matches aqua tool in mise config", () => {
    const input = [
      //
      "# renovate: datasource=npm depName=@anthropic-ai/claude-code",
      '"aqua:anthropics/claude-code" = "2.1.117"',
    ].join("\n")

    const match = testPattern(pattern.get(), input)
    assert(match)
    expect(match.groups?.["depName"]).toBe("@anthropic-ai/claude-code")
    expect(match.groups?.["currentValue"]).toBe("2.1.117")
  })

  it("matches unscoped npm package", () => {
    const input = [
      //
      "# renovate: datasource=npm depName=oxlint",
      '"npm:oxlint" = "1.61.0"',
    ].join("\n")

    const match = testPattern(pattern.get(), input)
    assert(match)
    expect(match.groups?.["depName"]).toBe("oxlint")
    expect(match.groups?.["currentValue"]).toBe("1.61.0")
  })

  it("does not match without renovate comment", () => {
    const input = '"aqua:anthropics/claude-code" = "2.1.117"'

    const match = testPattern(pattern.get(), input)
    expect(match).toBeNull()
  })
})

describe("npm packages in workflow env vars custom manager", () => {
  const manager = new Lazy(() => findManager("npm packages in GitHub Action"))
  const pattern = new Lazy(() => getPattern(manager.get(), 0))

  it("there are two patterns for this manager", () => {
    expect(manager.get().matchStrings.length).toBe(2)
  })

  it("matches semantic-release version in env var", () => {
    const input = [
      "env:",
      "  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}",
      "  NPM_TOKEN: ${{ secrets.NPM_TOKEN }}",
      "  # renovate: datasource=npm depName=semantic-release",
      "  SEMANTIC_RELEASE_VERSION: 25.0.2",
    ].join("\n")

    const match = testPattern(pattern.get(), input)
    assert(match)
    expect(match.groups?.["depName"]).toBe("semantic-release")
    expect(match.groups?.["currentValue"]).toBe("25.0.2")
  })

  it("matches any npm package in env var", () => {
    const input = [
      //
      "# renovate: datasource=npm depName=@semantic-release/changelog",
      "CHANGELOG_VERSION: 6.0.3",
    ].join("\n")

    const match = testPattern(pattern.get(), input)
    assert(match)
    expect(match.groups?.["depName"]).toBe("@semantic-release/changelog")
    expect(match.groups?.["currentValue"]).toBe("6.0.3")
  })

  it("matches any npm package in env var with quotes", () => {
    const input = [
      //
      "# renovate: datasource=npm depName=@semantic-release/changelog",
      'CHANGELOG_VERSION: "6.0.3"',
    ].join("\n")

    const match = testPattern(pattern.get(), input)
    assert(match)
    expect(match.groups?.["depName"]).toBe("@semantic-release/changelog")
    expect(match.groups?.["currentValue"]).toBe("6.0.3")
  })

  it("does not match without renovate comment", () => {
    const input = [
      //
      "env:",
      "  SOME_VERSION: 1.2.3`",
    ].join("\n")

    const match = testPattern(pattern.get(), input)
    expect(match).toBeNull()
  })

  it("matches in lua files", () => {
    const luaPattern = getPattern(manager.get(), 1)

    const input = [
      //
      "-- renovate: datasource=npm depName=oxfmt",
      'version = "v2.31.0",',
    ].join("\n")

    const match = testPattern(luaPattern, input)
    assert(match)
  })
})

describe("git-tags in yml files", () => {
  const pattern = getPattern(findManager("git-tags"), 0)

  it("matches a git-tags magic comment in workflow file", () => {
    const input = [
      "# renovate: datasource=git-tags packageName=https://github.com/folke/lazy.nvim",
      "version: v11.14.1",
    ].join("\n")

    const match = testPattern(pattern, input)

    assert(match)
    expect(match.groups?.["packageName"]).toBe("https://github.com/folke/lazy.nvim")
    expect(match.groups?.["currentValue"]).toBe("v11.14.1")
  })
})
