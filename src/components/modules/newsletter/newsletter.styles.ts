'use client';

import type { StyledNewsletterProps } from './newsletter.types';

import { StyledButton } from '@/components/elements/button/button.styles';
import { css, styled } from '@/styles';

export const StyledNewsletterWrapper = styled.div<StyledNewsletterProps>`
  position: relative;
  overflow: hidden;
  display: grid;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset,
    0 0 24px 0 ${({ theme }) => theme.shadow.innerBox} inset;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 32px;
  }

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    text-align: center;
  }

  background-image: ${({ theme }) => theme.backgroundImages.backgroundDots};
  background-repeat: repeat;
  background-size: 400px;

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
        return css`
          margin: 64px auto 24px;
          gap: 16px;
          background-image: unset;

          @media (min-width: ${({ theme }) => theme.screens.lg}) {
            margin: 0 auto 64px;
            gap: 24px;
            grid-template-columns: 1fr 516px;
          }
        `;
      case 'with-gradient':
        return css`
          margin: 48px auto 24px;
          gap: 24px;

          @media (min-width: ${({ theme }) => theme.screens.lg}) {
            grid-template-columns: 1fr 516px;
          }
        `;
      case 'blog-short':
        return css`
          gap: 24px;

          @media (min-width: ${({ theme }) => theme.screens.lg}) {
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
          @media (min-width: ${({ theme }) => theme.screens.lg}) {
            width: 1600px;
            bottom: unset;
            right: unset;
            left: -800px;
          }
        `;
      case 'with-gradient':
        return css`
          @media (min-width: ${({ theme }) => theme.screens.lg}) {
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

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
      case 'with-gradient':
        return css`
          gap: 16px;

          @media (min-width: ${({ theme }) => theme.screens.lg}) {
            max-width: 630px;
          }
        `;
      case 'blog-short':
        return css`
          gap: 24px;

          @media (min-width: ${({ theme }) => theme.screens.lg}) {
            gap: 16px;
          }
        `;
    }
  }}
`;

export const StyledNewsletterTitle = styled.p<StyledNewsletterProps>`
  line-height: 1.3;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    text-align: left;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
      case 'with-gradient':
        return css`
          font-size: ${({ theme }) => theme.fontSizes.heading.mobile.m};
          color: ${({ theme }) => theme.colors.text.lightGrey};

          @media (min-width: ${({ theme }) => theme.screens.xl}) {
            font-size: ${({ theme }) => theme.fontSizes.heading.desktop.m};
          }
        `;
      case 'blog-short':
        return css`
          font-size: ${({ theme }) => theme.fontSizes.heading.mobile.s};
          color: ${({ theme }) => theme.colors.text.white};

          @media (min-width: ${({ theme }) => theme.screens.lg}) {
            font-size: ${({ theme }) => theme.fontSizes.heading.desktop.s};
          }
        `;
    }
  }}
`;

export const StyledNewsletterFormContentWrapper = styled.div<StyledNewsletterProps>`
  display: grid;
  gap: 16px;
`;

export const StyledNewsletterFormWrapper = styled.form<StyledNewsletterProps>`
  display: grid;
  gap: 12px;

  & ${StyledButton} {
    flex-shrink: 0;
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    display: ${({ $variant }) => ($variant === 'blog-short' ? 'grid' : 'flex')};
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'blog-short':
        return css`
          & ${StyledButton} {
            width: 100%;
          }
        `;
    }
  }}
`;

export const StyledNewsletterSuccess = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.button.default};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.white};
  line-height: 1;
  text-align: center;
  padding: 16px 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.electricBlue};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset,
    0 0 8px 0 ${({ theme }) => theme.colors.shadowDefault};
`;
