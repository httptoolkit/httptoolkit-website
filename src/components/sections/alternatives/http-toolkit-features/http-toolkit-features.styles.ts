'use client';

import { css, screens, styled } from '@/styles';

export const StyledFeaturesHeadingWrapper = styled.div`
  max-width: 656px;
  margin: 0 auto 64px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    margin: 0 auto 96px;
  }
`;

const commonGradientStyles = css`
  position: absolute;
  height: 641px;

  @media (min-width: ${screens['lg']}) {
    height: 940px;
  }
`;

export const StyledGradientRight = styled.div`
  top: 300px;
  right: 0;
  transform: rotate(180deg);

  ${commonGradientStyles}
`;

export const StyledGradientLeft = styled.div`
  bottom: -430px;
  left: 0;

  ${commonGradientStyles}
`;
