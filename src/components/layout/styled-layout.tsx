'use client';

import { Header } from './header';

import { ThemeProvider, GlobalStyles, theme } from '@/styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const StyledLayout = ({ children }: MainLayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      {children}
    </ThemeProvider>
  );
};
