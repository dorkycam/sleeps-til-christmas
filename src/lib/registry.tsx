'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/**
 * Styled-components registry for Next.js App Router
 *
 * Prevents hydration mismatches by ensuring styled-components
 * generate consistent class names between server and client.
 *
 * Must wrap the entire app to enable proper SSR for styled-components.
 */
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create stylesheet instance once using lazy initialization
  // This prevents recreating the stylesheet on every render
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  // Insert generated styles into HTML during server rendering
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // Clear the tag to prevent duplicate styles
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // On client side, render children directly
  // The styles are already in the DOM from server rendering
  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  // On server side, wrap children with StyleSheetManager
  // This captures styled-component styles during rendering
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
