'use client';

import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { AnchorHTMLAttributes, AriaAttributes } from 'react';

import { usePageSettled } from '@/lib/hooks/use-page-settled';
import { isAnchor, isExternalUrl, isUtilityLink } from '@/lib/utils';

export type NextLinkType = Omit<NextLinkProps, 'href'>;

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & AriaAttributes;

export type LinkProps = {
  href: string;
} & (NextLinkType | AnchorProps);

export const Link = ({ href, children, ...rest }: Component<LinkProps>) => {
  // Hold prefetching back until the page itself has loaded, so it doesn't compete
  // with the hero for bandwidth. Callers can still opt in or out explicitly.
  const isPageSettled = usePageSettled();

  const anchorProps = rest as AnchorProps;
  if (isExternalUrl(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...anchorProps}>
        {children}
        <span className="visually-hidden">opens in a new tab</span>
      </a>
    );
  }

  if (isAnchor(href)) {
    return (
      <a href={href} target="_self" {...anchorProps}>
        {children}
      </a>
    );
  }

  if (isUtilityLink(href)) {
    return (
      <a target="_self" href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const nextLinkProps = rest as NextLinkType;
  return (
    <NextLink href={href} prefetch={isPageSettled ? undefined : false} {...nextLinkProps}>
      {children}
    </NextLink>
  );
};
