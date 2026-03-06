'use client';

import { styled } from '@linaria/react';

import useActiveToc from '../table-content/hooks/use-active-toc';

import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { screens, fontSizes, fontWeight } from '@/styles/tokens';

export interface NavigationSidebarLinkSubitem {
  text: string;
  href: string;
}

export interface NavigationSidebarLinkItem {
  text: string;
  href?: string;
  subItems?: NavigationSidebarLinkSubitem[];
}

export interface NavigationSidebarLinksProps {
  title: string;
  links: NavigationSidebarLinkItem[];
}

const StyledNavigationSidebarLinksWrapper = styled.div`
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

const StyledNavigationSidebarLinksTitle = styled.p`
  font-size: ${fontSizes.text.xs};
  font-weight: ${fontWeight.medium};
  color: var(--text-white);
  line-height: 1.5;
`;

const StyledNavigationSidebarLinksContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: calc(100vh - 80px);
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--light-grey) transparent;
  scrollbar-gutter: stable;
`;

const StyledNavigationSidebarLinksContentItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNavigationSidebarLinksContentTitle = styled(Text)`
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

const StyledNavigationSidebarLinksContentLink = styled(Link)`
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
`;

const ItemTitleComponent = ({ text, href }: NavigationSidebarLinkItem) => {
  if (href) {
    return <Link href={href}>{text}</Link>;
  }

  return text;
};

export const NavigationSidebarLinks = ({ title, links }: NavigationSidebarLinksProps) => {
  useActiveToc();
  return (
    <StyledNavigationSidebarLinksWrapper id="table-of-content-headings">
      <StyledNavigationSidebarLinksTitle>
        {title}
      </StyledNavigationSidebarLinksTitle>
      <StyledNavigationSidebarLinksContentWrapper data-match-scroll>
        <StyledNavigationSidebarLinksContentTitle fontSize="m" color="white">
          <ItemTitleComponent key="#intro" href="#intro" text="Introduction" />
        </StyledNavigationSidebarLinksContentTitle>

        {Array.isArray(links) &&
          links?.length > 0 &&
          links.map((link, index) => (
            <StyledNavigationSidebarLinksContentItem key={index}>
              <StyledNavigationSidebarLinksContentTitle fontSize="m" color="white">
                <ItemTitleComponent {...link} />
              </StyledNavigationSidebarLinksContentTitle>
              {Array.isArray(link.subItems) &&
                link.subItems?.length > 0 &&
                link.subItems.map(link => (
                  <StyledNavigationSidebarLinksContentLink key={link.href} href={link.href}>
                    {link.text}
                  </StyledNavigationSidebarLinksContentLink>
                ))}
            </StyledNavigationSidebarLinksContentItem>
          ))}
      </StyledNavigationSidebarLinksContentWrapper>
    </StyledNavigationSidebarLinksWrapper>
  );
};
