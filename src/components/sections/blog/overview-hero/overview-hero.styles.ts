'use client';

import { screens, styled } from '@/styles';

export const StyledHeadingWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;

  @media (min-width: ${screens['lg']}) {
    text-align: start;
    margin-top: 64px;
    margin-bottom: 48px;
  }
`;

export const StyledFeaturePost = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  border-radius: 12px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.inkBlack};
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.button.border},
    0 0 8px 0 ${({ theme }) => theme.colors.shadowDefault};
  margin-bottom: 24px;

  @media (min-width: ${screens['lg']}) {
    padding: 32px;
    flex-direction: row;
  }
`;

export const StyledPostImageWrapper = styled.div`
  width: 100%;

  & img {
    border-radius: 8px;
    overflow: hidden;
    max-height: 174px;
    @media (min-width: ${screens['lg']}) {
      max-height: fit-content;
    }
  }

  @media (min-width: ${screens['lg']}) {
    max-width: 540px;
  }
`;

export const StyledPostDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;
