import styled, { createGlobalStyle, css, ThemeProvider, keyframes } from 'styled-components';
import reset from 'styled-reset';

export { styled, css, ThemeProvider };

export const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
};

const TextGradient = css`
  background: var(--text-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const colorTheme = {
  inkBlack: 'var(--ink-black)',
  darkGrey: 'var(--dark-grey)',
  mediumGrey: 'var(--medium-grey)',
  lightGrey: 'var(--light-grey)',
  white: 'var(--white)',
  electricBlue: 'var(--electric-blue)',
  electricLightBlue: 'var(--electric-light-blue)',
  cinnarbarRed: 'var(--cinnabar-red)',
  cinnarbarRedDark: 'var(--cinnabar-red-dark)',
  orangeGradient: 'var(--orange-gradient)',
  blueGradient: 'var(--blue-gradient)',
  darkGradient: 'var(--dark-gradient)',
  borderGradient: 'var(--border-gradient)',
  borderDark: 'var(--border-dark)',
  text: {
    lightGrey: 'var(--text-light-grey)',
    darkGrey: 'var(--text-dark-grey)',
    cinnarbarRed: 'var(--text-cinnabar-red)',
    white: 'var(--text-white)',
    alwayWhite: 'var(--text-always-white)',
    alwayLightGrey: 'var(--text-always-light-grey)',
    electricLightBlue: 'var(--text-electric-light-blue)',
    textGradient: TextGradient,
  },
  button: {
    secondaryDefault: 'var(--button-secondary-default)',
    secondarySection: 'var(--button-secondary-section)',
    border: 'var(--button-boder)',
  },
  shadowDefault: 'var(--shadow-default)',
} as const;

export type TextColor = keyof (typeof colorTheme)['text'];
export type FontWeigth = keyof (typeof theme)['fontWeight'];
export type FontSize = keyof (typeof theme)['fontSizes']['text'];

export const theme = {
  screens,
  colors: {
    ...colorTheme,
  },
  fontFamily: {
    dmSans: 'var(--font-dmSans)',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  fontSizes: {
    heading: {
      mobile: {
        xl: '3rem', // 48px / 16px = 3rem
        l: '2.5rem', // 40px / 16px = 2.5rem
        m: '2rem', // 32px / 16px = 2rem
        s: '1.5rem', // 24px / 16px = 1.5rem
        xs: '1.25rem', // 20px / 16px = 1.25rem
      },
      desktop: {
        xl: '5rem', // 80px / 16px = 5rem
        l: '3.5rem', // 56px / 16px = 3.5rem
        m: '2rem', // 32px / 16px = 2rem
        s: '1.5rem', // 24px / 16px = 1.5rem
        xs: '1.25rem', // 20px / 16px = 1.25rem
      },
    },
    text: {
      xll: '1.5rem', // 24px / 16px = 1.5rem
      xl: '1.25rem', // 20px / 16px = 1.25rem
      l: '1.125rem', // 18px / 16px = 1.125.5rem
      m: '1rem', // 16px / 16px = 1rem
      s: '0.875rem', // 14px / 16px = 0.875
    },
    button: {
      default: '1.125rem', // 18px / 16px = 1.125.5rem
      small: '1rem', // 16px / 16px = 1rem
    },
    label: {
      xl: '1.5rem', // 24px / 16px = 1.5rem
      l: '1rem', // 16px / 16px = 1rem
      m: '0.875rem', // 14px / 16px = 0.875
    },
  },
  lineHeight: {
    label: '1.1',
  },
  letterSpacing: {
    label: '0.06em',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    '2xl': '64px',
  },
  shadow: {
    box: 'var(--shadow-box)',
  },
};

export const Keyframes = {
  rotate: keyframes`
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  `,
};

export const GlobalStyles = createGlobalStyle`
    ${reset}

    :root {
      --ink-black: #16181E;
      --dark-grey: #1E2028;
      --medium-grey: #32343B;
      --light-grey: #E6E8F2;
      --white: #ffffff;
      --electric-blue: #5175F2;
      --electric-light-blue: #6284FA;
      --cinnabar-red: #F2522E;
      --cinnabar-red-dark: #D93E1C;
      --orange-gradient: linear-gradient(to bottom, #F65430, #D93815);
      --blue-gradient: linear-gradient(to bottom, #4064E2, #3556CA);
      --dark-gradient: linear-gradient(to bottom, #1E2028, #30333E 70%);
      --border-gradient: rgba(255, 255, 255, 0.1);
      --border-dark: rgba(255, 255, 255, 0.2);
      --text-light-grey: #E6E8F2;
      --text-dark-grey: #C5C6CA;
      --text-cinnabar-red: #EC502D;
      --text-white: #ffffff;
      --text-always-white: #ffffff;
      --text-always-light-grey: #E6E8F2;
      --text-electric-light-blue: #6284FA;
      --text-gradient: linear-gradient(to bottom,rgba(231,235,253,0.7),rgba(230,232,242,1));
      --button-secondary-default: #16181E;
      --button-secondary-section: #16181E;
      --button-boder: rgba(255, 255, 255, 4%);
      --shadow-default: rgba(230, 232, 242, 0.05);
      --shadow-box: 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0 0 8px rgba(230, 232, 242, 0.05);
    }

    .light {
      --ink-black: #FBFAF9;
      --dark-grey: #ffffff;
      --medium-grey: #f2f2f2;
      --light-grey: #333333;
      --white: #16181E;
      --electric-blue: #5175F2;
      --electric-light-blue: #6284FA;
      --cinnabar-red: #D93E1C;
      --cinnabar-red-dark: #D93E1C;
      --orange-gradient: linear-gradient(to bottom, #F65430, #D93815);
      --blue-gradient: linear-gradient(to bottom, #3556CA, #4064E2);
      --dark-gradient: linear-gradient(to bottom, #30333E, #1E2028 70%);
      --border-gradient: transparent;
      --border-dark: rgba(103, 108, 129, 0.2);
      --text-light-grey: #16181E;
      --text-dark-grey: #595D68;
      --text-cinnabar-red: #D93E1C;
      --text-white: #000000;
      --text-always-white: #ffffff;
      --text-always-light-grey: #E6E8F2;
      --text-electric-light-blue: #5175F2;
      --text-gradient: linear-gradient(to bottom,rgba(30, 32, 40, 1),rgba(48, 51, 62, 0.7));
      --button-secondary-default: #F2F2F2;
      --button-secondary-section: #ffffff;
      --button-boder: rgba(103, 108, 129, 20%);
      --shadow-default: rgba(0, 0, 0, 0.05);
      --shadow-box: 0px 2px 2px 0px rgba(0, 0, 0, 0.07);
    }

    * {
        box-sizing: border-box;
    }

    a {
      color: ${theme.colors.text.lightGrey};
      text-decoration: none;
    }

    strong {
        font-weight: bold;
    }

    h1, h2, h3, h4, h5, h6 {
      line-height: 0;
    }

    button, textarea, input {
      font-family: ${theme.fontFamily.dmSans};
    }

    body {
        background-color: ${theme.colors.darkGrey};
        font-family: ${theme.fontFamily.dmSans};
        color: ${theme.colors.text.lightGrey};
        overflow-x: hidden;
        font-size: 16px;
        line-height: 1.5;
    }

    em {
      font-style: italic;
    }

    .visually-hidden {
      border: 0;
      padding: 0;
      margin: 0;
      position: absolute !important;
      height: 1px;
      width: 1px;
      overflow: hidden;
      clip: rect(1px 1px 1px 1px); /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
      clip: rect(1px, 1px, 1px, 1px); /*maybe deprecated but we need to support legacy browsers */
      clip-path: inset(50%); /*modern browsers, clip-path works inwards from each corner*/
      white-space: nowrap; /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
    }
`;
