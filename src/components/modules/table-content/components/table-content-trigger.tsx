'use client';

import type { TableContentProps } from '../table-content.types';

import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';

const TextComponent = ({ children, ...props }: Component) => (
  <Text fontSize="m" fontWeight="bold" color="white" {...props}>
    {children}
  </Text>
);

export const TableContentTriggerComponent = ({ text, href, ...props }: TableContentProps['links'][number]) => {
  if (href) {
    return (
      <Link href={href} {...props}>
        <TextComponent>{text}</TextComponent>
      </Link>
    );
  }

  return <TextComponent {...props}>{text}</TextComponent>;
};
