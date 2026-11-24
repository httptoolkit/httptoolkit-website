import type { FooterProps } from './footer';
import { Footer } from './footer';
import { SimpleFooter } from './footer/simple-footer';
import { Header } from './header';
import { TopBanner } from './top-banner';

import { Link } from '@/components/elements/link';

interface LayoutProps extends Pick<FooterProps, 'withoutNewsletter'> {
  isNavigationEnabled?: boolean;
  withSimpleFooter?: boolean;
}

export const Layout = ({
  isNavigationEnabled = true,
  withSimpleFooter,
  children,
  withoutNewsletter,
}: Component<LayoutProps>) => {
  const bannerContent = (
    <p>
      <strong>Black Friday: Lifetime Pro accounts for the price of 2 years</strong>, until December 1st -{' '}
      <Link href="https://accounts.httptoolkit.tech/api/redirect-to-checkout?sku=pro-perpetual&email=*&source=bf26-site">
        Sign up now
      </Link>
    </p>
  );

  return (
    <>
      {bannerContent && <TopBanner>{bannerContent}</TopBanner>}
      <Header isNavigationEnabled={isNavigationEnabled} />
      <main id="main-content">{children}</main>
      {withSimpleFooter ? <SimpleFooter /> : <Footer withoutNewsletter={withoutNewsletter} />}
    </>
  );
};
