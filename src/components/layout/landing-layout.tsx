import { SimpleFooter } from './footer/simple-footer';
import { Header } from './header';
import { StyledLandingLayoutWrapper } from './styles.layout';

interface LayoutProps {
  isNavigationEnabled?: boolean;
  withSimpleFooter?: boolean;
}

export const LandingLayout = ({ isNavigationEnabled = true, children }: Component<LayoutProps>) => {
  return (
    <StyledLandingLayoutWrapper>
      <Header isNavigationEnabled={isNavigationEnabled} />
      <main id="main-content">{children}</main>
      <SimpleFooter />
    </StyledLandingLayoutWrapper>
  );
};
