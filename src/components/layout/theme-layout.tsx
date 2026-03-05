'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const ThemeLayout = ({ children }: MainLayoutProps) => {
  return (
    <NextThemeProvider>
      {children}
    </NextThemeProvider>
  );
};
