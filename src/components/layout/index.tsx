import { Suspense } from 'react';

import type { FooterProps } from './footer';
import { Footer } from './footer';
import { SimpleFooter } from './footer/simple-footer';
import { Header } from './header';
import { TopBanner } from './top-banner';

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
  // Define banner content here - set to null to hide the banner
  const bannerContent = (
    <p>
      <strong>50% off annual Pro accounts until Cyber Monday</strong>, with coupon BLACKFRIDAY25
    </p>
  );

  return (
    <>
      {bannerContent && <TopBanner>{bannerContent}</TopBanner>}
      <Header isNavigationEnabled={isNavigationEnabled} />
      <Suspense>
        <main id="main-content">{children}</main>
      </Suspense>
      {withSimpleFooter ? <SimpleFooter /> : <Footer withoutNewsletter={withoutNewsletter} />}
    </>
  );
};
