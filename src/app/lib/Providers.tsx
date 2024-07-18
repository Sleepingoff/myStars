'use client';

import StyledComponentsRegistry from './Registry';
import { StyleSheetManagerProps, ThemeProvider } from 'styled-components';
import React from 'react';
import theme from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyle';
import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }: StyleSheetManagerProps) => {
  return (
    <SessionProvider baseUrl={process.env.NEXTAUTH_URL}>
      <StyledComponentsRegistry>
        <>
          <GlobalStyles />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};

export default Providers;
