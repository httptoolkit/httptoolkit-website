'use client';

import type { ReactNode } from 'react';
import Marquee from 'react-fast-marquee';

import { useIsMobile } from '@/lib/hooks/use-is-mobile';

interface MarqueeWrapperProps {
  children: ReactNode;
}

export const MarqueeWrapper = ({ children }: MarqueeWrapperProps) => {
  const isMobile = useIsMobile();
  return <Marquee pauseOnHover={!isMobile}>{children}</Marquee>;
};
