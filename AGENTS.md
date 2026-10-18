# AGENTS.md: sleeps-til-christmas

Canonical coding standards for this repo, for humans and AI agents alike.
`CLAUDE.md` imports this file. The style rules describe how the owner already
writes code (cilia-react-native, nftco-client, nftco-admin), adapted to this
stack. User instructions always take precedence over this file.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript 6** (strict)
- **Tailwind CSS v4** (CSS-first, no `tailwind.config.js`)
- **Vitest 4** · **ESLint 9** (flat config, typescript-eslint) · **Prettier 3**
- **tsparticles v4** · **dayjs** · **lucide-react**
- **Node >= 24** (`.nvmrc`), **yarn** 1
- Deployed on **Vercel**; `/api/og` runs on the edge runtime

## Project layout

```
app/                 routes only: read params, call lib helpers, render one component
src/components/      flat; one component per file, PascalCase
src/lib/             non-UI logic, camelCase files, tests co-located
src/styles/          globals.css: Tailwind import, @theme tokens, base resets
```

- `app/` routes stay thin. Real logic lives in `src/lib/`.
- **Keep folders flat.** Add a subfolder only once 3+ files genuinely belong
  together. Never wrap a single file in a folder.
- **No barrel files.** Import each symbol from the file that defines it
  (`@/components/HolidayPage`, not `@/components`).
- Domain types live with their domain (`Holiday` and `IconName` in
  `src/lib/holidays.ts`). `lib/` never imports from `components/`.
- Path alias `@/` → `src/`. Use `@/` across areas and `./` within a folder.
  `app/` has no alias of its own.

## Components

Match the shape used across the owner's other repos:

```tsx
interface HolidayPageProps {
  holiday: Holiday;
  onSelect?: (slug: HolidaySlug) => void;
}

/**
 * One-line summary of what it renders.
 *
 * @param props - what the props carry
 */
export function HolidayPage({ holiday, onSelect }: HolidayPageProps): JSX.Element {
  const handleClick = (): void => { ... };
  ...
}
```

- `export function Name(...)`: named exports only. `const X = () =>` and
  `React.FC` are not used. Default exports only where Next.js requires them
  (`page.tsx`, `layout.tsx`, `sitemap.ts`, ...).
- Props are an `interface <Component>Props` directly above the component,
  destructured in the signature.
- Explicit return types on every exported function and component
  (`JSX.Element`, `JSX.Element | null`). ESLint enforces this.
- **Library-style:** data in through props, actions out through `onX`
  callbacks, no hardcoded routes. Route files orchestrate; components render.
- Local handlers are `handleX`; callback props are `onX`.
- One component per file. Extract any inline subcomponent past ~30 lines into
  a sibling file. Targets: pages ≤ 300 lines, components ≤ 200.
- **Server Components by default.** Add `'use client'` only for state,
  effects, browser APIs, or event handlers.
- Don't wrap components in `memo` by default. Memoize the specific value that
  needs a stable identity (e.g. `useMemo` for the particle options object).

## TypeScript

- Strict mode. **No `any`** (use `unknown` and narrow). **No non-null `!`.**
  No `@ts-ignore` / `@ts-expect-error` except for a genuine library bug.
- `interface` for object shapes and props; `type` for unions, mapped, and
  derived types.
- Prefer string-literal unions from `as const` arrays over `enum`.
- Model variant state as a discriminated union (see `ParticleConfig`).
- Derive types with `Pick` / `Omit` / `Partial` instead of re-declaring fields.
- Narrow with type guards (`isHolidaySlug`) rather than `as` casts. `as const`
  is fine.
- `import type` for type-only imports (ESLint enforces this).

## Naming

- `camelCase` variables and functions; `PascalCase` types and components.
- `SCREAMING_SNAKE_CASE` module-level constants (`SPOTIFY_VISIBILITY`,
  `HOLIDAY_ICONS`, `CONTAINER_CLASS`).
- Booleans read as questions: `isToday`, `isMounted`, `hasSpotify`.
- Files: `PascalCase.tsx` for components, `camelCase.ts` for everything else.

## Imports

Five groups, separated by blank lines:

1. React / Next (`react`, `next/*`)
2. External libraries
3. Internal `@/…`
4. Relative `./…`
5. `import type …`

## Styling

- **Tailwind v4 utility classes.** No CSS modules or runtime CSS-in-JS.
- **No hardcoded colors, spacing, or font sizes in components.**
  - Static tokens (type scale extensions, spacing, shadows, neutral UI colors)
    live in `@theme` in `src/styles/globals.css`.
  - Holiday colors are runtime values in `src/lib/holidayTheme.ts`. They reach
    CSS through `holidayCssVars()`, set **once** on the page root, and
    components read them as `text-[var(--holiday-text)]`.
- Inline `style` is only for passing CSS custom properties, not for styling.
- When an element has a long class list, hoist it to a named constant
  (`CONTAINER_CLASS`). This keeps markup readable and maps directly onto a
  future styled-components-style API (`Container`, `$variant` props).
- Keep the body from scrolling horizontally; wide content scrolls in its own
  container.

## Comments

- JSDoc on every exported function and component, and on non-trivial helpers.
  Keep it short: one summary line plus `@param` / `@returns`.
- Inline comments explain **why**, not what.
- No dead code, commented-out code, or "backward compatibility" re-exports.
  Delete unused exports.

## Async and errors

- `async` / `await`, never `.then()` chains.
- Fix problems at their source. No fallback logic that masks a bug, and no
  disabling a failing test or type error to get green.

## Metadata & SEO

- Every real page has unique metadata via `generateMetadata` /
  `generateViewport` (theme color and viewport go in the viewport export).
- Holiday URLs come from `getHolidayPath` / `getHolidayUrl` in
  `src/lib/urls.ts`; never rebuild the "Christmas lives at `/`" rule inline.
- `/api/og` computes the live sleep count per request; pages use ISR
  (`revalidate`) to keep titles current.

## Testing

- Vitest, `yarn test`. Tests are co-located as `*.test.ts` next to the source.
- Test pure logic: countdown math, copy, metadata shape, lookups, option
  builders. Cover edge cases (0 / 1 / many, boundaries, bad input such as
  `constructor` as a slug).
- Pin time with `vi.useFakeTimers()` + `vi.setSystemTime(...)`, restore with
  `vi.useRealTimers()`.
- Pull deterministic logic out of components so it is testable without
  rendering (e.g. `buildParticleOptions`).

## Quality gates (before every commit)

Run on Node 24 (`nvm use`):

1. `yarn lint`
2. `yarn typecheck`
3. `yarn test`
4. `yarn build`

Prettier (`.prettierrc`): semicolons, single quotes, `trailingComma: all`,
`printWidth: 80`, `arrowParens: avoid`. Let it format.

## Git & PRs

- Branch off `develop` (or `feature/<name>`). Never commit to `main`.
- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`,
  `test:`. Include the ticket when there is one (`feat(#123): …`) and put
  `Closes #123` in the PR body.
- Keep commits focused; run the gates first.
- Never commit secrets or `.env` files. They belong in Vercel's settings.

## Writing style (code, comments, docs, UI copy)

- No em dashes. Use periods, commas, or semicolons.
- No filler (`leverage`, `robust`, `seamless`, `streamline`, `elevate`) and
  no hedging (`it's important to note`, `that said`).
- Be specific: real numbers and concrete detail.
