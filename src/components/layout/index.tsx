import { Suspense } from 'react';

import type { FooterProps } from './footer';
import { Footer } from './footer';
import { SimpleFooter } from './footer/simple-footer';
import { Header } from './header';

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
  return (
    <>
      <Header isNavigationEnabled={isNavigationEnabled} />
      <Suspense>
        <main id="main-content">{children}</main>
      </Suspense>
      {withSimpleFooter ? <SimpleFooter /> : <Footer withoutNewsletter={withoutNewsletter} />}
    </>
  );
};
