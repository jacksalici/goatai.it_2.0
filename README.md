# GoatAI website

## Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) components, [Lucide](https://lucide.dev) icons

## Getting started

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## Structure

```
src/app/colors.css   # color palette — edit to re-theme the site
src/app/globals.css  # Tailwind setup, fonts, breakpoints
src/app/page.tsx     # page composition
src/components/      # page sections + shadcn/ui primitives in ui/
src/lib/content.ts   # copy: services, posts, links
```
