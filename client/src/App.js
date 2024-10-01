'use client';

import { Content, Theme } from '@carbon/react';

export function Providers({ children }) {
  return (
    <div>
      <Theme theme="g100">
        
      </Theme>
      <Content>{children}</Content>
    </div>
  );
}
