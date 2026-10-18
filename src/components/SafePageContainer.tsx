import type { CSSProperties, JSX, ReactNode } from 'react';

interface SafePageContainerProps {
  children: ReactNode;
  /** Extra classes for the page root, e.g. its background. */
  className?: string;
  /** CSS custom properties for the page, e.g. from `holidayCssVars`. */
  style?: CSSProperties;
  footerContent?: ReactNode;
  onDoubleClick?: () => void;
}

/**
 * Full-viewport page container. Renders a fixed footer when footerContent is
 * provided.
 *
 * @param props - container content, styling, footer, and double-click handler
 */
export function SafePageContainer({
  children,
  className,
  style,
  footerContent,
  onDoubleClick,
}: SafePageContainerProps): JSX.Element {
  return (
    <main
      className={`relative h-screen min-h-screen w-full overflow-hidden box-border p-fluid ${className ?? ''}`}
      style={style}
      onDoubleClick={onDoubleClick}
    >
      {children}
      {footerContent && (
        <footer className="fixed bottom-0 left-0 right-0 z-[1000] p-6 text-center bg-transparent">
          {footerContent}
        </footer>
      )}
    </main>
  );
}
