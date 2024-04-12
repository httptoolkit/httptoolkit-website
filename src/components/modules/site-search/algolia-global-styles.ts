import { createGlobalStyle } from '@/styles';

export const AlgoliaGlobalStyles = createGlobalStyle`
:root {
  --docsearch-key-gradient: var(--dark-grey);
  --docsearch-key-shadow: none;
  --docsearch-searchbox-focus-background: var(--ink-black);
  --docsearch-highlight-color: var(--electric-blue);
}

html[data-theme='dark'] {
  --docsearch-searchbox-background: var(--medium-grey);
  --docsearch-searchbox-focus-background: transparent;
  --docsearch-searchbox-shadow: transparent;

  --docsearch-modal-background: var(--medium-grey);
  --docsearch-modal-shadow: 0 0 0 1px var(--button-border) inset, 0px 0px 24px 0px var(--shadow-inner-box) inset;

  --docsearch-highlight-color: var(--electric-blue);
  --docsearch-hit-background: var(--dark-grey);

  --docsearch-footer-background: var(--ink-black);
  --docsearch-key-gradient: var(--dark-grey);
  --docsearch-key-shadow: none;
}

@media (max-width: 768px) {
  .DocSearch-Container {
    width: 100%;
    position: fixed;
  }
}

.DocSearch-Logo svg *,
.DocSearch-Logo svg {
  fill: var(--text-dark-grey);
}

.DocSearch-LoadingIndicator svg,
.DocSearch-MagnifierLabel svg {
  width: 16px;
  height: 16px;
  color: var(--light-grey);
}

.DocSearch-Input {
  font-size: 1rem;
}

@media (min-width: 768px) {
  .DocSearch-Form {
    border-bottom: 1px solid var(--button-border);
    border-radius: 6px 6px 0 0;
  }

  .DocSearch-SearchBar {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .DocSearch-SearchBar {
    border-bottom: 1px solid var(--button-border);
    ;
  }
}

.DocSearch-Footer {
  border-radius: 0 0 6px 6px;
  box-shadow: none;
  background: transparent;
  border-top: 1px solid var(--button-border);
}
`;
