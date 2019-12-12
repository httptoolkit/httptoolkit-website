import styled, { createGlobalStyle, css, ThemeProvider } from 'styled-components';

import reset from 'styled-reset';

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faAndroid } from '@fortawesome/free-brands-svg-icons/faAndroid';
import { faChrome } from '@fortawesome/free-brands-svg-icons/faChrome';
import { faDocker } from '@fortawesome/free-brands-svg-icons/faDocker';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons/faRedditAlien';
import { faHackerNews } from '@fortawesome/free-brands-svg-icons/faHackerNews';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons/faProductHunt';
import { faDev } from '@fortawesome/free-brands-svg-icons/faDev';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { faRssSquare } from '@fortawesome/free-solid-svg-icons/faRssSquare';
import { faWindows } from '@fortawesome/free-brands-svg-icons/faWindows';
import { faApple } from '@fortawesome/free-brands-svg-icons/faApple';
import { faLinux } from '@fortawesome/free-brands-svg-icons/faLinux';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faStopwatch } from '@fortawesome/pro-light-svg-icons/faStopwatch';
import { faWrench } from '@fortawesome/pro-light-svg-icons/faWrench';
import { faSearch } from '@fortawesome/pro-light-svg-icons/faSearch';
import { faSpinner } from '@fortawesome/pro-light-svg-icons/faSpinner';
import { faBars } from '@fortawesome/pro-regular-svg-icons/faBars';
import { faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons/faToggleOn';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons/faToggleOff';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faRocket } from '@fortawesome/pro-light-svg-icons/faRocket';

config.autoAddCss = false;
library.add(
    faAndroid,
    faChrome,
    faDocker,
    faTwitter,
    faFacebook,
    faRedditAlien,
    faHackerNews,
    faProductHunt,
    faDev,
    faShareAlt,
    faRssSquare,
    faWindows,
    faApple,
    faLinux,
    faGithub,
    faStopwatch,
    faWrench,
    faSearch,
    faSpinner,
    faBars,
    faTimes,
    faInfoCircle,
    faChevronUp,
    faChevronDown,
    faToggleOn,
    faToggleOff,
    faCheck,
    faRocket
);

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
        ${media.desktop`font-size: 80px`}
        ${media.tablet`font-size: 66px`}
        ${media.mobile`font-size: calc(40px + 5vw)`}
    `,

    fontSizeBiggerHeading: css`
        ${media.desktop`font-size: 66px`}
        ${media.tablet`font-size: 52px`}
        ${media.mobile`font-size: calc(26px + 5vw)`}
    `,

    fontSizeHeading: css`
        ${media.desktop`font-size: 48px`}
        ${media.tablet`font-size: 40px`}
        ${media.mobile`font-size: calc(22px + 5vw)`}
    `,

    fontSizeNearlyHeading: css`
        ${media.desktop`font-size: 35px`}
        ${media.tablet`font-size: 32px`}
        ${media.mobile`font-size: calc(19px + 3vw)`}
    `,

    fontSizeSubheading: css`
        ${media.desktop`font-size: 22px`}
        ${media.tablet`font-size: 20px`}
        ${media.mobile`font-size: calc(15px + 2vw)`}
    `,

    fontSizeText: css`
        ${media.desktop`font-size: 18px`}
        ${media.tablet`font-size: 16px`}
        ${media.mobile`font-size: calc(14px + 1.5vw)`}
    `,
};

export function getGlobalStyles() {
    return createGlobalStyle`
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
            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* latin */
        @font-face {
            font-family: 'Merriweather';
            font-style: normal;
            font-weight: 400;
            src: local('Merriweather Regular'), local('Merriweather-Regular'), url(https://fonts.gstatic.com/s/merriweather/v21/u-440qyriQwlOrhSvowK_l5-fCZM.woff2) format('woff2');
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
            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin-ext */
        @font-face {
            font-family: 'Merriweather';
            font-style: normal;
            font-weight: 400;
            src: local('Merriweather Regular'), local('Merriweather-Regular'), url(https://fonts.gstatic.com/s/merriweather/v21/u-440qyriQwlOrhSvowK_l5-ciZMZ-Y.woff2) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        body {
            background-color: ${theme.containerBackground};
            overflow-x: hidden;
            font-family: 'Lato', sans-serif;
        }

        em {
            font-style: italic;
        }

        .tippy-tooltip-content li:not(:first-child) {
            margin-top: 10px;
        }

        .gatsby-highlight-code-line {
            background-color: #444;
            display: block;
            margin-right: -1em;
            margin-left: -1em;
            padding-right: 1em;
            padding-left: 0.75em;
            border-left: 0.25em solid #e1421f;
        }

        /* Override Auth0's style choices to match the rest of the UI */
        .auth0-lock {
            font-family: Lato, sans-serif !important;

            .auth0-lock-overlay {
                display: none; /* We have our own overlay we'll use instead */
            }

            .auth0-lock-widget {
                overflow: initial !important;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2) !important;
            }

            .auth0-lock-form {
                .auth0-lock-name {
                    ${theme.fontSizeHeading} !important;
                }

                p, .auth0-lock-social-button-text {
                    font-size: 16px !important;
                }
            }
        }
    `;
}