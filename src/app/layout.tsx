import '@/styles/globals.css';
import { DM_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next/types';
import { Suspense } from 'react';

import { PHProvider } from './providers';

import { Button } from '@/components/elements/button';
import { RadixProviders } from '@/components/layout/radix-layout';
import { ThemeLayout } from '@/components/layout/theme-layout';
import PostHogPageView from '@/components/layout/posthog-page-view';
import { darkPullZoneId, lightPullZoneId } from '@/content/data/video-dictionary';
import { siteMetadata } from '@/lib/site-metadata';
import { buildMetadata } from '@/lib/utils/build-metadata';

import { Polyfills } from '@/components/elements/polyfills';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = buildMetadata({
  metadataBase: new URL(`${siteMetadata.siteUrl}`),
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: {
    canonical: './'
  },
  openGraph: {
    type: 'website',
    images: [`${siteMetadata.siteUrl}/images/product/explore-dark.png`],
  },
  twitter: {
    card: 'summary',
    title: siteMetadata.name,
    siteId: '982983215693680641',
    site: '@httptoolkit',
    creator: '@pimterry',
    creatorId: '20509812',
    images: [`${siteMetadata.siteUrl}/images/product/explore-dark.png`], // Must be an absolute URL
  },
});

const dmSansFont = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dmSans',
  // 'optional' over 'swap': the font is preloaded & same-origin, so it almost always
  // arrives in time, and when it doesn't we keep the fallback rather than reflowing.
  display: 'optional',
  preload: true,
  // Next's generated metric-matched fallback is `local("Arial")`, which doesn't resolve
  // on Android (Roboto) or most Linux, leaving no generic family to fall back to.
  fallback: ['Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Polyfills />

      {/* Hero video posters & media come from these, but aren't discoverable until
          CSS/JS has run, so get the connections open early. One per theme: which one
          we use isn't known until the theme resolves in the browser. */}
      <link rel="preconnect" href={`https://${lightPullZoneId}.b-cdn.net`} />
      <link rel="preconnect" href={`https://${darkPullZoneId}.b-cdn.net`} />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e1421f" />
      <meta name="msapplication-TileColor" content="#e1421f" />
      <meta name="theme-color" content="#e1421f" />

      <link rel="alternate" type="application/rss+xml" href={`${siteMetadata.siteUrl}/rss.xml`} />
      <link rel="privacy-policy" href="/privacy-policy/" />
      <link rel="terms-of-service" href="/terms-of-service/" />

      <body className={dmSansFont.variable}>
        <PHProvider>
          <ThemeLayout>
            <RadixProviders>
              <Button as="link" href="#main-content" small className="skip-button">
                Skip to main content
              </Button>
              <Suspense fallback={null}>
                <PostHogPageView />
              </Suspense>
              {children}
            </RadixProviders>
          </ThemeLayout>
        </PHProvider>
      </body>
    </html>
  );
}
