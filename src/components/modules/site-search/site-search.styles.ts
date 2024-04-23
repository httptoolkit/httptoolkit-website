'use client';

import { screens, styled } from '@/styles';

export const StyledAlgoliaSearchWrapper = styled.div`
  --docsearch-text-color: ${({ theme }) => theme.colors.text.darkGrey};
  --docsearch-searchbox-focus-background: var(--ink-black);
  --docsearch-searchbox-shadow: inset 0 0 0 1px var(--electric-blue);

  & button {
    height: 46px;
    padding: 14px 14px;
    border: none;
    font-size: ${({ theme }) => theme.fontSizes.text.s};
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.mediumGrey};
    box-shadow:
      0 0 0 1px ${({ theme }) => theme.colors.button.border},
      0px 2px 1px 0px rgba(24, 25, 28, 0.5) inset;

    transition: all ease-in 500ms;

    @media (min-width: ${screens.md}) {
      min-width: 295px;
    }

    & .DocSearch-Button-Placeholder {
      color: ${({ theme }) => theme.colors.text.darkGrey};
      font-size: ${({ theme }) => theme.fontSizes.text.s};
      font-weight: ${({ theme }) => theme.fontWeight.normal};
    }

    & .DocSearch-Search-Icon {
      width: 16px;
    }

    & .DocSearch-Button-Key {
      padding: 0;
    }
  }
`;
