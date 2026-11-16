# GoatAI website working conventions.

## Code quality.

Type checker: TypeScript (`tsc`). Linter and formatter: Biome, configured in `biome.jsonc`.

- After editing code, run `npm run fix`: it formats the code and applies the safe lint fixes.
- Before committing or calling a task done, run `npm run check` (lint, format check, type check). It must pass with no errors and no warnings.
- Fix what the checks report in the code. Don't silence them with `biome-ignore`, `@ts-ignore`, `@ts-expect-error`, `any` or config changes.
- Only for a false positive, suppress that single line with a `biome-ignore` comment that states the reason.

## Committing rules.

Never add "Co-authored-by: Claude", "Generated with Claude Code" or any similar trailer or attribution to commit messages.

Use conventional commits. don't be verbose. 1 line commits messages if i don't specify to add more details.

fix: or style: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
types other than fix: and feat: allowed are build:, chore:, ci:, docs:, style:, refactor:, perf:, test:.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
