'use client';

import { Text } from '@/components/elements/text';
import { screens, styled } from '@/styles';

export const StyledBlogCardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border} inset,
    0px 0px 8px 0px ${({ theme }) => theme.colors.shadowDefault};

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 24px;
  }
`;

export const StyledBlogCardFigure = styled.div`
  height: 174px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  @media (min-width: ${screens.lg}) {
    height: 217px;
  }

  & img {
    width: 100%;
    height: 100%;
  }
`;

export const StyledBlogCardTag = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
`;

export const StyledBlogCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledBlogCardButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export const StyledExcerpt = styled(Text)`
  &&& {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    padding: 3px 0;
    text-overflow: ellipsis;

    /* stylelint-disable-next-line */
    display: -webkit-box;
  }
`;
