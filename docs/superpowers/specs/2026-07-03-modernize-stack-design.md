# Modernize `sleeps-til-christmas` — Design

**Date:** 2026-07-03
**Status:** Approved (design), pending implementation plan

## Goal

Move the project to a current, low-maintenance stack by **subtracting** heavy
dependencies rather than just bumping version numbers. The app is a ~2,000-line
personal holiday countdown site; its entire UI surface is a countdown number,
some styled text, a layout wrapper, a button + a few icons, a particle effect,
and a Spotify embed. The current stack carries two separate runtime CSS-in-JS
systems (antd's `@ant-design/cssinjs` and `styled-components`), each needing SSR
registry boilerplate — far too much machinery for this surface, and the source
of the SSR friction seen during a routine dependency bump.

## Context / drivers

- A routine `yarn upgrade` surfaced two failures: `react-spotify-embed@2.1.0`
  broke the SSR build ("Objects are not valid as a React child"), and the app
  leans on antd's cssinjs SSR registry.
- `styled-components` entered maintenance mode (March 2025); not a good
  long-term base for new work.
- Node 23.7.0 is EOL; deployment already moved from Elastic Beanstalk to Vercel.

## Target stack

| Layer | From → To |
|---|---|
| Runtime | Node 23 (EOL) → **Node 24 LTS** (via nvm) |
| Framework | Next **15.4 → 16** (App Router) |
| React | 19 (keep latest 19.x) |
| Language | TypeScript **5 → 6** (fix type errors as they surface) |
| Styling | styled-components + antd cssinjs → **Tailwind CSS v4** |
| Icons | `@ant-design/icons` → **`lucide-react`** |
| Particles | `@tsparticles/*` **3 → 4** (keep the effect) |
| Lint | `eslint` / `eslint-config-next` → whatever the Next 16 toolchain supports |
| Tests | none → **Vitest** (a few unit tests on countdown logic) |
| Deploy | Elastic Beanstalk → **Vercel** (already switched) |

## Dependencies removed

`antd`, `@ant-design/cssinjs`, `@ant-design/nextjs-registry`,
`styled-components`, `@types/styled-components`, `react-spotify-embed`, and
`@next/font` (folded into the built-in `next/font`).

## Code changes by file

- **`app/layout.tsx`** — drop antd `ConfigProvider`; add Tailwind global CSS
  import + font setup via `next/font`.
- **Delete** `src/lib/antd-registry.tsx`, `src/lib/registry.tsx`
  (styled-components registry), `src/styles/antdTheme.ts` — pure CSS-in-JS SSR
  plumbing no longer needed.
- **`src/components/countdown/CountdownStyles.ts`** — styled antd
  `Typography`/`Flex` become plain elements with Tailwind classes.
- **`src/components/layout/SafePageContainer.tsx`** — antd `Layout` → semantic
  `<div>`/`<main>` + Tailwind.
- **`src/components/pages/NotFoundPage.tsx`** — antd `Button`/`Space`/
  `Typography`/icons → HTML + Tailwind + `lucide-react`.
- **`src/components/pages/HolidayPage.tsx`** — `styled(Spotify)` → new local
  `SpotifyEmbed` component (~10 lines, renders Spotify's iframe directly,
  preserving the `wide`/`hidden`/`link` behavior).
- **`src/components/effects/ParticleBackground.tsx`** — adapt to tsparticles v4
  API changes.

## Theming approach (the nuanced bit)

Per-holiday colors currently come from `holidayThemes[theme]` and are injected
via inline `style`/styled props. With Tailwind, set each theme's colors as **CSS
custom properties** (`--holiday-text`, `--holiday-bg`, …) on the page container;
Tailwind classes reference those variables. This keeps all six holidays working
with **zero per-holiday class duplication** (DRY) and no runtime style objects.

## Cleanup (Beanstalk removal)

Delete `Procfile` and `.elasticbeanstalk/`; remove the `deploy: eb deploy`
script; restore `start` to plain `next start`.

## Verification

- `next build` green
- `yarn lint` clean
- Vitest unit tests on `src/lib/utils/countdown.ts` (the one piece with real
  logic — date math, singular/plural, year rollover)
- Manual browser pass over each holiday page (`/`, `/halloween`,
  `/valentines-day`, and the rest) confirming correct rendering.

## Sequencing

One feature branch, committed in logical steps, building at each step to catch
breakage early:

1. Node 24 + tooling baseline
2. Tailwind v4 setup
3. Styling swap (styled-components → Tailwind) + CSS-variable theming
4. antd removal (+ delete registries/theme) + lucide icons
5. Spotify embed replacement
6. tsparticles v4 upgrade
7. Next 16 + TypeScript 6 + lint stack
8. Beanstalk cleanup
9. Vitest + countdown tests

Single PR at the end.

## Out of scope

- Component/integration test suite (only countdown unit tests are in scope).
- Framework change away from Next.js.
- Visual redesign — the goal is stack modernization at parity, not new UI.
