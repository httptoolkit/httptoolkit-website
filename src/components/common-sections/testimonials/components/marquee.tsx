'use client';

import dynamic from 'next/dynamic';
import { useState, type ReactNode } from 'react';

import { StyledTestimonialGrid } from '../testimonials.styles';

import { useIsMobile } from '@/lib/hooks/use-is-mobile';

const Marquee = dynamic(() => import('react-fast-marquee').then(e => e.default), {
  ssr: false,
});

interface MarqueeWrapperProps {
  children: ReactNode;
  columnsCount: number;
}

export const MarqueeWrapper = ({
  children,
  columnsCount
}: MarqueeWrapperProps) => {
  const isMobile = useIsMobile();
  const [isRunning, setIsRunning] = useState(true);

  const play = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  return (
    <Marquee pauseOnHover={!isMobile} play={isRunning}>
      <StyledTestimonialGrid
        $columnsCount={columnsCount}
        onTouchStart={pause}
        onTouchEnd={play}
      >
        {children}
      </StyledTestimonialGrid>
    </Marquee>
  );
};
