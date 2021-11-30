// Make sure subscription data always starts loading ASAP
import '../accounts/subscriptions';

import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { styled, ThemeProvider, media, GlobalStyles, theme, css } from '../styles';

import logo from '../images/logo.svg';

import { siteMetadata } from '../../gatsby-config.js';

import { Header } from './header';
import { Footer, FooterSocialIcons, FooterCreator, FooterOpenSource, FooterMenu, Headshot } from './footer';

import '@fortawesome/fontawesome-svg-core/styles.css';
import "prismjs/themes/prism-tomorrow.css";
import { LinkButton } from './form';
import { getVisibilityProps } from './modal';

const Main = styled.main`
  font-family: Lato, Helvetica, Arial, sans-serif;

  min-height: 100vh;
  display: flex;
  align-items: stretch;
  flex-direction: column;

  ${media.desktop`
    margin: 0 auto;
    width: 1024px;
  `}
`;

const LogoLink = styled((props) => <Link
  className={props.className}
  to='/'
  {...props}
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

  display: flex;

  ${media.desktopOrTablet`
    justify-content: flex-end;
    align-items: center;
  `}

  ${media.mobile `
    :not(:target) {
      ${p => !p.open && css`display: none;`};
    }

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    padding-top: ${p => p.theme.headerHeight};

    flex-direction: column;
  `}
`;

const NavBurger = styled((props) => <a
  {...props}
  onClick={(e) => {
    e.preventDefault();
    props.onClick(e);
  }}
>
  <FontAwesomeIcon icon={['fas', 'bars']} size='2x' />
</a>)`
  position: absolute;
  top: 22px;
  right: 20px;

  ${media.desktopOrTablet`
    display: none;
  `}

  /* Fixed height ensures icon size is correct before JS */
  > svg {
    height: 32px;
  }
`;

const NavClose = styled((props) => <LinkButton
  {...props}
  onClick={(e) => {
    e.preventDefault();
    props.onClick(e);
  }}
>
  <FontAwesomeIcon icon={['fas', 'times']} size='2x' />
</LinkButton>)`
  && {
    position: absolute;
    top: 17px;
    right: 18px;
    padding: 5px;
    background-color: ${p => p.theme.popBackground};

    ${media.desktopOrTablet`
      display: none;
    `}

    /* Fixed height ensures icon size is correct before JS */
    > svg {
      height: 32px;
    }
  }
`;

const NavItem = styled((props) => <Link
  activeClassName='active'
  {...props}
/>)`
  ${p => p.theme.fontSizeText};
  color: ${p => p.theme.mainColor};
  text-decoration: none;

  &:hover, &.active {
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

export class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };
  }

  hideMenu = () => {
    this.setState({
      menuOpen: false
    });
  }

  showMenu = (e) => {
    // Need to stop propagation, or this bubbles up and hits hideMenu
    e.stopPropagation();
    this.setState({
      menuOpen: true
    });
  }

  render() {
    const { modalIsActive, location } = this.props;
    const visibilityProps = getVisibilityProps(modalIsActive);

    return <ThemeProvider theme={theme}>
      <Main onClick={this.hideMenu}>
        <GlobalStyles />
        <Helmet>
          <html lang="en" />

          <link rel='preconnect' href='https://cdn.paddle.com' crossOrigin />
          <link rel='preconnect' href='https://checkout.paddle.com' crossOrigin />
          <link rel='preconnect' href='https://accounts.paddle.com' crossOrigin />
          <link rel='preload' href='https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css' as="style" />
          <link rel='preload' href='https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js' as="script" />

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

          <meta property="og:url"         content={`${siteMetadata.siteUrl}${location.pathname.slice(1)}`} />
          <meta property="og:type"        content="website" />
          <meta property="og:title"       content={siteMetadata.name} />
          <meta property="og:description" content={siteMetadata.description} />
          <meta property="og:image"       content="https://httptoolkit.tech/logo-social.png" />

          <meta name="twitter:card"        content="summary" />
          <meta name="twitter:site"        content="@httptoolkit" />
          <meta name="twitter:creator"     content="@pimterry" />
          <meta name="twitter:title"       content={siteMetadata.name} />
          <meta name="twitter:description" content={siteMetadata.description} />
          <meta name="twitter:image"       content="https://httptoolkit.tech/logo-square.png" />

          <link rel="alternate" type="application/rss+xml" href="https://httptoolkit.tech/rss.xml" />

          <script type="application/ld+json">
          {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "image": "https://httptoolkit.tech/logo-square.png",
              "screenshot": "https://httptoolkit.tech/screenshot.png",
              "video": "https://httptoolkit.tech/http-mock-demo.mp4",
              "name": "HTTP Toolkit",
              "description": "Beautiful & open-source tools to debug, test and develop with HTTP(S)",
              "softwareVersion": siteMetadata.latestAppVersion,
              "operatingSystem": [
                  "Windows",
                  "Mac",
                  "Linux",
                  "Android"
              ],
              "url": "https://httptoolkit.tech/",
              "downloadUrl": "https://httptoolkit.tech/",
              "applicationCategory": "DeveloperApplication",
              "offers": {
                  "@type": "Offer",
                  "price": "0"
              }
          })}
          </script>
        </Helmet>

        <Header {...visibilityProps}>
          <LogoLink onClick={this.hideMenu} />
          <NavBurger href="#menu" onClick={this.showMenu} />

          <Nav id="menu" open={this.state.menuOpen}>
            <NavClose onClick={this.hideMenu} />

            <NavItem to='/docs/' onClick={this.hideMenu}>Docs</NavItem>
            <NavItem to='/pricing/' onClick={this.hideMenu}>Pricing</NavItem>
            <NavItem to='/blog/' onClick={this.hideMenu}>Blog</NavItem>
            <NavItem to='/contact/' onClick={this.hideMenu}>Contact</NavItem>
          </Nav>
        </Header>

        {this.props.children}

        <Footer {...visibilityProps}>
          <FooterSocialIcons>
            <a href="https://github.com/httptoolkit">
              <FontAwesomeIcon size='2x' icon={['fab', 'github']} />
            </a>
            <a href="https://twitter.com/httptoolkit">
              <FontAwesomeIcon size='2x' icon={['fab', 'twitter']} />
            </a>
            <a href="/rss.xml">
              <FontAwesomeIcon size='2x' icon={['fas', 'rss-square']} />
            </a>
          </FooterSocialIcons>
          <FooterMenu>
            <Link to='/terms-of-service/'>Terms of Service</Link>
            <Link to='/privacy-policy/'>Privacy Policy</Link>
            <Link to='/alternatives/'>Comparisons</Link>
          </FooterMenu>
          <FooterOpenSource>
            <strong>100% open-source</strong>
            <br/>
            Dive in at <a
              href="https://github.com/httptoolkit"
              target="_blank"
              rel='noopener noreferrer'
            >github.com/httptoolkit</a>
          </FooterOpenSource>
          <FooterCreator>
            <Headshot />
            Built in Barcelona
            <br/>
            by <a href="https://twitter.com/pimterry">
              Tim Perry
            </a>
          </FooterCreator>
        </Footer>
      </Main>
    </ThemeProvider>;
  }
}