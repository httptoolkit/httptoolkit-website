'use client';

import { Heading } from '@/components/elements/heading';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { screens, styled, fontSizes } from '@/styles';

export const StyledNavigationSidebarLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0;

  position: sticky;
  top: 10px;
  align-self: self-start;

  @media (max-width: ${screens['xl']}) {
    display: none;
  }
`;

export const StyledNavigationSidebarLinksTitle = styled(Heading)``;

export const StyledNavigationSidebarLinksContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: calc(100vh - 80px);
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--light-grey) transparent;
  scrollbar-gutter: stable;
`;

export const StyledNavigationSidebarLinksContentItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledNavigationSidebarLinksContentTitle = styled(Text)`
  display: inline-block;
  padding: 8px 16px;

  & > a {
    transition: color ease-in 300ms;
    color: var(--text-white);

    &.active {
      color: var(--text-electric-light-blue);
      @media (min-width: ${screens.md}) {
        &:focus,
        &:active {
          color: var(--text-electric-light-blue);
        }

        @media (hover: hover) {
          &:hover {
            color: var(--text-electric-light-blue);
          }
        }
      }
    }

    @media (min-width: ${screens.md}) {
      &:focus,
      &:active {
        color: var(--text-dark-grey);
      }

      @media (hover: hover) {
        &:hover {
          color: var(--text-dark-grey);
        }
      }
    }
  }
`;

export const StyledNavigationSidebarLinksContentLink = styled(Link)`
  &&& {
    display: inline-block;
    font-size: ${fontSizes.text.m};
    line-height: 1.5;
    color: var(--text-light-grey);
    padding: 8px 32px;

    transition: color ease-in 300ms;

    &.active {
      color: var(--text-electric-light-blue);
      @media (min-width: ${screens.md}) {
        &:focus,
        &:active {
          color: var(--text-electric-light-blue);
        }

        @media (hover: hover) {
          &:hover {
            color: var(--text-electric-light-blue);
          }
        }
      }
    }

    @media (min-width: ${screens.md}) {
      &:focus {
        color: var(--text-dark-grey);
      }

      @media (hover: hover) {
        &:hover {
          color: var(--text-dark-grey);
        }
      }
    }
  }
`;