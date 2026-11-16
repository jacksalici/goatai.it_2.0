# GoatAI website

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) components, [Lucide](https://lucide.dev) icons
- [Biome](https://biomejs.dev) for linting and formatting

## Getting started

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
npm run fix    # format + safe lint fixes (Biome)
npm run check  # lint, format check and type check (Biome + tsc)
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
