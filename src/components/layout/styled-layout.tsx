'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { ThemeProvider, GlobalStyles, theme } from '@/styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const StyledLayout = ({ children }: MainLayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <NextThemeProvider>
        <GlobalStyles />
        {children}
      </NextThemeProvider>
    </ThemeProvider>
  );
};
