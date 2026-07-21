# CLAUDE.md — sleeps-til-christmas

Coding standards and conventions for this repo. These carry forward the house
standards used across the other projects (tinybooth, bookish) and are tailored
to this codebase's actual stack. User instructions always take precedence over
this file.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript 6** (strict)
- **Tailwind CSS v4** (CSS-first, no `tailwind.config.js`) for styling
- **Vitest 4** for tests · **ESLint 9** (flat config) + **Prettier 3**
- **tsparticles v4** (effects) · **dayjs** (dates) · **lucide-react** (icons)
- **Node >= 24** (`.nvmrc` = `24`) · package manager is **yarn**
- Deployed on **Vercel** (the `/api/og` route runs on the edge runtime)

## Project layout

- `app/` — App Router routes only. Keep these thin: read params, call helpers,
  compose components. Real logic lives in `src/`. (`app/` sits at the repo root,
  not under `src/`, so it has no `@/` alias.)
- `src/components/` — reusable UI, grouped by role (`countdown/`, `effects/`,
  `media/`, `pages/`, `seo/`). Re-exported through the single `src/components/index.ts`
  barrel; import UI from `@/components`.
- `src/lib/` — non-UI logic: `holidays.ts`, `metadata.ts`, `og.ts`,
  `themes/tokens.ts`, `utils/`.
- `src/hooks/` — generic, domain-free hooks (`useX.tsx`).
- `src/styles/globals.css` — Tailwind import + base resets.
- Path alias: **`@/` → `src/`** (mirrored in `tsconfig.json` and `vitest.config.ts`).
  Use `@/` for cross-area imports; reserve relative `./` for same-folder imports.

## Type safety

- Strict mode. **Never use `any`** — provide a proper type or use `unknown` and
  narrow it.
- **Never** suppress errors with `@ts-ignore` / `@ts-expect-error`. Fix the
  underlying issue (only exception: a genuine library bug with no workaround).
- **Explicit return types** on every exported function and component.
- Model variant state as a **discriminated union** so impossible states are
  unrepresentable, rather than one wide bag of optional fields.
- Prefer string-literal unions via `as const` arrays over `enum`.
- Derive related types with `Pick` / `Omit` / `Partial` rather than re-declaring
  fields.

## Naming

- `camelCase` for variables and functions.
- `PascalCase` for types, interfaces, classes, and components.
- `SCREAMING_SNAKE_CASE` for module-level constants and enum values.
- Files: `PascalCase` for components (`HolidayCountdown.tsx`), `camelCase` for
  utilities (`countdown.ts`).
- Prop interfaces are named `<Component>Props` and colocated directly above the
  component.

## File structure & component design

- **Keep the tree flat.** Only create a folder when 3+ related files genuinely
  belong together. Never wrap a single file in a folder + `index.ts`.
- **One component per file.** If an inline component grows past ~30 lines and
  could be reused or tested on its own, extract it.
- Target sizes: pages/screens ≤ 300 lines, components ≤ 200 lines. Refactor on
  next touch when a file blows past that.
- **Library-style components:** data comes in as props, actions come in as
  callbacks (`onSelect`, `onPress`), and routes are never hardcoded inside a
  component. The page/route orchestrates; the component renders.
- **Default to Server Components.** Only add `'use client'` when you need React
  state/effects, browser APIs, or event handlers.
- **DRY.** Before writing new code, check whether a component/util already exists
  and can be extended with a prop. If a pattern appears in 2+ places, extract it.

## No workarounds

Fix problems at their source. Don't add fallback logic that masks a bug, don't
compute on the client what should be computed once and shared, and don't disable
a failing test or type error to force green.

## Imports

Order imports in five groups:

1. React / framework (`react`, `next/*`)
2. External libraries
3. Internal absolute imports (`@/…`)
4. Relative imports (`./…`)
5. Type-only imports (`import type …`)

## Styling

- **Tailwind v4 utility classes** are the styling approach here. No CSS modules,
  styled-components, or emotion.
- **Never hardcode colors, spacing, or font sizes.** Holiday theming lives in
  `src/lib/themes/tokens.ts` (`holidayThemes` + the token scales) — pull from
  there. For repeated patterns, add a class to `globals.css` referencing existing
  values rather than reaching for inline `style={{}}` as an escape hatch.
- Keep the page body from scrolling horizontally; wide content scrolls inside its
  own container.

## Metadata & SEO

Every real content page needs unique metadata. Use `generateMetadata` /
`generateViewport` (theme color and viewport live in the viewport export, per the
Next.js API). Slug-based pages pull their title/description from the actual
holiday. The `/api/og` route computes the live sleep count itself so shared cards
are always fresh; pages use ISR (`revalidate`) to keep the title current.

## Testing

- **Vitest**, run with `yarn test`. Tests are **co-located** as `*.test.ts` next
  to the source (`metadata.ts` + `metadata.test.ts`).
- Concentrate tests on pure logic (countdown math, copy generation, metadata
  shape) and cover edge cases (0/1/many, boundaries, empty).
- For time-dependent logic, pin the clock with
  `vi.useFakeTimers()` + `vi.setSystemTime(...)` and restore with
  `vi.useRealTimers()` afterward.
- Extract deterministic logic out of components so it's testable without
  rendering.

## Quality gates (run before committing)

1. `yarn lint` — zero errors
2. `yarn tsc --noEmit` — zero type errors
3. `yarn test` — all tests pass
4. `yarn build` — production build succeeds

Prettier is configured (`.prettierrc`): semicolons, single quotes,
`trailingComma: all`, `printWidth: 80`, `arrowParens: avoid`. Let it format; don't
hand-fight it.

## Git & PRs

- Branch off `develop` (or a `feature/<name>` branch). Never commit directly to
  `main`. `develop` is the integration branch; `main` is production.
- **Conventional commit** prefixes: `feat:`, `fix:`, `chore:`, `refactor:`,
  `docs:`, `test:`. Include the ticket number when there is one:
  `feat(#123): add …`, and put `Closes #123` in the PR body.
- Keep commits focused and run the quality gates first.

## Security

Never commit secrets — no API keys, tokens, or `.env` files. They belong in
Vercel's environment settings, not git.

## Writing style (code, comments, docs, UI copy)

- No em dashes. Use periods, commas, or semicolons.
- No filler words (`leverage`, `robust`, `seamless`, `streamline`, `elevate`,
  `cutting-edge`, etc.) and no hedging (`it's important to note`, `that said`).
- Be specific. Prefer real numbers and concrete detail over vague phrasing.
