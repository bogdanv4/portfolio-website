# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (localhost:5173)
npm run build        # production build
npm run lint         # eslint
npm run test         # run tests once (vitest)
npm run test:watch   # tests in watch mode
npm run preview      # preview production build
```

The project also supports `bun` — `bun run dev`, `bun run build`, etc.

## Architecture

Single-page portfolio site. The only route is `/` (`src/pages/Index.tsx`), which renders all sections in order: `Navbar → Hero → About → Marquee → Projects → Experience → Testimonials → Contact`. A `Preloader` component gates display until its animation completes.

**Sections** live in `src/components/` as top-level components (not in a subfolder). Each section maps to a named anchor (`id="about"`, `id="projects"`, etc.) that the Navbar tracks via `IntersectionObserver`.

**`src/components/ui/`** — shadcn/ui primitives. Don't edit these by hand; add new ones via `npx shadcn-ui@latest add <component>`.

**Custom hooks** (`src/hooks/`):
- `useAurora` — animates multi-blob radial gradient on a canvas element; used in Hero. Pauses via `IntersectionObserver` when off-screen. Respects `prefers-reduced-motion`.
- `useWaveDots` — canvas dot-grid wave animation, also used in Hero.
- `useFlowField` — canvas flow-field particle animation.

**`ScrollReveal`** (`src/components/ScrollReveal.tsx`) — thin Framer Motion wrapper that triggers a fade/slide animation once an element enters the viewport (`once: true`). Accepts `direction`, `delay`, and `className` props. Use this for all scroll-triggered reveals.

**`FloatingParticles`** (`src/components/FloatingParticles.tsx`) — purely decorative absolute-positioned dots animated with Framer Motion. Accepts an optional `particles` config array.

## Design System

All design tokens are CSS custom properties defined in `src/index.css` under `:root`:

| Token | Purpose |
|---|---|
| `--bg`, `--bg-2` | page backgrounds |
| `--surface`, `--surface-2` | card/panel backgrounds |
| `--text`, `--muted`, `--faint` | text hierarchy |
| `--indigo`, `--indigo-bright` | primary accent |
| `--cyan`, `--violet`, `--green` | secondary accents |
| `--font-display` | Space Grotesk (headings) |
| `--font-mono` | JetBrains Mono (code/terminal aesthetic) |
| `--font-body` | DM Sans (body text) |
| `--maxw` | `1240px` max content width |

shadcn HSL variables mirror these tokens so Radix/shadcn components stay on-theme. When adding new styled elements, prefer these CSS variables over arbitrary Tailwind values.

## Path Aliases

`@/` resolves to `src/`. Configured in both `vite.config.ts` and `tsconfig`.
