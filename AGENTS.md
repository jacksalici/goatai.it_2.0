# GoatAI website working conventions.

## Committing rules.

Never add "Co-authored-by: Claude", "Generated with Claude Code" or any similar trailer or attribution to commit messages.

Use conventional commits. don't be verbose. 1 line commits messages if i don't specify to add more details.

fix: or style: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
types other than fix: and feat: allowed are build:, chore:, ci:, docs:, style:, refactor:, perf:, test:.