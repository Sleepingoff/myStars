'use client';

import StyledComponentsRegistry from './Registry';
import { StyleSheetManagerProps, ThemeProvider } from 'styled-components';
import React from 'react';
import theme from '@/styles/theme';
import GlobalStyles from '@/styles/GlobalStyle';

const Providers = ({ children }: StyleSheetManagerProps) => {
  return (
    <StyledComponentsRegistry>
      <>
        <GlobalStyles />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </>
    </StyledComponentsRegistry>
  );
};

export default Providers;
