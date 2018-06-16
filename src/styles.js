import styled, { injectGlobal, css, ThemeProvider } from 'styled-components';

import reset from 'styled-reset';

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import * as android from '@fortawesome/fontawesome-free-brands/faAndroid';
import * as chrome from '@fortawesome/fontawesome-free-brands/faChrome';
import * as docker from '@fortawesome/fontawesome-free-brands/faDocker';
import * as twitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import * as facebook from '@fortawesome/fontawesome-free-brands/faFacebook';
import * as stopwatch from '@fortawesome/fontawesome-pro-light/faStopwatch';
import * as wrench from '@fortawesome/fontawesome-pro-light/faWrench';
import * as search from '@fortawesome/fontawesome-pro-light/faSearch';
import * as spinner from '@fortawesome/fontawesome-pro-light/faSpinner';
import * as bars from '@fortawesome/fontawesome-pro-regular/faBars';
import * as times from '@fortawesome/fontawesome-pro-regular/faTimes';
import * as infoCircle from '@fortawesome/fontawesome-pro-regular/faInfoCircle';

fontawesome.library.add(android, chrome, docker, twitter, facebook, stopwatch, wrench, search, spinner, bars, times, infoCircle);

export { styled, css, ThemeProvider };

export const media = {
    desktop: (...args) => css`
        @media (min-width: 1084px) {
            ${ css(...args) }
        }
    `,
    tablet: (...args) => css`
        @media (min-width: 600px) and (max-width: 1083px) {
            ${ css(...args) }
        }
    `,
    mobile: (...args) => css`
        @media (max-width: 599px) {
            ${ css(...args) }
        }
    `,

    // Combos:
    desktopOrTablet: (...args) => css`
        @media (min-width: 600px) {
            ${ css(...args) }
        }
    `,
    mobileOrTablet: (...args) => css`
        @media (max-width: 1083px) {
            ${ css(...args) }
        }
    `,
}

export const theme = {
    mainBackground: '#fafafa',
    mainColor: '#222',
    mainSubtleColor: '#7398a5',

    popColor: '#e1421f',
    popBackground: '#fff',

    primaryColor: '#1f83e0',

    containerBackground: '#d8e2e6',
    containerWatermark: '#b6c2ca',
    containerBorder: '#abb4ba',

    pageWidth: { desktop: '1024px', tablet: '100%', mobile: '100%' },
    headerHeight: '80px',

    fontSizeUltraHeading: css`
        ${media.desktop`font-size: 60pt;`}
        ${media.tablet`font-size: 50pt;`}
        ${media.mobile`font-size: calc(30pt + 5vw);`}
    `,

    fontSizeHeading: css`
        ${media.desktop`font-size: 36pt;`}
        ${media.tablet`font-size: 30pt;`}
        ${media.mobile`font-size: calc(16pt + 5vw);`}
    `,
    fontSizeSubheading: css`
        ${media.desktop`font-size: 18pt;`}
        ${media.tablet`font-size: 16pt;`}
        ${media.mobile`font-size: calc(12pt + 2vw);`}
    `,
    fontSizeText: css`
        ${media.desktop`font-size: 15pt;`}
        ${media.tablet`font-size: 13pt;`}
        ${media.mobile`font-size: calc(12pt + 1.5vw);`}
    `,
};

export function injectGlobalStyles() {
    injectGlobal`
        ${reset};
        
        * {
            box-sizing: border-box;
        }

        a {
            color: #000;
        }

        strong {
            font-weight: bold;
        }

        /* latin */
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2) format('woff2'), url(${require('./fonts/lato.woff2')}) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* latin */
        @font-face {
            font-family: 'Courgette';
            font-style: normal;
            font-weight: 400;
            src: local('Courgette Regular'), local('Courgette-Regular'), url(https://fonts.gstatic.com/s/courgette/v5/wEO_EBrAnc9BLjLQAUk1VvoK.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* latin-ext */
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2'), url(${require('./fonts/lato-ext.woff2')}) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        body {
            background-color: ${theme.containerBackground};
            overflow-x: hidden;
            font-family: 'Lato';
        }

        em {
            font-style: italic;
        }

        .tippy-tooltip-content li:not(:first-child) {
            margin-top: 10px;
        }
    `;
}