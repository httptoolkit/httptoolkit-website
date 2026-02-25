'use client';

import { screens, styled, fontSizes, fontWeight } from '@/styles';

export const StyledAlgoliaSearchWrapper = styled.div`
  --docsearch-text-color: var(--text-dark-grey);
  --docsearch-searchbox-focus-background: var(--ink-black);
  --docsearch-searchbox-shadow: inset 0 0 0 1px var(--electric-blue);

  & button {
    height: 46px;
    padding: 14px 14px;
    border: none;
    font-size: ${fontSizes.text.s};
    border-radius: 6px;
    background-color: var(--dark-grey);
    box-shadow:
      0 0 0 1px var(--button-border),
      0px 2px 1px 0px rgba(24, 25, 28, 0.5) inset;

    transition: all ease-in 500ms;

    @media (min-width: ${screens.md}) {
      min-width: 295px;
    }

    & .DocSearch-Button-Placeholder {
      color: var(--text-dark-grey);
      font-size: ${fontSizes.text.s};
      font-weight: ${fontWeight.normal};
    }

    & .DocSearch-Search-Icon {
      width: 16px;
    }

    & .DocSearch-Button-Key {
      padding: 0;
    }
  }
`;