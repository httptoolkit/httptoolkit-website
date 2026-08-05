'use client';

import dynamic from 'next/dynamic';
import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

const StyledSearchPlaceholder = styled.div`
  /* Mirrors the button box styles in ./search, so the swap doesn't shift anything. */
  height: 46px;
  border-radius: 6px;
  background-color: var(--dark-grey);
  box-shadow:
    0 0 0 1px var(--button-border),
    0px 2px 1px 0px rgba(24, 25, 28, 0.5) inset;

  width: 100%;

  @media (min-width: ${screens.md}) {
    min-width: 295px;
  }
`;

/**
 * DocSearch and its ~16KB stylesheet are code-split into one lazily loaded chunk, rather
 * than sitting in a render-blocking stylesheet on every docs page.
 *
 * Client-only: prerendering put the button in the HTML ahead of its stylesheet, leaving it
 * unstyled on screen for seconds. Nothing is lost by skipping it, since the widget needs
 * JS to do anything anyway.
 */
export const SiteSearch = dynamic(() => import('./search').then(m => m.Search), {
  ssr: false,
  loading: () => <StyledSearchPlaceholder id="search-placeholder" />,
});
