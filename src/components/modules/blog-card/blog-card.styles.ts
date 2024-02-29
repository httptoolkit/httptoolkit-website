'use client';

import { styled } from '@/styles';

export const StyledBlogCardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border},
    0px 0px 8px 0px ${({ theme }) => theme.colors.shadowDefault};

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 24px;
  }
`;

export const StyledBlogCardFigure = styled.figure`
  height: 217px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

export const StyledBlogCardImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const StyledBlogCardTag = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 10px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.button.border};
  font-size: ${({ theme }) => theme.fontSizes.label.m};
  color: ${({ theme }) => theme.colors.text.lightGrey};
  line-height: 1.1;
  letter-spacing: 0.6;
  text-transform: uppercase;
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
