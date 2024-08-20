'use client';

import type { CTAVariant, bgVariant } from './cta.types';

import { Container } from '@/components/elements/container';
import { StyledHeading } from '@/components/elements/heading/heading.styles';
import { StyledStack } from '@/components/elements/stack/stack.styles';
import { Text } from '@/components/elements/text';
import { StyledText } from '@/components/elements/text/text.styles';
import { css, screens, styled } from '@/styles';

const ctaSquareStyles = css`
  max-width: 1344px;
  margin: 0 auto;
  margin: 96px auto;
  padding-top: 64px;
  padding-bottom: 0;
  box-shadow: 0px 0px 24px 0px rgba(189, 195, 218, 0.1) inset;
  border-radius: 16px;
  background:
    no-repeat url('/images/backgrounds/hero-lines.svg'),
    ${({ theme }) => theme.backgroundImages.backgroundDots};
  background-position: top -400px center;
  margin: 32px 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderDark};

  @media (min-width: ${screens['lg']}) {
    border: 0;
  }

  @media (min-width: ${screens['lg']}) {
    padding-top: 128px;
    padding-bottom: 128px;
    margin: 96px auto;
    background-position: top -80px center;
    /* faded look effect */
    &::before {
      content: '';
      border: 1px solid ${({ theme }) => theme.colors.borderDark};
      border-radius: 16px;
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: radial-gradient(ellipse at center, transparent 30%, ${({ theme }) => theme.colors.inkGrey});
    }
  }
`;

const ctaFluidStyles = css`
  background: no-repeat url('/images/backgrounds/hero-lines.svg');
  background-position: top -360px center;

  @media (min-width: ${screens['lg']}) {
    background-position: top -80px center;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;

    box-shadow: inset 0px 11px 16px 0px ${({ theme }) => theme.colors.inkGrey};
  }
`;

const handleBackgroundVariant = (variant: bgVariant) => {
  switch (variant) {
    case 'left-bottom-to-top-right':
      return css`
        background:
          no-repeat url(/images/backgrounds/hero-lines-2.svg),
          var(--background-dots);
        background-position: center top -388px;
      `;
    case 'rigth-bottom-to-top-left':
      return css`
        background:
          no-repeat url(/images/backgrounds/hero-lines-4.svg),
          var(--background-dots);
        background-position: center top -340px;
      `;

    case 'left-top-to-bottom-right':
      return css`
        background:
          no-repeat url(/images/backgrounds/hero-lines-3.svg),
          var(--background-dots);
        background-position: center top -310px;
      `;

    default:
      return css`
        background:
          no-repeat url('/images/backgrounds/hero-lines.svg'),
          var(--background-dots);
        background-position: top -80px center;

        @media (max-width: ${screens['md']}) {
          background-position: top -317px center;
        }
      `;
  }
};

const ctaHeroStyles = css<{ $variant: CTAVariant; $bgVariant: bgVariant }>`
  box-shadow: ${({ theme }) => theme.shadow.hero};

  @media (min-width: ${screens['md']}) {
    ${({ $bgVariant }) => handleBackgroundVariant($bgVariant)};

    /* faded look effect */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: radial-gradient(ellipse at center, transparent 60%, ${({ theme }) => theme.colors.inkGrey});
    }
  }
`;

const ctaNarrowStyles = css<{ $variant: CTAVariant; $bgVariant: bgVariant }>`
  ${ctaHeroStyles}

  &&& div[data-container="true"] {
    max-width: 657px;
  }
`;

export const StyledHeroWrapper = styled.section<{
  $variant: CTAVariant;
  $bgVariant: bgVariant;
  $footerClose: boolean;
}>`
  position: relative;
  padding-top: 32px;
  padding-bottom: 64px;
  text-align: center;

  ${({ $variant }) => $variant === 'cta-square' && ctaSquareStyles};
  ${({ $variant }) => $variant === 'cta-hero' && ctaHeroStyles};
  ${({ $variant }) => $variant === 'cta-narrow' && ctaNarrowStyles};
  ${({ $variant }) => $variant === 'cta-fluid' && ctaFluidStyles};

  @media (min-width: ${screens['lg']}) {
    padding-top: 96px;

    ${({ $footerClose }) => {
      return $footerClose
        ? `
        padding-bottom: 128px;
        margin-bottom: -64px;
      `
        : `
        padding-bottom: 64px;
      `;
    }}
  }
`;

export const StyledContainer = styled(Container)`
  &&& {
    max-width: 1140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: ${screens['lg']}) {
      padding-left: 0;
      padding-right: 0;
    }

    & ${StyledHeading} {
      max-width: 360px;
      line-height: 115%;
      padding-top: 11px;

      @media (min-width: ${screens['md']}) {
        max-width: 1115px;
      }
    }

    & ${StyledText} {
      margin: 0 auto;
    }

    & ${StyledStack} {
      align-items: center;
    }
  }
`;

export const StyledExcerpt = styled(Text)<{ $isLargeText?: boolean }>`
  &&& {
    ${({ $isLargeText }) =>
      $isLargeText &&
      css`
        max-width: 343px;

        @media (min-width: ${screens['lg']}) {
          max-width: 659px;
        }
      `};
  }
`;

export const StyledCTAWrapper = styled.div<{ $isLargeText: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  margin-bottom: 32px;

  @media (min-width: ${screens['lg']}) {
    flex-direction: row;
    margin-bottom: 64px;
    width: fit-content;
  }
`;
