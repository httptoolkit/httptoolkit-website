'use client';

import type { TableContentProps } from '../table-content.types';

import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';

const TextComponent = ({ children }: Component) => (
  <Text fontSize="m" fontWeight="bold" color="white">
    {children}
  </Text>
);

export const TableContentTriggerComponent = ({ text, href }: TableContentProps['links'][number]) => {
  if (href) {
    return (
      <Link href={href}>
        <TextComponent>{text}</TextComponent>
      </Link>
    );
  }

  return <TextComponent>{text}</TextComponent>;
};
