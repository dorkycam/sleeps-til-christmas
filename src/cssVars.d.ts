import 'react';

declare module 'react' {
  /** Allow CSS custom properties (e.g. `--holiday-text`) in `style` props. */
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
