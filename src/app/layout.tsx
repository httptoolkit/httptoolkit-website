import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { Button } from '@/components/elements/button';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { RadixProviders } from '@/components/layout/radix-layout';
import { StyledLayout } from '@/components/layout/styled-layout';
import { siteMetadata } from '@/lib/site-metadata';
import StyledComponentsRegistry from '@/styles/styled-component-registry';

const dmSansFont = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-dmSans' });

export const metadata: Metadata = {
  metadataBase: new URL(`${siteMetadata.siteUrl}`),
  title: siteMetadata.title,
  description: siteMetadata.description,
  twitter: {
    card: 'summary',
    title: siteMetadata.name,
    description: siteMetadata.description,
    siteId: '982983215693680641',
    site: '@httptoolkit',
    creator: '@pimterry',
    creatorId: '20509812',
    images: [`${siteMetadata.siteUrl}/images/hero-placeholder-dark.webp`], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e1421f" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#fafafa" />

      <link rel="alternate" type="application/rss+xml" href={`${siteMetadata.siteUrl}/rss.xml`} />
      <link rel="privacy-policy" href="/privacy-policy/" />
      <link rel="terms-of-service" href="/terms-of-service/" />

      <body className={dmSansFont.variable}>
        <StyledComponentsRegistry>
          <StyledLayout>
            <RadixProviders>
              <Button as="link" href="#main-content" $small className="skip-button">
                Skip to main content
              </Button>
              <Header />
              <main id="main-content">{children}</main>
              <Footer />
            </RadixProviders>
          </StyledLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
