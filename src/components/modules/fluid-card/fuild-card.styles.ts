'use client';

import type { StyledFluidCardProps } from './fluid-card.types';

import { css, styled, fontSizes, fontWeight } from '@/styles';

export const StyledFluidCardWrapper = styled.div<StyledFluidCardProps>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;
  padding: 24px;
  height: 100%;
  box-shadow:
    0 0 0 1px var(--button-border),
    0px 2px 24px 0px var(--shadow-default);

  ${({ $variant }) => {
    switch ($variant) {
      case 'default':
        return css`
          background: var(--ink-grey);
          gap: 32px;
        `;
      case 'dark':
        return css`
          background: var(--ink-black);
        `;
      case 'highlighted':
        return css`
          background-image: var(--background-always-dark-dots),
            var(--blue-gradient);
          background-size: 450px 450px;
          background-repeat: repeat repeat;
          background-position: center;
          box-shadow:
            0px 2.4px 1.2px 0px rgba(201, 212, 251, 0.1) inset,
            0px -1.2px 1.2px 0px rgba(16, 46, 151, 0.1) inset,
            0px 2.4px 1.2px 0px rgba(201, 212, 251, 0.1) inset,
            0px -1.2px 1.2px 0px rgba(16, 46, 151, 0.1) inset;
        `;
    }
  }}
`;

export const StyledFluidCardContentWrapper = styled.div<StyledFluidCardProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $variant }) => ($variant === 'highlighted' ? '16px' : '20px')};
`;

export const StyledFluidCardText = styled.div<StyledFluidCardProps>`
  & * {
    font-size: ${fontSizes.text.m};
    color: ${({ $variant }) =>
      $variant === 'highlighted' ? 'var(--text-always-light-grey)' : 'var(--text-dark-grey)'};
  }

  & p:not(:last-child) {
    margin-bottom: 8px;
  }

  & strong {
    color: var(--text-white);
    font-weight: ${fontWeight.bold};
  }

  & a {
    text-decoration: underline;
  }
`;