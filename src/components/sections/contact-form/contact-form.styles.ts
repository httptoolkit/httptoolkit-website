'use client';

import { styled, screens } from '@/styles';

export const StyledContactFormWrapper = styled.div`
  padding: 16px;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border),
    0 0 8px 0 var(--shadow-default),
    0 0 24px 0px rgba(128, 130, 137, 0.1) inset;
  border-radius: 16px;

  @media (min-width: ${screens['lg']}) {
    padding: 32px;
    max-width: 624px;
  }
`;