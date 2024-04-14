'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

import { useIsMobile } from '@/lib/hooks/use-is-mobile';

const Marquee = dynamic(() => import('react-fast-marquee').then(e => e.default), {
  ssr: false,
});

interface MarqueeWrapperProps {
  children: ReactNode;
}

export const MarqueeWrapper = ({ children }: MarqueeWrapperProps) => {
  const isMobile = useIsMobile();
  return <Marquee pauseOnHover={!isMobile}>{children}</Marquee>;
};
