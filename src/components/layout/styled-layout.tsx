'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { GlobalStyles } from '@/styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const StyledLayout = ({ children }: MainLayoutProps) => {
  return (
    <NextThemeProvider>
      <GlobalStyles />
      {children}
    </NextThemeProvider>
  );
};
