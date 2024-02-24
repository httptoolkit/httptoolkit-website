import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { StyledLayout } from '@/components/layout/styled-layout';
import { siteMetadata } from '@/lib/site-metadata';
import StyledComponentsRegistry from '@/styles/styled-component-registry';

const dmSansFont = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-dmSans' });

export const metadata: Metadata = {
  title: 'Intercept, debug &amp; mock HTTP with HTTP Toolkit',
  description:
    'Beautiful, cross-platform &amp; open-source tools for debugging, testing and building with HTTP(S), on Windows, Linux &amp; Mac.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e1421f" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#fafafa" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@httptoolkit" />
      <meta name="twitter:creator" content="@pimterry" />
      <meta name="twitter:title" content={siteMetadata.name} />
      <meta name="twitter:description" content={siteMetadata.description} />
      <meta name="twitter:image" content={`${siteMetadata.siteUrl}/logo-square.png`} />

      <link rel="alternate" type="application/rss+xml" href={`${siteMetadata.siteUrl}/rss.xml`} />

      <link rel="privacy-policy" href="/privacy-policy/" />
      <link rel="terms-of-service" href="/terms-of-service/" />
      <body className={dmSansFont.variable}>
        <StyledComponentsRegistry>
          <StyledLayout>{children} </StyledLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
