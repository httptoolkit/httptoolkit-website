import { Footer } from './footer';
import { SimpleFooter } from './footer/simple-footer';
import { Header } from './header';

interface LayoutProps {
  isNavigationEnabled?: boolean;
  withSimpleFooter?: boolean;
}

export const Layout = ({ isNavigationEnabled = true, withSimpleFooter, children }: Component<LayoutProps>) => {
  return (
    <>
      <Header isNavigationEnabled={isNavigationEnabled} />
      <main id="main-content">{children}</main>
      {withSimpleFooter ? <SimpleFooter /> : <Footer />}
    </>
  );
};
