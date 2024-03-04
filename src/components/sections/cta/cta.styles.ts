'use client';

import { Container } from '@/components/elements/container';
import { StyledHeading } from '@/components/elements/heading/heading.styles';
import { StyledStack } from '@/components/elements/stack/stack.styles';
import { Text } from '@/components/elements/text';
import { StyledText } from '@/components/elements/text/text.styles';
import { styled, css, screens } from '@/styles';

const ctaSectionStyles = css`
  max-width: 1440px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.button.border};
  border-radius: 16px;
  overflow: hidden;
  margin: 96px auto;
`;

export const StyledHeroWrapper = styled.section<{ $isHero: boolean; $isLargeText: boolean }>`
  position: relative;
  padding-top: 96px;
  padding-bottom: 64px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow.hero};
  background:
    no-repeat url('/images/backgrounds/hero-lines.svg'),
    ${({ theme }) => theme.backgroundImages.backgroundDots};
  background-position: top -80px center;

  ${({ $isHero }) => !$isHero && ctaSectionStyles};

  /* faded look effect */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(ellipse at center, transparent 60%, ${({ theme }) => theme.colors.inkBlack});
  }

  ${({ $isLargeText }) =>
    !$isLargeText &&
    css`
      padding-top: 64px;
      padding-bottom: 64px;

      @media (min-width: ${screens['lg']}) {
        padding-top: 128px;
        padding-bottom: 128px;
      }
    `};
`;

export const StyledContainer = styled(Container)`
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
    max-width: 1100px;
    line-height: 115%;
    padding-top: 4px;
  }

  & ${StyledText} {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  & ${StyledStack} {
    align-items: center;
  }
`;

export const STyledSubHeading = styled(Text)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledExcerpt = styled(Text)`
  max-width: 343px;

  @media (min-width: ${screens['lg']}) {
    max-width: 659px;
  }
`;

export const StyledCTAWrapper = styled.div<{ $isLargeText: boolean }>`
  display: flex;
  align-items: center;

  gap: 32px;
  margin-bottom: 66px;

  ${({ $isLargeText }) =>
    !$isLargeText &&
    css`
      margin-top: 16px;
    `};
`;
