import NextLink from 'next/link';

import type { AnchorProps, LinkProps, NextLinkType } from './link.types';

import { isExternalUrl } from '@/lib/utils';

export const Link = ({ href, children, ...rest }: Component<LinkProps>) => {
  if (isExternalUrl(href)) {
    const anchorProps = rest as AnchorProps;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...anchorProps}>
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
