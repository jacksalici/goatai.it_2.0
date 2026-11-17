# Docs

Design and component docs for the GoatAI website, written for both people (designers, developers) and AI assistants.

Each doc explains **what** an element is, **why** it looks and behaves the way it does, and **which named variants** exist, so that a request like "work on the dot field" or "use the _X_ variant of the dot field" always points to the same thing.

## Index

| Doc | What it covers |
|---|---|
| [Dot field](dot-field.md) | The animated dot grid of the hero and the "Ask" section, and its variants: Gradient dot field, Faded dot field, Depth dot field, Stencil dot field |

## Conventions

- One file per element or system, named in kebab-case after the element: `dot-field.md`, `colors.md`, `typography.md`.
- Use the same name as the code where one exists (`DotField` → `dot-field.md`), and link the source file.
- Give every variant a short, stable name and a heading of its own, so it can be referenced by name.
- When the code changes, update the doc in the same commit.
- Describe concepts and behavior, not tuning values: name the setting that controls something (`depthBlur`) instead of writing its current value, which lives only in the code.
- Add each new doc to the index above.

## Template

```markdown
# Element name

One or two sentences: what it is and where it appears on the site.

Source: [path/to/file.tsx](../src/path/to/file.tsx)

## Anatomy
The parts it is made of.

## Behavior
How it moves and reacts (hover, click, scroll, reduced motion).

## Settings
The knobs that change it and what each one does.

## Variants
### Variant name
What is different, where it is used, how to get it in code.

## Do / Don't
Rules that keep it on brand.
```
