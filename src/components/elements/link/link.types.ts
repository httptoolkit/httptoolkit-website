import type { LinkProps as NextLinkProps } from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

export type NextLinkType = Omit<NextLinkProps, 'href'>;

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export type LinkProps = {
  href: string;
} & (NextLinkType | AnchorProps);
