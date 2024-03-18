'use client';

import { css, styled } from '@/styles';

export const StyledContentWithTableWrapper = styled.section`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.inkBlack};
`;

const StyledContentWithTableGradientWrapper = css`
  position: absolute;
  height: 900px;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    display: none;
  }
`;

export const StyledContentWithTableUpperGradientWrapper = styled.div`
  ${StyledContentWithTableGradientWrapper}
  right: -250px;
  top: -100px;
  transform: rotate(180deg);
`;

export const StyledContentWithTableLowerGradientWrapper = styled.div`
  ${StyledContentWithTableGradientWrapper}
  left: -250px;
  top: 75vh;

  & > div {
    z-index: initial;
  }
`;

export const StyledContentWithTableContentWrapper = styled.div`
  position: relative;
  display: grid;
  gap: 32px;
  justify-content: center;
  padding: 32px 16px 16px;
  max-width: ${({ theme }) => theme.screens.content};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 64px 48px;
  }

  @media (min-width: ${({ theme }) => theme.screens['2xl']}) {
    padding: 64px 0;
    max-width: initial;
    grid-template-columns: 1fr ${({ theme }) => theme.screens.content} 1fr;
  }
`;

export const StyledContentWithTableTableWrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.screens['2xl']}) {
    display: flex;
    justify-content: center;

    & > div {
      max-width: 296px;
      width: 100%;
      height: fit-content;
    }
  }
`;

export const StyledContentRichText = styled.div`
  margin-top: -48px;
`;
