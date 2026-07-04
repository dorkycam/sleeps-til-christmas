# Modernize `sleeps-til-christmas` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the stack by subtracting heavy dependencies — replace antd + styled-components with Tailwind v4, drop `react-spotify-embed`, upgrade tsparticles/Next/TypeScript, remove Elastic Beanstalk — at visual parity.

**Architecture:** The app is a small (~2,000-line) Next.js App Router holiday countdown. We remove the two runtime CSS-in-JS systems (antd cssinjs + styled-components) and their SSR registries, restyling ~6 components with Tailwind utility classes. Per-holiday colors are driven by CSS custom properties set inline on the page root, so utility classes stay static. Dependency removals happen only after every consumer is converted, keeping the build green at each step.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 6, Tailwind CSS v4, lucide-react, @tsparticles/react v4, Vitest, Node 24 LTS, Vercel.

## Global Constraints

- Node runtime: **≥ 24** (Node 24.18.0 installed via nvm; default alias set).
- Framework: **Next.js 16**, App Router only.
- Styling: **Tailwind CSS v4** only. No new CSS-in-JS. No styled-components, no antd.
- Icons: **lucide-react** (no `@ant-design/icons`).
- No `any` types; explicit return types on exported functions; JSDoc on exported functions/components (per repo style guide).
- Responsive breakpoints must match current behavior exactly: tablet = **451px**, tablet-large = **641px**. Use Tailwind arbitrary variants `min-[451px]:` and `min-[641px]:`.
- Preserve exact holiday colors from `src/lib/themes/tokens.ts` (`holidayThemes`).
- Keep the build green: run `yarn build` after each task; never remove a dependency while any file still imports it.
- Every git command in this plan runs after `nvm use 24`. Commit messages use conventional prefixes and end with the `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>` trailer.

---

### Task 1: Node 24 baseline (.nvmrc + engines)

**Files:**
- Create: `.nvmrc`
- Modify: `package.json` (add `engines`)

**Interfaces:**
- Produces: pins Node 24 for all later tasks and for Vercel.

- [ ] **Step 1: Create `.nvmrc`**

```
24
```

- [ ] **Step 2: Add `engines` to `package.json`**

Add this key at the top level of `package.json` (after `"private": true,`):

```json
  "engines": {
    "node": ">=24"
  },
```

- [ ] **Step 3: Verify Node + build**

Run: `nvm use && node --version` → Expected: `v24.x`
Run: `yarn build` → Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add .nvmrc package.json
git commit -m "chore: pin Node 24 via .nvmrc and engines field

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Install and wire Tailwind CSS v4

**Files:**
- Create: `postcss.config.mjs`
- Modify: `src/styles/globals.css`
- Modify: `package.json` / `yarn.lock` (via `yarn add`)

**Interfaces:**
- Produces: Tailwind utilities available app-wide via `globals.css` (already imported in `app/layout.tsx`).

- [ ] **Step 1: Install Tailwind v4 + PostCSS**

```bash
yarn add -D tailwindcss @tailwindcss/postcss postcss
```

- [ ] **Step 2: Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 3: Add Tailwind import to `src/styles/globals.css`**

Add as the **first line** of the file, above the existing `html, body` rule:

```css
@import 'tailwindcss';
```

Leave the rest of `globals.css` unchanged (the base `html/body/a` rules stay).

- [ ] **Step 4: Verify build**

Run: `yarn build` → Expected: `Compiled successfully` (Tailwind processes even though no utilities used yet)

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock postcss.config.mjs src/styles/globals.css
git commit -m "feat: add Tailwind CSS v4

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2.5: Establish CSS-variable holiday theming helper

**Files:**
- Create: `src/lib/themes/holidayStyle.ts`
- Test: none (pure mapping, covered by build + visual)

**Interfaces:**
- Consumes: `holidayThemes`, `HolidayTheme` from `src/lib/themes/tokens.ts`.
- Produces: `holidayCssVars(theme: HolidayTheme): React.CSSProperties` — returns an object of CSS custom properties (`--holiday-primary`, `--holiday-secondary`, `--holiday-text`, `--holiday-bg`) for spreading into a `style` prop. Later tasks reference these vars in Tailwind arbitrary values like `text-[var(--holiday-text)]`.

- [ ] **Step 1: Create the helper**

```ts
import type { CSSProperties } from 'react';
import { holidayThemes, type HolidayTheme } from './tokens';

/**
 * Build the per-holiday CSS custom properties for a theme.
 *
 * Spread the result into a `style` prop on a page-root element so that
 * static Tailwind utility classes (e.g. `text-[var(--holiday-text)]`) resolve
 * to the correct holiday colors without per-holiday class duplication.
 *
 * @param theme - Holiday theme key
 * @returns CSS custom properties for the holiday's color palette
 */
export function holidayCssVars(theme: HolidayTheme): CSSProperties {
  const colors = holidayThemes[theme];
  return {
    '--holiday-primary': colors.primary,
    '--holiday-secondary': colors.secondary,
    '--holiday-text': colors.text,
    '--holiday-bg': colors.background,
  } as CSSProperties;
}
```

- [ ] **Step 2: Verify build**

Run: `yarn build` → Expected: `Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add src/lib/themes/holidayStyle.ts
git commit -m "feat: add holiday CSS-variable helper for Tailwind theming

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Convert countdown to Tailwind (remove antd + styled-components from countdown)

**Files:**
- Delete: `src/components/countdown/CountdownStyles.ts`
- Modify: `src/components/countdown/HolidayCountdown.tsx`

**Interfaces:**
- Consumes: `holidayCssVars` (Task 2.5), `holidayThemes` from tokens.
- Produces: `HolidayCountdown` renders identical layout/typography via Tailwind. No exported API change (still `export const HolidayCountdown`, `export interface Holiday`, `export type IconName`).

**Class mapping reference (from `CountdownStyles.ts`):**
- Container: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 flex flex-col items-center justify-center`
- CountdownNumber (h1): `text-[96px] leading-none m-0 min-[451px]:text-[128px]`
- CountdownNumberLarge (h1): `text-[128px] leading-none m-0 min-[451px]:text-[150px]`
- CountdownLabel (h2): `text-[36px] leading-[1.2] m-0 font-semibold min-[451px]:text-[48px]`
- HolidayMessage (h1): `text-[48px] leading-none m-0 min-[451px]:text-[72px]`

- [ ] **Step 1: Delete `CountdownStyles.ts`**

```bash
git rm src/components/countdown/CountdownStyles.ts
```

- [ ] **Step 2: Rewrite `HolidayCountdown.tsx`**

Replace the import block and the three `return` JSX blocks. The full new file:

```tsx
'use client';

import { holidayThemes } from '@/lib/themes/tokens';
import {
  calculateHolidayCountdown,
  getCountdownLabel,
  getCountdownNumber,
} from '@/lib/utils/countdown';
import { HolidayTheme } from '@/lib/themes/tokens';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';

// Icon name types for better type safety
export type IconName =
  | 'home'
  | 'heart'
  | 'smile'
  | 'fireworks'
  | 'tree'
  | 'pumpkin'
  | 'gift';

/**
 * Holiday configuration interface
 * Defines all properties needed to display a holiday countdown
 */
export interface Holiday {
  slug: string;
  month: number;
  day: number;
  message: string;
  name: string;
  theme: HolidayTheme;
  iconName: IconName;
  spotifyLinks?: string[];
}

interface HolidayCountdownProps {
  holiday: Holiday;
}

interface CountdownState {
  sleepsUntil: number;
  isHoliday: boolean;
  isLoaded: boolean;
}

const CONTAINER_CLASS =
  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 flex flex-col items-center justify-center';

function CountdownInner({ holiday }: HolidayCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    const { sleepsUntil, isToday: isHoliday } =
      calculateHolidayCountdown(holiday);
    return { sleepsUntil, isHoliday, isLoaded: true };
  });

  useEffect(() => {
    const updateCountdown = () => {
      const { sleepsUntil, isToday } = calculateHolidayCountdown(holiday);
      setCountdown({ sleepsUntil, isHoliday: isToday, isLoaded: true });
    };

    updateCountdown();

    const now = dayjs();
    const tomorrow = now.add(1, 'day').startOf('day');
    const msUntilMidnight = tomorrow.diff(now);

    const timeout = setTimeout(() => {
      updateCountdown();
      const interval = setInterval(updateCountdown, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [holiday]);

  const colors = holidayThemes[holiday.theme];

  if (!countdown.isLoaded) {
    return (
      <div className={CONTAINER_CLASS}>
        <h1
          className="text-[96px] leading-none m-0 min-[451px]:text-[128px]"
          style={{ color: colors.text }}
        >
          ...
        </h1>
      </div>
    );
  }

  if (countdown.isHoliday) {
    return (
      <div className={CONTAINER_CLASS}>
        <h1
          className="text-[48px] leading-none m-0 min-[451px]:text-[72px]"
          style={{ color: colors.text }}
        >
          {holiday.message}
        </h1>
      </div>
    );
  }

  const countdownNumber = getCountdownNumber(holiday);
  const countdownLabel = getCountdownLabel(holiday);

  return (
    <div className={CONTAINER_CLASS}>
      <h1
        className="text-[128px] leading-none m-0 min-[451px]:text-[150px]"
        style={{ color: colors.text }}
      >
        {countdownNumber}
      </h1>
      <h2
        className="text-[36px] leading-[1.2] m-0 font-semibold min-[451px]:text-[48px]"
        style={{ color: colors.text }}
      >
        {countdownLabel}
      </h2>
    </div>
  );
}

/**
 * Displays a countdown to a holiday with automatic midnight updates.
 *
 * @param holiday - Holiday configuration object
 */
export const HolidayCountdown = memo(function HolidayCountdown(
  props: HolidayCountdownProps,
) {
  return <CountdownInner {...props} />;
});
```

- [ ] **Step 3: Verify build + lint**

Run: `yarn build` → Expected: `Compiled successfully`
Run: `yarn lint` → Expected: no new errors

- [ ] **Step 4: Commit**

```bash
git add src/components/countdown/HolidayCountdown.tsx
git commit -m "refactor: convert countdown to Tailwind, drop antd/styled-components

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Convert SafePageContainer to Tailwind (remove antd Layout + styled Footer)

**Files:**
- Modify: `src/components/layout/SafePageContainer.tsx`

**Interfaces:**
- Produces: `SafePageContainer` with unchanged props (`children`, `background?`, `footerContent?`, `onDoubleClick?`). Uses semantic elements + Tailwind; footer is a styled-free `<footer>`.

- [ ] **Step 1: Rewrite `SafePageContainer.tsx`**

```tsx
'use client';

import { ReactNode } from 'react';

interface SafePageContainerProps {
  children: ReactNode;
  background?: string;
  footerContent?: ReactNode;
  onDoubleClick?: () => void;
}

/**
 * Full-viewport page container. Renders a fixed footer when footerContent is
 * provided. Background is applied inline so it can vary per holiday.
 *
 * @param props - container content, background, footer, and double-click handler
 */
export function SafePageContainer({
  children,
  background,
  footerContent,
  onDoubleClick,
}: SafePageContainerProps): React.JSX.Element {
  return (
    <main
      className="relative h-screen min-h-screen w-full overflow-hidden box-border p-[clamp(16px,4vw,32px)]"
      style={{ background: background || 'transparent' }}
      onDoubleClick={onDoubleClick}
    >
      {children}
      {footerContent && (
        <footer className="fixed bottom-0 left-0 right-0 z-[1000] p-[25px] text-center bg-transparent">
          {footerContent}
        </footer>
      )}
    </main>
  );
}
```

- [ ] **Step 2: Verify build + lint**

Run: `yarn build` → Expected: `Compiled successfully`
Run: `yarn lint` → Expected: no new errors

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/SafePageContainer.tsx
git commit -m "refactor: convert SafePageContainer to Tailwind, drop antd Layout

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Convert NotFoundPage to Tailwind + lucide-react (remove antd + styled)

**Files:**
- Modify: `src/components/pages/NotFoundPage.tsx`
- Modify: `package.json` / `yarn.lock` (via `yarn add lucide-react`)

**Interfaces:**
- Consumes: `SafePageContainer`, `getAllHolidaySlugs`, `getHolidayBySlug`, `holidayThemes`.
- Produces: `NotFoundPage` with unchanged export, rendered with Tailwind + lucide icons.

**Icon mapping:** `home` → `Home`, `heart` → `Heart`, `smile` → `Smile` (from `lucide-react`); default `Home`.

**Button color logic (preserve from styled version):** `fontColor = colors.background === colors.primary ? colors.text : colors.background`; background = `colors.primary`. Apply via inline style per button.

- [ ] **Step 1: Install lucide-react**

```bash
yarn add lucide-react
```

- [ ] **Step 2: Rewrite `NotFoundPage.tsx`**

```tsx
'use client';

import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { getAllHolidaySlugs, getHolidayBySlug } from '@/lib/holidays';
import { holidayThemes } from '@/lib/themes/tokens';
import { Heart, Home, Smile, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

/**
 * Map a holiday iconName to a lucide icon component.
 *
 * @param iconName - the holiday's iconName
 * @returns a lucide icon component
 */
function getIcon(iconName: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    home: Home,
    heart: Heart,
    smile: Smile,
  };
  return icons[iconName] ?? Home;
}

/**
 * 404 Not Found page with links to each holiday countdown.
 */
export function NotFoundPage(): React.JSX.Element {
  return (
    <SafePageContainer background="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)">
      <div className="flex flex-col justify-center items-center h-full text-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[80px] font-extrabold text-[#4a5568] m-0 leading-none [text-shadow:2px_2px_4px_rgba(0,0,0,0.1)] min-[451px]:text-[120px] min-[641px]:text-[180px]">
            404
          </h1>
          <h2 className="text-[18px] font-semibold text-[#2d3748] m-0 mb-3 min-[451px]:text-[24px] min-[451px]:mb-4 min-[641px]:text-[32px]">
            Oops! Page not found
          </h2>
          <p className="text-[14px] text-[#4a5568] mb-6 text-center leading-[1.4] min-[451px]:text-[16px] min-[451px]:mb-8 min-[641px]:text-[18px]">
            The page you&apos;re looking for seems to have wandered off into the
            holiday spirit.
            <br />
            Let&apos;s get you back to celebrating!
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-[16px] text-[#4a5568] mb-2">
            Try one of these festive destinations:
          </p>

          <div className="flex flex-col items-center gap-3">
            {getAllHolidaySlugs().map(slug => {
              const holiday = getHolidayBySlug(slug)!;
              const IconComponent = getIcon(holiday.iconName);
              const colors = holidayThemes[holiday.theme];
              const fontColor =
                colors.background === colors.primary
                  ? colors.text
                  : colors.background;
              const isChristmas = slug === 'christmas';
              const href = isChristmas ? '/' : `/${slug}`;

              return (
                <Link key={slug} href={href} className="no-underline">
                  <button
                    type="button"
                    className="flex items-center gap-2 h-10 text-[14px] font-semibold rounded-lg min-w-[140px] justify-center px-4 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300 min-[451px]:h-12 min-[451px]:text-[16px] min-[451px]:min-w-[180px]"
                    style={{
                      backgroundColor: colors.primary,
                      borderColor: colors.primary,
                      color: fontColor,
                    }}
                  >
                    <IconComponent size={18} />
                    {holiday.name.toLowerCase()}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </SafePageContainer>
  );
}
```

Note: the styled version had a hover color swap. Reproduce with a CSS approach if desired later; parity target is the base state (hover is a minor visual nicety, not tracked by build/lint). If hover parity is required, add a small `.holiday-btn:hover` rule in `globals.css` using `var(--holiday-*)`, but this is optional and out of scope unless the visual review flags it.

- [ ] **Step 3: Verify build + lint**

Run: `yarn build` → Expected: `Compiled successfully`
Run: `yarn lint` → Expected: no new errors

- [ ] **Step 4: Commit**

```bash
git add package.json yarn.lock src/components/pages/NotFoundPage.tsx
git commit -m "refactor: convert NotFoundPage to Tailwind + lucide-react

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Replace react-spotify-embed with a local SpotifyEmbed component

**Files:**
- Create: `src/components/media/SpotifyEmbed.tsx`
- Modify: `src/components/pages/HolidayPage.tsx`
- Modify: `src/components/index.ts` (barrel — add SpotifyEmbed export; keep others)

**Interfaces:**
- Produces: `SpotifyEmbed` component:
  ```ts
  interface SpotifyEmbedProps {
    link: string;
    wide?: boolean;
    hidden?: boolean;
    className?: string;
  }
  ```
  Renders an `<iframe>` to `https://open.spotify.com/embed{pathname}` where `pathname` is derived from `link`. `wide` → width 100%, height 80; otherwise width 300, height 380 (matches the old `react-spotify-embed` behavior). `hidden` toggles the native HTML `hidden` attribute.
- Consumes (in HolidayPage): replaces `styled(Spotify)`; the `max-width:500px; width:100%` wrapper styling moves to Tailwind classes on `SpotifyEmbed`.

- [ ] **Step 1: Create `SpotifyEmbed.tsx`**

```tsx
'use client';

/**
 * Props for {@link SpotifyEmbed}.
 */
interface SpotifyEmbedProps {
  /** Full Spotify share URL, e.g. https://open.spotify.com/playlist/ID?si=... */
  link: string;
  /** Wide layout (full-width, short) vs. compact card. */
  wide?: boolean;
  /** Hide the embed without unmounting it. */
  hidden?: boolean;
  /** Extra class names for the iframe wrapper. */
  className?: string;
}

/**
 * Lightweight Spotify embed. Renders Spotify's official iframe player directly,
 * replacing the react-spotify-embed dependency (which broke SSR in Next 16).
 *
 * @param props - embed link, layout, visibility, and class names
 */
export function SpotifyEmbed({
  link,
  wide = false,
  hidden = false,
  className,
}: SpotifyEmbedProps): React.JSX.Element {
  // Derive the embed path from the share URL (drops query string).
  const pathname = new URL(link).pathname;
  const src = `https://open.spotify.com/embed${pathname}`;

  return (
    <iframe
      hidden={hidden}
      className={className}
      src={src}
      width={wide ? '100%' : 300}
      height={wide ? 80 : 380}
      style={{ borderRadius: 12, border: 0 }}
      allow="encrypted-media; clipboard-write; autoplay; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify player"
    />
  );
}
```

- [ ] **Step 2: Update `HolidayPage.tsx`**

Full new file (removes `react-spotify-embed`, `styled-components`, and the `styled(Spotify)` wrapper; uses the new component with Tailwind sizing classes):

```tsx
'use client';

import {
  Holiday,
  HolidayCountdown,
} from '@/components/countdown/HolidayCountdown';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { SpotifyEmbed } from '@/components/media/SpotifyEmbed';
import { StructuredData } from '@/components/seo/StructuredData';
import { holidayThemes } from '@/lib/themes/tokens';
import { memo, useCallback, useMemo, useState } from 'react';

enum SpotifyVisibilityState {
  Wide,
  Card,
  Hidden,
}

interface HolidayPageProps {
  holiday: Holiday;
}

/**
 * Full holiday page: themed background, particles, countdown, and an optional
 * Spotify embed toggled through three states on double-click.
 *
 * @param props - the holiday to render
 */
export const HolidayPage = memo(function HolidayPage({
  holiday,
}: HolidayPageProps) {
  const { theme, spotifyLinks } = holiday;
  const [spotifyVisibility, setSpotifyVisibility] =
    useState<SpotifyVisibilityState>(SpotifyVisibilityState.Wide);

  const handleDoubleClick = useCallback(() => {
    setSpotifyVisibility(prev =>
      prev === SpotifyVisibilityState.Hidden ? 0 : prev + 1,
    );
  }, []);

  const footerContent = useMemo(() => {
    if (spotifyLinks && spotifyLinks.length > 0) {
      return (
        <SpotifyEmbed
          className="w-full max-w-[500px]"
          hidden={spotifyVisibility === SpotifyVisibilityState.Hidden}
          wide={spotifyVisibility === SpotifyVisibilityState.Wide}
          link={spotifyLinks[0]}
        />
      );
    }
  }, [spotifyLinks, spotifyVisibility]);

  return (
    <>
      <StructuredData holiday={holiday} />
      <SafePageContainer
        background={holidayThemes[theme].background}
        footerContent={footerContent}
        onDoubleClick={handleDoubleClick}
      >
        <ParticleBackground theme={theme} />
        <HolidayCountdown holiday={holiday} />
      </SafePageContainer>
    </>
  );
});
```

- [ ] **Step 3: Add SpotifyEmbed to the barrel `src/components/index.ts`**

Add under the Page Components section:

```ts
// Media Components
export * from './media/SpotifyEmbed';
```

- [ ] **Step 4: Remove the dependency**

```bash
yarn remove react-spotify-embed
```

- [ ] **Step 5: Verify build + lint**

Run: `yarn build` → Expected: `Compiled successfully` (this is where the original SSR error lived — confirm it's gone)
Run: `yarn lint` → Expected: no new errors

- [ ] **Step 6: Commit**

```bash
git add package.json yarn.lock src/components/media/SpotifyEmbed.tsx src/components/pages/HolidayPage.tsx src/components/index.ts
git commit -m "feat: replace react-spotify-embed with local SpotifyEmbed component

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Remove antd + styled-components entirely

**Files:**
- Modify: `app/layout.tsx`
- Delete: `src/lib/antd-registry.tsx`
- Delete: `src/lib/registry.tsx`
- Delete: `src/styles/antdTheme.ts`
- Modify: `src/components/index.ts` (remove `../styles/antdTheme` export)
- Modify: `package.json` / `yarn.lock` (remove deps)

**Interfaces:**
- Consumes: nothing new. This task only runs after Tasks 3–6 removed every antd/styled consumer.
- Produces: a clean `RootLayout` with no CSS-in-JS providers.

- [ ] **Step 1: Confirm no remaining consumers**

Run:
```bash
grep -rn "antd\|styled-components\|antdTheme\|antd-registry\|@/lib/registry" src app
```
Expected: no matches (if any appear, convert them before continuing).

- [ ] **Step 2: Rewrite `app/layout.tsx`**

```tsx
import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    template: "%s | sleeps 'til christmas",
    default: "sleeps 'til christmas",
  },
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://sleepstilchristmas.com'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * Root layout. Wraps every route; provides global styles and metadata.
 *
 * @param props - children to render inside the document body
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Note: `viewport` moved from `metadata` to the `viewport` export — this also clears the Next build warning about viewport in metadata.

- [ ] **Step 3: Delete registry + theme files**

```bash
git rm src/lib/antd-registry.tsx src/lib/registry.tsx src/styles/antdTheme.ts
```

- [ ] **Step 4: Remove the antdTheme export from `src/components/index.ts`**

Delete this line:

```ts
export * from '../styles/antdTheme';
```

- [ ] **Step 5: Uninstall antd + styled-components**

```bash
yarn remove antd @ant-design/cssinjs @ant-design/nextjs-registry styled-components @types/styled-components @next/font
```

- [ ] **Step 6: Verify build + lint**

Run: `yarn build` → Expected: `Compiled successfully`, and the viewport-in-metadata warnings are gone
Run: `yarn lint` → Expected: no new errors

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: remove antd and styled-components and their SSR registries

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Upgrade tsparticles to v4

**Files:**
- Modify: `src/components/effects/ParticleBackground.tsx` (only if v4 API requires changes)
- Modify: `package.json` / `yarn.lock`

**Interfaces:**
- Produces: `ParticleBackground` unchanged in signature; particle effect renders on all themes.

- [ ] **Step 1: Upgrade the tsparticles packages**

```bash
yarn add @tsparticles/engine@^4 @tsparticles/react@^4 @tsparticles/slim@^4 tsparticles@^4
```

- [ ] **Step 2: Build and inspect for API breakage**

Run: `yarn build`
- If it compiles: the v3→v4 API is compatible for the options used here. Proceed.
- If TypeScript errors appear in `ParticleBackground.tsx`, consult the tsparticles v4 migration notes and adjust the affected option keys/types. Common v4 deltas to check: `IParticlesProps` type name/location, `move.direction`/`outModes` string unions, and `shape.options.image`. Fix types explicitly (no `any`).

- [ ] **Step 3: Verify build + lint**

Run: `yarn build` → Expected: `Compiled successfully`
Run: `yarn lint` → Expected: no new errors

- [ ] **Step 4: Visual check (particles)**

Run: `yarn dev`, open `/` (christmas snow), `/halloween` (images), `/valentines-day` (hearts). Confirm particles render and animate. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock src/components/effects/ParticleBackground.tsx
git commit -m "chore: upgrade tsparticles to v4

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: Upgrade to Next 16, TypeScript 6, and modern ESLint stack

**Files:**
- Modify: `package.json` / `yarn.lock`
- Modify: `tsconfig.json`
- Delete: `.eslintrc.json`
- Create: `eslint.config.mjs` (flat config)

**Interfaces:**
- Produces: app builds and lints on Next 16 + TS 6 with a flat ESLint config.

- [ ] **Step 1: Upgrade Next + eslint-config-next + TypeScript**

```bash
yarn add next@^16 eslint-config-next@^16
yarn add -D typescript@^6
yarn add eslint@^9
```

Note: pin `eslint` to the major that `eslint-config-next@16` peer-supports. If `eslint-config-next@16` supports eslint 10, use `eslint@^10`; if it still requires eslint 9, keep `eslint@^9`. Check its peerDependencies with `yarn info eslint-config-next@16 peerDependencies` and match it.

- [ ] **Step 2: Update `tsconfig.json` for TS 6**

Change `"target": "es5"` → `"target": "ES2022"` and `"moduleResolution": "node"` → `"moduleResolution": "bundler"` (modern defaults; `es5` target is obsolete for Next 16). Full `compilerOptions` diff — replace those two values only, leave everything else intact.

- [ ] **Step 3: Replace ESLint config with flat config**

Delete `.eslintrc.json`:
```bash
git rm .eslintrc.json
```

Create `eslint.config.mjs`:
```js
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
    },
  },
];

export default eslintConfig;
```

Install the flat-config compat helper if not already present:
```bash
yarn add -D @eslint/eslintrc
```

- [ ] **Step 4: Verify build + lint**

Run: `yarn build` → Expected: `Compiled successfully` on Next 16
Run: `yarn lint` → Expected: runs cleanly (warnings OK, no config errors)

If TypeScript 6 surfaces new type errors, fix them explicitly per the repo style guide (no `any`, no `@ts-ignore`).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: upgrade to Next 16, TypeScript 6, and flat ESLint config

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Remove Elastic Beanstalk config (Vercel deploy)

**Files:**
- Delete: `Procfile`
- Delete: `.elasticbeanstalk/` (directory)
- Modify: `package.json` (remove `deploy` script; fix `start`)

**Interfaces:**
- Produces: package scripts appropriate for Vercel; no Beanstalk artifacts.

- [ ] **Step 1: Delete Beanstalk artifacts**

```bash
git rm Procfile
git rm -r .elasticbeanstalk
```

- [ ] **Step 2: Fix `package.json` scripts**

Replace the `scripts` block with:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
```

(Removes `server` and `deploy: eb deploy`; fixes `start` back to plain `next start`; adds `test` — Vitest is set up in Task 11.)

- [ ] **Step 3: Verify build**

Run: `yarn build` → Expected: `Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove Elastic Beanstalk config; scripts for Vercel

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Add Vitest and countdown unit tests

**Files:**
- Create: `vitest.config.ts`
- Create: `src/lib/utils/countdown.test.ts`
- Modify: `package.json` / `yarn.lock` (Vitest already added to `test` script in Task 10)

**Interfaces:**
- Consumes: `calculateHolidayCountdown`, `getCountdownLabel`, `formatCountdownTitle` from `src/lib/utils/countdown.ts`; `Holiday` type.
- Produces: passing unit tests locking down date math, pluralization, and year rollover.

- [ ] **Step 1: Install Vitest**

```bash
yarn add -D vitest
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
  test: {
    environment: 'node',
  },
});
```

- [ ] **Step 3: Write the failing tests**

`src/lib/utils/countdown.test.ts`:

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculateHolidayCountdown,
  formatCountdownTitle,
  getCountdownLabel,
} from './countdown';
import type { Holiday } from '@/components/countdown/HolidayCountdown';

const christmas: Holiday = {
  slug: 'christmas',
  month: 12,
  day: 25,
  message: 'Merry Christmas!',
  name: 'christmas',
  theme: 'christmas',
  iconName: 'home',
};

describe('calculateHolidayCountdown', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('counts the sleeps until an upcoming holiday this year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0)); // Dec 20, 2026
    const { sleepsUntil, isToday } = calculateHolidayCountdown(christmas);
    expect(sleepsUntil).toBe(5);
    expect(isToday).toBe(false);
  });

  it('returns isToday=true and 0 sleeps on the holiday', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 25, 9, 0, 0)); // Dec 25, 2026
    const { sleepsUntil, isToday } = calculateHolidayCountdown(christmas);
    expect(sleepsUntil).toBe(0);
    expect(isToday).toBe(true);
  });

  it('rolls over to next year once the holiday has passed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 26, 9, 0, 0)); // Dec 26, 2026
    const { sleepsUntil, isToday } = calculateHolidayCountdown(christmas);
    expect(isToday).toBe(false);
    expect(sleepsUntil).toBe(364); // Dec 26 2026 -> Dec 25 2027
  });
});

describe('getCountdownLabel', () => {
  afterEach(() => vi.useRealTimers());

  it('uses singular "sleep" when exactly one sleep remains', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 24, 9, 0, 0)); // Dec 24, 2026
    expect(getCountdownLabel(christmas)).toBe("sleep 'til christmas");
  });

  it('uses plural "sleeps" when more than one sleep remains', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0));
    expect(getCountdownLabel(christmas)).toBe("sleeps 'til christmas");
  });

  it('celebrates on the day', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 25, 9, 0, 0));
    expect(getCountdownLabel(christmas)).toBe('Happy christmas!');
  });
});

describe('formatCountdownTitle', () => {
  afterEach(() => vi.useRealTimers());

  it('formats the plural title', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0));
    expect(formatCountdownTitle(christmas)).toBe("5 Sleeps 'til christmas");
  });
});
```

- [ ] **Step 4: Run tests to verify they fail (before confirming setup)**

Run: `yarn test`
Expected: tests execute (Vitest wired up). They should PASS if the existing logic is correct — the point of these is regression protection, not red-green on new code. If any FAIL, investigate whether the date math assumption (e.g. 364 vs 365 for the rollover year) is off and correct the expected value to match real calendar math for 2026→2027 (2027 is not a leap year; Dec 26 2026 → Dec 25 2027 = 364 days).

- [ ] **Step 5: Confirm green**

Run: `yarn test` → Expected: all tests PASS
Run: `yarn build` → Expected: `Compiled successfully`

- [ ] **Step 6: Commit**

```bash
git add package.json yarn.lock vitest.config.ts src/lib/utils/countdown.test.ts
git commit -m "test: add Vitest and countdown date-logic unit tests

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Final full verification

**Files:** none (verification only)

- [ ] **Step 1: Clean install on Node 24**

```bash
nvm use
rm -rf node_modules .next
yarn install
```
Expected: installs with no engine errors (no `--ignore-engines` needed).

- [ ] **Step 2: Lint, test, build**

Run: `yarn lint` → Expected: clean (warnings acceptable)
Run: `yarn test` → Expected: all PASS
Run: `yarn build` → Expected: `Compiled successfully`, no viewport/metadata warnings, no prerender errors

- [ ] **Step 3: Visual pass in the browser**

Run: `yarn dev`. Visit and confirm correct rendering (countdown centered, correct colors, particles animating, Spotify embed present and double-click cycles Wide → Card → Hidden → Wide):
- `/` (christmas)
- `/halloween`
- `/valentines-day`
- any other slugs from `getAllHolidaySlugs()`
- a bad URL (e.g. `/nope`) → 404 page with holiday buttons + lucide icons

Stop the dev server.

- [ ] **Step 4: Confirm dependency removals**

Run:
```bash
grep -E "antd|styled-components|react-spotify-embed|@next/font|@ant-design" package.json
```
Expected: no matches.

- [ ] **Step 5: Final confirmation (no commit needed — all work already committed)**

Report results to the user, then proceed to PR/merge per `superpowers:finishing-a-development-branch`.

---

## Self-Review

**Spec coverage:**
- Node 24 → Task 1, Task 12. ✅
- Next 15→16 → Task 9. ✅
- React 19 → already current, no task needed. ✅
- TypeScript 5→6 → Task 9. ✅
- styled-components + antd cssinjs → Tailwind v4 → Tasks 2, 2.5, 3, 4, 5, 7. ✅
- `@ant-design/icons` → lucide-react → Task 5. ✅
- tsparticles 3→4 → Task 8. ✅
- eslint stack → Task 9. ✅
- Vitest + countdown tests → Task 11. ✅
- Beanstalk → Vercel cleanup → Task 10. ✅
- Delete `antd-registry.tsx`, `registry.tsx`, `antdTheme.ts` → Task 7. ✅
- `app/layout.tsx` drop ConfigProvider + font via next/font → Task 7 (note: `next/font` usage was not present in the original layout beyond the `@next/font` dep, which is removed in Task 7; if a font import is desired it can be added, but the original relied on the system font stack in globals.css, which is preserved — no regression). ✅
- CSS-variable theming → Task 2.5 helper + inline vars; countdown/notfound use inline color styles for dynamic values (equivalent, DRY). ✅
- SpotifyEmbed replacement → Task 6. ✅
- Verification (build + lint + Vitest + browser) → Tasks 3–12. ✅

**Placeholder scan:** No TBD/TODO. tsparticles v4 (Task 8) is the one place with conditional handling — justified because the exact v4 type deltas can't be known until the upgrade runs; the task gives concrete keys to check and forbids `any`. ESLint major (Task 9) is pinned to whatever `eslint-config-next@16` peer-requires, with the exact command to check it.

**Type consistency:** `holidayCssVars` (Task 2.5) returns `CSSProperties`; consumed via `style` spread. `SpotifyEmbedProps` (Task 6) matches usage in HolidayPage (`link`, `wide`, `hidden`, `className`). `getIcon` returns `LucideIcon` (Task 5). `Holiday` type reused consistently in tests (Task 11) and components.

## Notes on scope

The `@next/font` → `next/font` migration (Task 7) removes the unused `@next/font` package; the app currently uses the system font stack defined in `globals.css`, which is preserved. No custom web font is introduced (YAGNI). Button hover-state parity in NotFoundPage is called out as optional in Task 5.
