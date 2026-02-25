import styled, { createGlobalStyle, css, keyframes } from 'styled-components';

export { createGlobalStyle, css, keyframes, styled };

export const screens = {
  content: '662px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
};

export const textGradientMixin = css`
  background: var(--text-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const textOrangeGradientMixin = css`
  background: var(--text-orange-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const textColors = {
  lightGrey: 'var(--text-light-grey)',
  darkGrey: 'var(--text-dark-grey)',
  cinnabarRed: 'var(--text-cinnabar-red)',
  white: 'var(--text-white)',
  alwaysWhite: 'var(--text-always-white)',
  alwaysLightGrey: 'var(--text-always-light-grey)',
  electricLightBlue: 'var(--text-electric-light-blue)',
} as const;

export const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const fontSizes = {
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
    xs: '0.75rem', // 12px / 16px = 0.875
  },
  button: {
    large: '1.5rem',
    default: '1.125rem', // 18px / 16px = 1.125.5rem
    small: '1rem', // 16px / 16px = 1rem
  },
  label: {
    xl: '1.5rem', // 24px / 16px = 1.5rem
    l: '1rem', // 16px / 16px = 1rem
    m: '0.875rem', // 14px / 16px = 0.875
  },
} as const;

export const lineHeight = {
  label: '1.1',
} as const;

export const letterSpacing = {
  label: '0.06em',
} as const;

export type TextColor = keyof typeof textColors | 'textGradient' | 'textOrangeGradient';
export type FontWeight = keyof typeof fontWeight;
export type FontSize = keyof (typeof fontSizes)['text'];

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
    //minify Reset from styled-reset
    a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,main,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section{display:block}[hidden]{display:none}body{line-height:1}menu,ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}

    :root {
      --theme: dark;
      --ink-black: #16181E;
      --ink-grey: #1E2028;
      --dark-grey: #32343B;
      --darkish-grey: #53565e;
      --medium-grey: #818490;
      --light-grey: #E6E8F2;
      --white: #ffffff;
      --electric-blue: #5175F2;
      --electric-light-blue: #6284FA;
      --cinnabar-red-light: #F2522E;
      --cinnabar-red: #E1421F;
      --cinnabar-red-dark: #D93E1C;
      --orange-gradient: linear-gradient(to bottom, #F65430, #D93815);
      --blue-gradient: linear-gradient(to bottom, #4064E2, #3556CA);
      --dark-gradient: linear-gradient(to bottom, #1E2028, #30333E 70%);
      --circle-gradient: rgba(163, 105, 190, 1);
      --ellipse-gradient: rgba(31, 74, 255, 1);
      --border-gradient: rgba(255, 255, 255, 0.1);
      --border-always-gradient: rgba(255, 255, 255, 0.1);
      --border-dark: rgba(255, 255, 255, 0.2);
      --text-light-grey: #E6E8F2;
      --text-dark-grey: #C5C6CA;
      --text-cinnabar-red: #E1421F;
      --text-white: #ffffff;
      --text-always-white: #ffffff;
      --text-always-light-grey: #E6E8F2;
      --text-electric-light-blue: #6284FA;
      --text-gradient: linear-gradient(to bottom,rgba(230,232,242,1), rgba(231,235,253,0.7));
      --text-orange-gradient: linear-gradient(to top, #D93815 10.67%, #F65430 89.91%);
      --button-secondary-default: #16181E;
      --button-secondary-section: #16181E;
      --button-border: rgba(255, 255, 255, 4%);
      --shadow-default: rgba(230, 232, 242, 0.05);
      --shadow-box: 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0 0 8px rgba(230, 232, 242, 0.05);
      --shadow-inner-box: rgba(128, 130, 137, 0.1);
      --moving-border-dark: rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4);
      --background-dots: url('/images/backgrounds/dots_dark.png');
      --background-dots-card: url('/images/backgrounds/dots_dark.svg');
      --background-always-dark-dots: url('/images/backgrounds/dots_dark.svg');
      --background-gradient: url('/images/backgrounds/gradient_dark.svg');
      --background-func-gradient: url('/images/backgrounds/func_gradient_dark.png');
      --hero-box-shadow: 0 0 20px 52px inset rgb(30 32 40 / 55%);

      --prism-bg: var(--ink-black);
      --prism-comment: #999;
      --prism-punctuation: #ccc;
      --prism-tag: #e2777a;
      --prism-function-name: #6196cc;
      --prism-boolean: #f08d49;
      --prism-property: #f8c555;
      --prism-selector: #cc99cd;
      --prism-string: #7ec699;
      --prism-operator: #67cdcc;
      --prism-inserted: green;
    }

    [data-theme="light"] {
      --theme: light;
      --ink-black: #FBFAF9;
      --ink-grey: #ffffff;
      --dark-grey: #f2f2f2;
      --darkish-grey: #e4e8ed;
      --medium-grey: #9a9da8;
      --light-grey: #333333;
      --white: #16181E;
      --electric-blue: #5175F2;
      --electric-light-blue: #6284FA;
      --cinnabar-red-light: #D93E1C;
      --cinnabar-red: #E1421F;
      --cinnabar-red-dark: #F2522E;
      --orange-gradient: linear-gradient(to bottom, #F65430, #D93815);
      --blue-gradient: linear-gradient(to bottom, #3556CA, #4064E2);
      --dark-gradient: linear-gradient(to bottom, #30333E, #1E2028 70%);
      --circle-gradient: rgba(182, 99, 248, 1);
      --ellipse-gradient: rgba(0, 183, 241, 1);
      --border-gradient: transparent;
      --border-always-gradient: rgba(255, 255, 255, 0.1);
      --border-dark: rgba(103, 108, 129, 0.2);
      --text-light-grey: #16181E;
      --text-dark-grey: #595D68;
      --text-cinnabar-red: #D43D1B;
      --text-white: #000000;
      --text-always-white: #ffffff;
      --text-always-light-grey: #E6E8F2;
      --text-electric-light-blue: #5175F2;
      --text-gradient: linear-gradient(to bottom,rgba(30, 32, 40, 1),rgba(48, 51, 62, 0.7));
      --button-secondary-default: #F2F2F2;
      --button-secondary-section: #ffffff;
      --button-border: rgba(103, 108, 129, 20%);
      --shadow-default: rgba(0, 0, 0, 0.05);
      --shadow-box: 0px 2px 2px 0px rgba(0, 0, 0, 0.07);
      --moving-border-dark: rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 70%,  rgba(0, 0, 0, 0.1),  rgba(51, 60, 255, 0.4);
      --background-dots: url('/images/backgrounds/dots_light.png');
      --background-dots-card: url('/images/backgrounds/dots-light.svg');
      --background-gradient: url('/images/backgrounds/gradient_light.svg');
      --background-func-gradient: url('/images/backgrounds/func-gradient-dark.png');
      --hero-box-shadow: transparent;

      --prism-bg: var(--ink-black);
      --prism-comment: #7d8b99;
      --prism-punctuation: #5f6364;
      --prism-tag: #c92c2c;
      --prism-function-name: #c92c2c;
      --prism-boolean: #c92c2c;
      --prism-property: #c92c2c;
      --prism-selector: #2f9c0a;
      --prism-string: #2f9c0a;
      --prism-operator: #a67f59;
      --prism-inserted: #2f9c0a;
    }

    [data-theme='dark'] [data-hide-on-theme='dark'],
    [data-theme='light'] [data-hide-on-theme='light'] {
      display: none;
      padding-top: 0;
      visibility: hidden;
    }

    * {
        box-sizing: border-box;
    }

    a {
      color: var(--text-light-grey);
      text-decoration: none;
    }

    strong {
        font-weight: bold;
    }

    h1, h2, h3, h4, h5, h6 {
      line-height: 0;
    }

    button, textarea, input {
      font-family: var(--font-dmSans);
    }

    html {
      scroll-behavior: smooth;
    }

    body {
        background-color: var(--ink-grey);
        font-family: var(--font-dmSans);
        color: var(--text-light-grey);
        font-size: 16px;
        line-height: 1.5;
        /* -webkit-font-smoothing: antialiased; */
    }

    main {
      overflow-x: clip;
    }

    em {
      font-style: italic;
    }

    .skip-button {
      position: absolute!important;
      left: 7px;
      top: -16rem;
      transform: translateX(-50%);
      transition: top 400ms ease-in;
    }

    .skip-button:focus-within,
    .skip-button:focus {
      left: 50%;
      top: 1rem;
      transform: translateX(-50%);
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

    /* PrismJS syntax highlighting, based on prism-tomorrow but linked to vars */
    pre[class*="language-"] {
      background: var(--prism-bg);
      color: var(--prism-text);
    }

    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: var(--prism-comment);
    }

    .token.punctuation {
      color: var(--prism-punctuation);
    }

    .token.tag,
    .token.attr-name,
    .token.namespace,
    .token.deleted {
      color: var(--prism-tag);
    }

    .token.function-name {
      color: var(--prism-function-name);
    }

    .token.boolean,
    .token.number,
    .token.function {
      color: var(--prism-boolean);
    }

    .token.property,
    .token.class-name,
    .token.constant,
    .token.symbol {
      color: var(--prism-property);
    }

    .token.selector,
    .token.important,
    .token.atrule,
    .token.keyword,
    .token.builtin {
      color: var(--prism-selector);
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.regex,
    .token.variable {
      color: var(--prism-string);
    }

    .token.operator,
    .token.entity,
    .token.url {
      color: var(--prism-operator);
    }

    .token.inserted {
      color: var(--prism-inserted);
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }

    .token.italic {
      font-style: italic;
    }
`;