import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { styled, ThemeProvider, media, injectGlobalStyles, theme } from '../styles';

import logo from '../images/logo.svg';
import headshot from '../images/tim-small.png';

import { siteMetadata } from '../../gatsby-config.js';

import Header from '../components/header';
import Footer from '../components/footer';

const Main = styled.main`
  font-family: Lato, Helvetica, Arial, sans-serif;

  min-height: 100vh;
  display: flex;
  align-items: stretch;
  flex-direction: column;

  ${media.desktopOrTablet`
    margin: 0 auto;
    width: 1024px;
  `}
`;

const LogoLink = styled((props) => <Link
  className={props.className}
  onClick={clearMenu}
  to='/'
>
  <img src={logo} alt="HTTP Toolkit" />
</Link>)`
  height: 100%;
  display: flex;
  align-items: center;

  text-decoration: none;
  outline: none;

  img {
    position: relative;
    top: -1px;

    max-height: 50%;
    max-width: 70vw;
  }
`;

const Nav = styled.nav`
  align-self: center;
  flex: 1;
  text-align: right;

  ${media.mobile `
    :not(:target) {
      display: none;
    }

    position: fixed;
    top: ${p => p.theme.headerHeight};
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
  `}
`;

function triggerTargetUpdate() {
  // Go back and then forwards again to ensure that :target updates properly
  // This is due to a browser bug: https://github.com/whatwg/html/issues/639
  history.back();
  const { onpopstate } = window;
  window.onpopstate = function() {
    history.forward();
    window.onpopstate = onpopstate;
  };
}

function clearMenu() {
  setImmediate(() => {
    history.pushState(null, null, window.location.pathname);
    triggerTargetUpdate();
  });
}

const NavBurger = styled((props) => <a
  onClick={(e) => {
    e.preventDefault();
    history.pushState(null, null, '#menu');
    triggerTargetUpdate();
  }}
  {...props}
>
  <FontAwesomeIcon icon={['far', 'bars']} size='2x' />
</a>)`
  position: fixed;
  top: 22px;
  right: 20px;

  ${media.desktopOrTablet`
    display: none;
  `}
`;

const NavClose = styled((props) => <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    clearMenu();
  }}
  {...props}
>
  <FontAwesomeIcon icon={['far', 'times']} size='2x' />
</a>)`
  position: fixed;
  top: 17px;
  right: 17px;
  padding: 5px;
  background-color: ${p => p.theme.popBackground};

  ${media.desktopOrTablet`
    display: none;
  `}
`;

const NavItem = styled((props) => <Link onClick={clearMenu} {...props} />)`
  ${p => p.theme.fontSizeText}
  color: ${p => p.theme.mainColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-decoration-color: rgba(0,0,0,0.2);
    color: ${p => p.theme.popColor};
  }

  ${media.desktopOrTablet`
    margin: 0 0 0 20px;
  `}

  ${media.mobile`
    width: 100%;
    margin: 0;
    padding: 20px 10px;
    text-align: left;
    background-color: ${p => p.theme.popBackground};
    border-bottom: 1px solid ${p => p.theme.containerBackground};
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
  `}
`;

const TimLink = styled((props) => 
  <a className={props.className} href='https://tim.fyi'>
    <span>Tim Perry</span> <img src={headshot} alt="Tim Perry" />
  </a>
)`
  text-decoration: none;
  > span {
    text-decoration: underline;
  }

  > img {
    margin: -18px 0 -15px 6px;
    height: 52px;
    vertical-align: middle;
  }
`;

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Main>
      <Helmet>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Lato|Courgette' />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e1421f" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#fafafa" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{siteMetadata.name} | {siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />

        <meta property="og:url"         content="https://httptoolkit.tech" />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content={siteMetadata.name} />
        <meta property="og:description" content={siteMetadata.description} />
        <meta property="og:image"       content="https://httptoolkit.tech/logo-facebook.png" />

        <meta name="twitter:card"        content="summary" />
        <meta name="twitter:site"        content="@httptoolkit" />
        <meta name="twitter:title"       content={siteMetadata.name} />
        <meta name="twitter:description" content={siteMetadata.description} />
        <meta name="twitter:image"       content="https://httptoolkit.tech/logo-square.png" />

        {/* Required to make sure Monaco loads correctly on nested pages */}
        <base href="/" />
      </Helmet>

      <Header>
        <LogoLink/>
        <NavBurger href="#menu" />

        <Nav id="menu">
          <NavClose />

          <NavItem to='/pricing'>Pricing</NavItem>
          <NavItem to='/contact'>Contact</NavItem>
        </Nav>
      </Header>

      {children()}

      <Footer>
      &copy; 2018, built by <TimLink/>
      </Footer>
    </Main>
  </ThemeProvider>
);

injectGlobalStyles();

export default TemplateWrapper;