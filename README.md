# Bogdan Vujić — Portfolio

Personal portfolio website built with React, TypeScript, and Vite. Features animated sections, canvas-based effects, and a dark design system.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS + CSS custom properties |
| Components | shadcn/ui (Radix UI primitives) |
| Animations | Framer Motion |
| Routing | React Router DOM v6 |
| Testing | Vitest + Testing Library |
| Package manager | npm / bun |

## Getting Started

```bash
# Install dependencies
npm install
# or
bun install

# Start development server (http://localhost:5173)
npm run dev
```

## Commands

```bash
npm run dev          # start dev server
npm run build        # production build
npm run preview      # preview production build
npm run lint         # ESLint
npm run test         # run tests once
npm run test:watch   # run tests in watch mode
```

## Project Structure

```
src/
├── components/          # Section components + shared utilities
│   ├── ui/              # shadcn/ui primitives (do not edit manually)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Marquee.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   ├── Preloader.tsx
│   ├── ScrollReveal.tsx
│   └── FloatingParticles.tsx
├── hooks/
│   ├── useAurora.ts     # multi-blob radial gradient canvas animation
│   └── useWaveDots.ts   # dot-grid wave canvas animation
├── pages/
│   └── Index.tsx        # single route — renders all sections
├── lib/utils.ts
└── index.css            # design tokens (CSS custom properties)
```

## Page Sections

The site is a single page (`/`) with the following sections rendered in order:

1. **Hero** — name, animated role typewriter, stats, canvas aurora + wave-dot backgrounds
2. **About** — manifesto paragraph, skill grid (Frontend / Backend / Tools)
3. **Marquee** — scrolling tech-stack ticker
4. **Projects** — featured project cards
5. **Experience** — work history timeline
6. **Testimonials** — testimonial carousel
7. **Contact** — contact form / links

Each section has an `id` attribute (`#about`, `#projects`, etc.) that the Navbar tracks via `IntersectionObserver` for active-link highlighting.

## Design System

Design tokens are CSS custom properties in `src/index.css`:

| Token | Purpose |
|---|---|
| `--bg`, `--bg-2` | page backgrounds |
| `--surface`, `--surface-2` | card/panel backgrounds |
| `--text`, `--muted`, `--faint` | text hierarchy |
| `--indigo`, `--indigo-bright` | primary accent |
| `--cyan`, `--violet`, `--green` | secondary accents |
| `--font-display` | Space Grotesk (headings) |
| `--font-mono` | JetBrains Mono (code aesthetic) |
| `--font-body` | DM Sans (body) |
| `--maxw` | `1240px` max content width |

Prefer these variables over arbitrary Tailwind values when styling new elements.

## Key Patterns

**Scroll reveals** — wrap elements in `<ScrollReveal direction="up" delay={0.1}>` for Framer Motion fade/slide-in on viewport entry.

**Canvas animations** — `useAurora` and `useWaveDots` attach to `<canvas>` refs and pause automatically via `IntersectionObserver` when off-screen.

**shadcn/ui components** — add new primitives with:
```bash
npx shadcn-ui@latest add <component>
```
Do not edit files under `src/components/ui/` by hand.

**Path alias** — `@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig`).
