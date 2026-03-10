export const screens = {
  content: '662px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
};

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
  normal: '400',
  medium: '500',
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
    l: '1.125rem', // 18px / 16px = 1.125rem
    m: '1rem', // 16px / 16px = 1rem
    s: '0.875rem', // 14px / 16px = 0.875
    xs: '0.75rem', // 12px / 16px = 0.75
  },
  button: {
    large: '1.5rem',
    default: '1.125rem', // 18px / 16px = 1.125rem
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
