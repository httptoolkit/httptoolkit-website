import { styled } from '@linaria/react';

import { fontSizes, fontWeight } from '@/styles/tokens';

export const StyledFluidCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;
  padding: 24px;
  height: 100%;
  box-shadow:
    0 0 0 1px var(--button-border),
    0px 2px 24px 0px var(--shadow-default);

  &[data-variant="default"] {
    background: var(--ink-grey);
    gap: 32px;
  }

  &[data-variant="dark"] {
    background: var(--ink-black);
  }

  &[data-variant="highlighted"] {
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
  }
`;

export const StyledFluidCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  &[data-variant="highlighted"] {
    gap: 16px;
  }
`;

export const StyledFluidCardText = styled.div`
  & * {
    font-size: ${fontSizes.text.m};
    color: var(--text-dark-grey);
  }

  &[data-variant="highlighted"] {
    & * {
      color: var(--text-always-light-grey);
    }
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
