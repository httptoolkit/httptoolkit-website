'use client';

import type { StyledNewsletterProps } from './newsletter.types';

import { css, styled, screens, fontSizes, fontWeight } from '@/styles';

export const StyledNewsletterWrapper = styled.div<StyledNewsletterProps>`
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

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
        return css`
          margin: 64px auto 24px;
          margin-top: 0;
          gap: 16px;
          background-image: unset;

          @media (min-width: ${screens.lg}) {
            margin: 0 auto 64px;
            gap: 24px;
            grid-template-columns: 1fr 516px;
          }
        `;
      case 'with-gradient':
        return css`
          margin: 48px auto 24px;
          gap: 24px;

          @media (min-width: ${screens.lg}) {
            grid-template-columns: 1fr 516px;
          }
        `;
      case 'blog-short':
        return css`
          gap: 24px;

          @media (min-width: ${screens.lg}) {
            padding: 24px 16px 16px;
          }
        `;
    }
  }}
`;

export const StyledNewsletterGradientWrapper = styled.div<StyledNewsletterProps>`
  position: absolute;
  width: 1200px;
  bottom: -350px;
  left: -400px;
  right: -400px;
  margin: auto;

  & > div {
    z-index: 0;
  }
  ${({ $variant }) => {
    switch ($variant) {
      case 'blog-short':
        return css`
          @media (min-width: ${screens.lg}) {
            width: 1600px;
            bottom: unset;
            right: unset;
            left: -800px;
          }
        `;
      case 'with-gradient':
        return css`
          @media (min-width: ${screens.lg}) {
            width: 1600px;
            bottom: -600px;
            right: -700px;
            left: unset;
          }
        `;
    }
  }}
`;

export const StyledNewsletterContentWrapper = styled.div<StyledNewsletterProps>`
  display: grid;
  position: relative;

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
      case 'with-gradient':
        return css`
          gap: 16px;

          @media (min-width: ${screens.lg}) {
            max-width: 630px;
          }
        `;
      case 'blog-short':
        return css`
          gap: 24px;

          @media (min-width: ${screens.lg}) {
            gap: 16px;
          }
        `;
    }
  }}
`;

export const StyledNewsletterTitle = styled.p<StyledNewsletterProps>`
  line-height: 1.3;
  text-align: center;

  @media (min-width: ${screens.lg}) {
    text-align: left;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
      case 'with-gradient':
        return css`
          font-size: ${fontSizes.heading.mobile.m};
          color: var(--text-light-grey);

          @media (min-width: ${screens.xl}) {
            font-size: ${fontSizes.heading.desktop.m};
          }
        `;
      case 'blog-short':
        return css`
          font-size: ${fontSizes.heading.mobile.s};
          color: var(--text-white);

          @media (min-width: ${screens.lg}) {
            font-size: ${fontSizes.heading.desktop.s};
          }
        `;
    }
  }}
`;

export const StyledNewsletterFormContentWrapper = styled.div<StyledNewsletterProps>`
  display: grid;
  position: relative;
  gap: 16px;
`;

export const StyledNewsletterFormWrapper = styled.form<StyledNewsletterProps>`
  display: grid;
  gap: 12px;

  & *[data-button='true'],
  *[data-badge='true'] {
    flex-shrink: 0;
  }

  @media (min-width: ${screens.lg}) {
    display: ${({ $variant }) => ($variant === 'blog-short' ? 'grid' : 'flex')};
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'blog-short':
        return css`
          & *[data-button='true'] {
            width: 100%;
          }
        `;
    }
  }}
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