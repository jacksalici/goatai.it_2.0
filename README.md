# GoatAI website

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) components, [Lucide](https://lucide.dev) icons
- [`bun fmt`](https://bun.com/docs/format) for formatting

## Getting started

```bash
bun install
bun run dev    # http://localhost:3000
bun run build  # production build
bun run format # format (bun fmt)
bun run check  # format check and type check (bun fmt + tsc)
```

## Structure

```
src/app/colors.css   # color palette — edit to re-theme the site
src/app/globals.css  # Tailwind setup, fonts, breakpoints
src/app/layout.tsx   # shared header + footer
src/app/page.tsx     # home
src/app/*/page.tsx   # about, team, contact, research, blog, case-studies
src/components/      # page sections + shadcn/ui primitives in ui/
src/lib/content.ts   # nav, footer, services, contact details
src/lib/*.ts         # posts, case studies, research, team (placeholder copy)
```
