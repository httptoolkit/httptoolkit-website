import NextLink from 'next/link';

import type { AnchorProps, LinkProps, NextLinkType } from './link.types';

import { isAnchor, isExternalUrl, isUtilityLink } from '@/lib/utils';

export const Link = ({ href, children, ...rest }: Component<LinkProps>) => {
  const anchorProps = rest as AnchorProps;
  if (isExternalUrl(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...anchorProps}>
        {children}
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
      <a target="_self" {...anchorProps}>
        {children}
      </a>
    );
  }

  const nextLinkProps = rest as NextLinkType;
  return (
    <NextLink href={href} {...nextLinkProps}>
      {children}
    </NextLink>
  );
};
