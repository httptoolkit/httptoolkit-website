import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import { styled, ThemeProvider, media } from '../styles';
import { injectGlobalStyles, theme } from '../styles';

import wordMarkLogo from '../images/logo-wordmark.png';
import headshot from '../images/tim-small.png';

import { siteMetadata } from '../../gatsby-config.js';

import Header from '../components/header';
import Footer from '../components/footer';

const Main = styled.main`
  font-family: Lato;

  ${media.desktopOrTablet`
    margin: 0 auto;
    width: 1024px;
  `}
`;

const LogoLink = styled((props) => <Link className={props.className} to='/'>
  <img src={wordMarkLogo} alt="HTTP Toolkit" />
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
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Rubik+Mono+One' />
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
      </Helmet>
      <Header>
        <LogoLink/>
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