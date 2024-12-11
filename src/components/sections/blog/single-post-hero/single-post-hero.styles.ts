'use client';

import { css, screens, styled } from '@/styles';

export const StyledSinglePost = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  border-radius: 12px;
  padding: 16px;
  margin-top: 32px;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border},
    0 0 8px 0 ${({ theme }) => theme.colors.shadowDefault};
  margin-bottom: 24px;

  @media (min-width: ${screens['lg']}) {
    padding: 32px;
    align-items: normal;
    margin-top: 64px;
    flex-direction: row;
    gap: 64px;
  }
`;

export const StyledGoBack = styled.div<{ $displayOn: 'mobile' | 'desktop' }>`
  display: none;

  & a {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  ${({ $displayOn }) =>
    $displayOn === 'desktop' &&
    css`
      @media (min-width: ${screens['lg']}) {
        display: block;
      }
    `}

  ${({ $displayOn }) =>
    $displayOn === 'mobile' &&
    css`
      @media (max-width: ${screens['lg']}) {
        display: block;
        margin-top: 16px;
        margin-bottom: 32px;
      }
    `}
`;

export const StyledPostMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledSinglePostImageWrapper = styled.div`
  width: 100%;

  & img {
    border-radius: 8px;
    overflow: hidden;
    max-height: 174px;
    min-height: 174px;

    @media (min-width: ${screens['lg']}) {
      max-height: fit-content;
      min-height: 100%;
    }
  }

  @media (min-width: ${screens['lg']}) {
    max-width: 607px;
    min-width: 200px;
  }
`;

export const StyledSinglePostDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: ${screens['lg']}) {
    word-break: break-word;
  }
`;

export const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (min-width: ${screens['lg']}) {
    display: none;
    visibility: hidden;
  }
`;
