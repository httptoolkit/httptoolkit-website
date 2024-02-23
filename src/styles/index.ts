// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import styled, { createGlobalStyle, css, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';

export { styled, css, ThemeProvider };

export const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
};

export const lightTheme = {
  inkBlack: '#16181E',
  darkGrey: '#1E2028',
  mediumGrey: '#32343B',
  lightGrey: '#E6E8F2',
  white: '#ffffff',
  electricBlue: '#5175F2',
  electricLightBlue: '#6284FA',
  cinnarbarRed: '#D93E1C',
  orangeGradient: '#D93815, #F65430',
  blueGradient: '#4064E2, #3556CA',
  darkGradient: '#1E2028, #30333E 70%',
  text: {
    lightGrey: '#16181E',
    darkGrey: '#595D68',
    cinnarbarRed: '#D93E1C',
    white: '#000000',
    alwayWhite: '#ffffff',
    alwayLightGrey: '#E6E8F2',
    electricLightBlue: '#6284FA',
  },
} as const;

export const darkTheme = {
  inkBlack: '#16181E',
  darkGrey: '#1E2028',
  mediumGrey: '#32343B',
  lightGrey: '#E6E8F2',
  white: '#ffffff',
  electricBlue: '#5175F2',
  electricLightBlue: '#6284FA',
  cinnarbarRed: '#EC502D',
  orangeGradient: '#D93815, #F65430',
  blueGradient: '#4064E2, #3556CA',
  darkGradient: '#1E2028, #30333E 70%',
  text: {
    lightGrey: '#E6E8F2',
    darkGrey: '#C5C6CA',
    cinnarbarRed: '#EC502D',
    white: '#ffffff',
    alwayWhite: '#ffffff',
    alwayLightGrey: '#E6E8F2',
    electricLightBlue: '#6284FA',
  },
};

export type TextColor = keyof (typeof lightTheme)['text'];
export type FontWeigth = keyof (typeof theme)['fontWeight'];
export type FontSize = keyof (typeof theme)['fontSizes']['text'];

export const theme = {
  screens,
  colors: {
    // TODO: implement swicht theme
    ...darkTheme,
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
};

export const GlobalStyles = createGlobalStyle`
    ${reset};

    * {
        box-sizing: border-box;
    }

    a {
      color: ${theme.colors.gray};
    }

    strong {
        font-weight: bold;
    }

    body {
        background-color: ${theme.colors.darkGrey};
        color: ${theme.colors.text.darkGrey};
        overflow-x: hidden;
        font-size: calc(100% / 1.6);
        line-height: 1.5;
    }

    em {
      font-style: italic;
    }
`;
