import { styled } from '@linaria/react';

import { screens, fontSizes, fontWeight } from '@/styles/tokens';

export const StyledNewsletterWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0 0 24px 0 var(--shadow-inner-box) inset;

  @media (min-width: ${screens.lg}) {
    padding: 32px;
  }

  @media (max-width: ${screens.lg}) {
    text-align: center;
  }

  background-image: var(--background-dots);
  background-repeat: repeat;
  background-size: 400px;

  &[data-variant="default"] {
    margin: 64px auto 24px;
    margin-top: 0;
    gap: 16px;
    background-image: unset;

    @media (min-width: ${screens.lg}) {
      margin: 0 auto 64px;
      gap: 24px;
      grid-template-columns: 1fr 516px;
    }
  }

  &[data-variant="with-gradient"] {
    margin: 48px auto 24px;
    gap: 24px;

    @media (min-width: ${screens.lg}) {
      grid-template-columns: 1fr 516px;
    }
  }

  &[data-variant="blog-short"] {
    gap: 24px;

    @media (min-width: ${screens.lg}) {
      padding: 24px 16px 16px;
    }
  }
`;

export const StyledNewsletterGradientWrapper = styled.div`
  position: absolute;
  width: 1200px;
  bottom: -350px;
  left: -400px;
  right: -400px;
  margin: auto;

  & > div {
    z-index: 0;
  }

  &[data-variant="blog-short"] {
    @media (min-width: ${screens.lg}) {
      width: 1600px;
      bottom: unset;
      right: unset;
      left: -800px;
    }
  }

  &[data-variant="with-gradient"] {
    @media (min-width: ${screens.lg}) {
      width: 1600px;
      bottom: -600px;
      right: -700px;
      left: unset;
    }
  }
`;

export const StyledNewsletterContentWrapper = styled.div`
  display: grid;
  position: relative;

  &[data-variant="default"],
  &[data-variant="with-gradient"] {
    gap: 16px;

    @media (min-width: ${screens.lg}) {
      max-width: 630px;
    }
  }

  &[data-variant="blog-short"] {
    gap: 24px;

    @media (min-width: ${screens.lg}) {
      gap: 16px;
    }
  }
`;

export const StyledNewsletterTitle = styled.p`
  line-height: 1.3;
  text-align: center;

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }

  &[data-variant="default"],
  &[data-variant="with-gradient"] {
    font-size: ${fontSizes.heading.mobile.m};
    color: var(--text-light-grey);

    @media (min-width: ${screens.xl}) {
      font-size: ${fontSizes.heading.desktop.m};
    }
  }

  &[data-variant="blog-short"] {
    font-size: ${fontSizes.heading.mobile.s};
    color: var(--text-white);

    @media (min-width: ${screens.lg}) {
      font-size: ${fontSizes.heading.desktop.s};
    }
  }
`;

export const StyledNewsletterFormContentWrapper = styled.div`
  display: grid;
  position: relative;
  gap: 16px;
`;

export const StyledNewsletterFormWrapper = styled.form`
  display: grid;
  gap: 12px;

  & *[data-button='true'],
  *[data-badge='true'] {
    flex-shrink: 0;
  }

  @media (min-width: ${screens.lg}) {
    display: flex;
  }

  &[data-variant="blog-short"] {
    @media (min-width: ${screens.lg}) {
      display: grid;
    }

    & *[data-button='true'] {
      width: 100%;
    }
  }
`;

export const StyledNewsletterSuccess = styled.div`
  font-size: ${fontSizes.button.default};
  font-weight: ${fontWeight.medium};
  color: var(--text-white);
  line-height: 1;
  text-align: center;
  padding: 16px 24px;
  border-radius: 12px;
  background: var(--electric-blue);
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0 0 8px 0 var(--shadow-default);
`;
