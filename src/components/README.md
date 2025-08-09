# Sleeps 'til Christmas Component Library

A modern, performant React component library built for Next.js 13+ App Router with zero hydration errors.

## Architecture

### 🏗️ Structure

```
src/components/
├── ui/              # Foundational UI components
├── layout/          # Layout and container components
├── features/        # Business logic components
└── index.ts         # Centralized exports
```

### 🎨 Design System

- **Tokens-based**: Consistent spacing, typography, and colors
- **Theme-aware**: Holiday-specific color schemes
- **Responsive**: Mobile-first design with breakpoint system
- **Accessible**: Semantic HTML and ARIA support

## Core Principles

### ⚡ Performance

- **Memoized components**: All components use `React.memo`
- **Lazy loading**: Client-side features load after hydration
- **Tree shaking**: Only import what you need
- **Minimal bundle**: Optimized styled-components setup

### 🚫 Zero Hydration Errors

- **SSR-safe patterns**: Uses 'use client' directive and proper state management
- **Safe hooks**: Client-only window access
- **Consistent rendering**: Same output on server and client
- **Progressive enhancement**: Works without JavaScript

### 🔧 Developer Experience

- **TypeScript**: Full type safety
- **Centralized exports**: Import from `@/components`
- **Clear naming**: Self-documenting component names
- **Consistent API**: Similar props across components

## Components

### UI Components

#### Typography

```tsx
import {
  Heading,
  SubHeading,
  Text,
  CountdownNumber,
  CountdownLabel,
} from '@/components';

<Heading size="6xl" color="#fff" responsive={{ md: '10xl' }}>
  25
</Heading>;
```

#### Containers

```tsx
import {
  Container,
  FlexContainer,
  CenteredContainer,
  PageWrapper,
} from '@/components';

<CenteredContainer height="100vh" padding="xl">
  <Content />
</CenteredContainer>;
```

#### Buttons

```tsx
import { Button, ButtonLink } from '@/components';

<ButtonLink href="/" variant="secondary" size="lg">
  Home
</ButtonLink>;
```

### Layout Components

#### SafePageContainer

Handles window dimensions safely without hydration issues:

```tsx
import { SafePageContainer } from '@/components';

<SafePageContainer background="#add8e6">
  <Content />
</SafePageContainer>;
```

### Feature Components

#### HolidayPage

Complete holiday page with countdown and particles:

```tsx
import { HolidayPage } from '@/components';
import { holidays } from '@/lib/holidays';

<HolidayPage holiday={holidays.christmas} />;
```

#### ParticleBackground

Theme-aware particle system:

```tsx
import { ParticleBackground } from '@/components';

<ParticleBackground theme="christmas" />;
```

#### HolidayCountdown

Countdown timer with zero hydration errors:

```tsx
import { HolidayCountdown } from '@/components';

<HolidayCountdown
  holiday={{
    month: 12,
    day: 25,
    message: 'Merry Christmas!',
    name: 'Christmas',
    theme: 'christmas',
  }}
/>;
```

## Theme System

### Holiday Themes

- `christmas`: Light blue background, white text
- `halloween`: Black background, orange accents
- `valentines`: Pink background, romantic colors
- `default`: White background, black text

### Design Tokens

- **Spacing**: `xs` to `3xl` (4px to 64px)
- **Typography**: `xs` to `10xl` (12px to 150px)
- **Breakpoints**: `sm`, `md`, `lg`, `xl`, `2xl`
- **Z-index**: Semantic layers (dropdown, modal, etc.)

## Utilities

### Client-Side Components

```tsx
'use client';

import { useState, useEffect } from 'react';

function InteractiveComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  return <div>Client-side content</div>;
}
```

## Best Practices

### ✅ Do

- Use the centralized import: `import { Component } from '@/components'`
- Leverage the design tokens for consistency
- Use 'use client' directive for client-side features
- Use semantic HTML elements
- Follow the established naming conventions

### ❌ Don't

- Import components directly from sub-folders
- Use inline styles instead of design tokens
- Access `window` directly in render
- Create new styled-components for one-off styles
- Mix client and server component patterns

## Migration Guide

### From Old Components

```tsx
// Old
import { SleepCountdown } from '@/components/SleepCountdown';
import { PageContainer } from '@/components/PageContainer';

// New
import { HolidayCountdown, SafePageContainer } from '@/components';
```

### Adding New Components

1. Create component in appropriate folder (`ui`, `layout`, or `features`)
2. Use design tokens from `@/lib/themes/tokens`
3. Use 'use client' directive for client-side logic
4. Add to `index.ts` exports
5. Document in this README

## Performance Tips

- Components are memoized by default
- Particles load after hydration to prevent blocking
- Window size detection is debounced
- Styled-components are server-side rendered
- Bundle is optimized for tree shaking

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Works with JavaScript disabled (progressive enhancement).
