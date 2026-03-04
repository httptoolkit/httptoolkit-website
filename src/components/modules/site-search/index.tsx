'use client';

import '@docsearch/css';
import '@/styles/algolia.css';
import dynamic from 'next/dynamic';

import { StyledAlgoliaSearchWrapper } from './site-search.styles';
import { Input } from '../input';

import { algoliaConfig } from '@/lib/constants/algolia';

const DocSearch = dynamic(() => import('@docsearch/react').then(c => c.DocSearch), {
  loading: () => <Input style={{ minWidth: 295 }} $type="search" placeholder="Search" id="search-placeholder" />,
});

export const SiteSearch = () => {
  const { appId, indexName, apiKey } = algoliaConfig;

  return (
    <StyledAlgoliaSearchWrapper>
      <DocSearch appId={appId} indexName={indexName} apiKey={apiKey} placeholder="Search" />
    </StyledAlgoliaSearchWrapper>
  );
};
