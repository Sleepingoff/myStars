'use client';

import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const ClientProvider = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ClientProvider;
