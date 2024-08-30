import type { LinkProps as NextLinkProps } from 'next/link';
import type { AnchorHTMLAttributes, AriaAttributes } from 'react';

export type NextLinkType = Omit<NextLinkProps, 'href'>;

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & AriaAttributes;

export type LinkProps = {
  href: string;
} & (NextLinkType | AnchorProps);
