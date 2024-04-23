'use client';

import { Heading } from '@/components/elements/heading';
import { styled } from '@/styles';

export const StyledDocumentationGlobalWrapper = styled.section`
  position: relative;
  box-shadow: 0 1px 0 0 ${({ theme }) => theme.colors.button.border};
  overflow: clip;
`;

export const StyledDocumentationLayoutWrapper = styled.div`
  display: block;
  position: relative;
  max-width: ${({ theme }) => theme.screens['2xl']};
  margin: 32px 16px 0;

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    display: grid;
    margin: 0 auto;
    grid-template-columns: 360px ${({ theme }) => theme.screens.content} 1fr;
    gap: 24px;
  }
`;

export const StyledDocumentationLayoutGradientWrapper = styled.div`
  position: absolute;
  top: 0;
  right: -150px;
  height: 700px;
  transform: rotate(180deg);

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    display: none;
  }
`;

export const StyledDocumentationLayoutSideWrapper = styled.aside`
  padding: 32px 0 32px;
  display: flex;
  flex-direction: column-reverse;
  gap: 32px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding: 32px 0 16px;
  }

  & button {
    margin: 0;
    width: 100%;
    min-width: fit-content;

    @media (max-width: ${({ theme }) => theme.screens.md}) {
      .DocSearch-Button-Placeholder {
        display: block;
      }
    }
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: column;
    gap: 48px;
    padding: 72px 24px 64px 48px;
    box-shadow: 1px 0 0 0 ${({ theme }) => theme.colors.button.border};
  }
`;

export const StyledDocumentationLayoutMobileHeading = styled(Heading)`
  &&& {
    @media (min-width: ${({ theme }) => theme.screens.lg}) {
      display: none;
    }
  }
`;

export const StyledDocumentationLayoutDesktopHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.heading.desktop.l};
  color: ${({ theme }) => theme.colors.text.textGradient};
  ${({ theme }) => theme.colors.text.textGradient};
  line-height: 1.2;
  margin-bottom: 24px;

  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    display: none;
    font-size: ${({ theme }) => theme.fontSizes.heading.mobile.l};
    margin-bottom: 48px;
  }
`;

export const StyledDocumentationLayoutNavigationWrapper = styled.div`
  margin: 64px auto 0;
  @media (max-width: ${({ theme }) => theme.screens.lg}) {
    display: none;
  }
`;

export const StyledDocumentationLayoutContentWrapper = styled.article`
  padding-bottom: 64px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    padding-top: 56px;
  }

  & iframe.video-embed {
    width: 100%;
    min-height: 400px;
    margin: 10px 0;
  }
`;
