'use client';

import { Heading } from '@/components/elements/heading';
import { styled } from '@/styles';
import type { DefaultTheme } from 'styled-components';

interface ThemeProps {
  theme: DefaultTheme;
}

export const StyledDocumentationGlobalWrapper = styled.section<ThemeProps>`
  position: relative;
  box-shadow: 0 1px 0 0 ${({ theme }: ThemeProps) => theme.colors.button.border};
  overflow: clip;
`;

export const StyledDocumentationLayoutWrapper = styled.div<ThemeProps>`
  display: block;
  position: relative;
  max-width: ${({ theme }: ThemeProps) => theme.screens['2xl']};
  margin: 32px 16px 0;

  @media (min-width: ${({ theme }: ThemeProps) => theme.screens.xl}) {
    display: grid;
    margin: 0 auto;
    grid-template-columns: 360px ${({ theme }: ThemeProps) => theme.screens.content} 1fr;
    gap: 24px;
  }
`;

export const StyledDocumentationLayoutGradientWrapper = styled.div<ThemeProps>`
  position: absolute;
  top: 0;
  right: -150px;
  height: 700px;
  transform: rotate(180deg);

  @media (max-width: ${({ theme }: ThemeProps) => theme.screens.lg}) {
    display: none;
  }
`;

export const StyledDocumentationLayoutSideWrapper = styled.aside<ThemeProps>`
  padding: 32px 0 32px;
  display: flex;
  flex-direction: column-reverse;
  gap: 32px;

  @media (min-width: ${({ theme }: ThemeProps) => theme.screens.lg}) {
    padding: 32px 0 16px;
  }

  & button {
    margin: 0;
    width: 100%;
    min-width: fit-content;

    @media (max-width: ${({ theme }: ThemeProps) => theme.screens.md}) {
      .DocSearch-Button-Placeholder {
        display: block;
      }
    }
  }

  @media (min-width: ${({ theme }: ThemeProps) => theme.screens.lg}) {
    flex-direction: column;
    gap: 48px;
    padding: 72px 24px 64px 48px;
    box-shadow: 1px 0 0 0 ${({ theme }: ThemeProps) => theme.colors.button.border};
  }
`;

export const StyledDocumentationLayoutMobileHeading = styled(Heading)<ThemeProps>`
  &&& {
    @media (min-width: ${({ theme }: ThemeProps) => theme.screens.lg}) {
      display: none;
    }
  }
`;

export const StyledDocumentationLayoutDesktopHeading = styled.h1<ThemeProps>`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes.heading.desktop.l};
  color: ${({ theme }: ThemeProps) => theme.colors.text.textGradient};
  ${({ theme }: ThemeProps) => theme.colors.text.textGradient};
  line-height: 1.2;
  margin-bottom: 24px;

  @media (max-width: ${({ theme }: ThemeProps) => theme.screens.lg}) {
    display: none;
    font-size: ${({ theme }: ThemeProps) => theme.fontSizes.heading.mobile.l};
    margin-bottom: 48px;
  }
`;

export const StyledDocumentationLayoutNavigationWrapper = styled.div<ThemeProps>`
  margin: 64px auto 0;
  @media (max-width: ${({ theme }: ThemeProps) => theme.screens.lg}) {
    display: none;
  }
`;

export const StyledDocumentationLayoutContentWrapper = styled.article<ThemeProps>`
  padding-bottom: 64px;

  @media (min-width: ${({ theme }: ThemeProps) => theme.screens.lg}) {
    padding-top: 56px;
  }

  & iframe.video-embed {
    width: 100%;
    min-height: 400px;
    margin: 10px 0;
  }
`;
