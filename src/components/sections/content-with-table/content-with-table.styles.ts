'use client';

import type { StyledContentWithTableProps } from './content-with-table.type';

import { css, styled, screens } from '@/styles';

export const StyledContentWithTableWrapper = styled.section<StyledContentWithTableProps>`
  position: relative;
  overflow: clip;
  background-color: ${({ $bgVariant }) => $bgVariant === 'darkGrey' ? 'var(--dark-grey)' : $bgVariant ? 'var(--ink-black)' : undefined};
`;

const StyledContentWithTableGradientWrapper = css`
  position: absolute;
  height: 900px;

  @media (max-width: ${screens.lg}) {
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
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  padding: 32px 0;
  max-width: ${screens.content};
  margin: 0 auto;

  @media (min-width: ${screens.lg}) {
    display: grid;
    padding: 64px 0 32px 0;
    max-width: initial;
    gap: 45px;
    grid-template-columns: ${screens.content};
  }

  @media (min-width: ${screens.xl}) {
  grid-template-columns: 1fr ${screens.content} 1fr;
  }
`;

export const StyledContentWithTableTableWrapper = styled.aside`
  display: none;

  @media (min-width: ${screens.xl}) {
    display: flex;
    justify-content: center;
    align-self: flex-start;

    position: sticky;
    top: 16px;

    & > div {
      max-width: 296px;
      min-width: 296px;
      width: 100%;
      height: fit-content;
    }
  }
`;

export const StyledContentRichText = styled.article`
  && h2:first-of-type {
    margin-top: 0;
  }

  & iframe.video-embed {
    width: 100%;
    min-height: 400px;
    margin: 10px 0;
  }
`;