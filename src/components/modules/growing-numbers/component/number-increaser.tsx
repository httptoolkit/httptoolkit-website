'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface NumberIncreaserProps {
  maxValue: number;
  suffix?: string;
}

const DURATION = 3000; // 3 seconds
const SCROLL_SPY_DELAY = 250; // ms

export const NumberIncreaser = ({ maxValue, suffix = '' }: NumberIncreaserProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.textContent = 1 + suffix;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // Linear easing from 1 to maxValue
      const value = Math.round(1 + (maxValue - 1) * progress);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [maxValue, suffix]);

  // Reset to 1 immediately on hydration, before the user scrolls to it
  useEffect(() => {
    const el = ref.current;
    if (el) el.textContent = 1 + suffix;
  }, [suffix]);

  useEffect(() => {
    if (hasAnimated) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          setHasAnimated(true);
          setTimeout(animate, SCROLL_SPY_DELAY);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, animate]);

  return <span ref={ref}>{maxValue}{suffix}</span>;
};
