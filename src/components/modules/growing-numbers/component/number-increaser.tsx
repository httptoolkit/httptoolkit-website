'use client';

import CountUp from 'react-countup';

import { useMounted } from '@/lib/hooks/use-mounted';

interface NumberIncreaserProps {
  maxValue: number;
  suffix?: string;
}

export const NumberIncreaser = ({ maxValue, suffix }: NumberIncreaserProps) => {
  const isMounted = useMounted();

  if (!isMounted) {
    return <>{maxValue}</>;
  }

  return (
    <>
      {!suffix && maxValue < 10 && '0'}
      <CountUp scrollSpyOnce scrollSpyDelay={500} enableScrollSpy duration={4} end={maxValue} suffix={suffix} />
    </>
  );
};
