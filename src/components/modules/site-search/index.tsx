'use client';

import { DocSearch } from '@docsearch/react';

import '@docsearch/css';
import { AlgoliaGlobalStyles } from './algolia-global-styles';
import { StyledAlgoliaSearchWrapper } from './site-search.styles';

import { algoliaConfig } from '@/lib/constants/algolia';

export const SiteSearch = () => {
  const { appId, indexName, apiKey } = algoliaConfig;

  return (
    <StyledAlgoliaSearchWrapper>
      <DocSearch appId={appId} indexName={indexName} apiKey={apiKey} placeholder="Search" />
      <AlgoliaGlobalStyles />
    </StyledAlgoliaSearchWrapper>
  );
};
