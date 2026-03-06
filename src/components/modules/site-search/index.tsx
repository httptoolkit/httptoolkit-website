'use client';

import '@docsearch/css';
import '@/styles/algolia.css';
import dynamic from 'next/dynamic';
import { styled } from '@linaria/react';

import { Input } from '../input';

import { algoliaConfig } from '@/lib/constants/algolia';
import { screens, fontSizes, fontWeight } from '@/styles/tokens';

const DocSearch = dynamic(() => import('@docsearch/react').then(c => c.DocSearch), {
  loading: () => <Input style={{ minWidth: 295 }} type="search" placeholder="Search" id="search-placeholder" />,
});

const StyledAlgoliaSearchWrapper = styled.div`
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

export const SiteSearch = () => {
  const { appId, indexName, apiKey } = algoliaConfig;

  return (
    <StyledAlgoliaSearchWrapper>
      <DocSearch appId={appId} indexName={indexName} apiKey={apiKey} placeholder="Search" />
    </StyledAlgoliaSearchWrapper>
  );
};
