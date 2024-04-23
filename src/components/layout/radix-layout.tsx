'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

export const RadixProviders = ({ children }: { children: ReactNode }) => {
  return <Tooltip.Provider>{children}</Tooltip.Provider>;
};
