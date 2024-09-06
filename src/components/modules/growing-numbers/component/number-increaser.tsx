'use client';

import CountUp from 'react-countup';

import { useMounted } from '@/lib/hooks/use-mounted';

interface NumberIncreaserProps {
  maxValue: number;
  suffix?: string;
}

// t: current time, b: beginning value, c: change in value, d: duration
const linearEasing = (t: number, b: number, c: number, d: number): number =>
  c * t / d + b;

export const NumberIncreaser = ({ maxValue, suffix }: NumberIncreaserProps) => {
  const isMounted = useMounted();

  if (!isMounted) {
    return <>{maxValue}</>;
  }

  return <CountUp
    scrollSpyOnce
    scrollSpyDelay={250}
    enableScrollSpy
    duration={3}
    start={1}
    end={maxValue}
    suffix={suffix}
    easingFn={linearEasing}
  >
    {({ countUpRef }) => <span ref={countUpRef} />}
  </CountUp>
};
