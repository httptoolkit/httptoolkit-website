'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks whether the page has finished its own loading and gone idle.
 *
 * Used to hold back route prefetching. Prefetching a route pulls its RSC payload, its
 * CSS, and any images it preloads, and Next starts that as soon as a link is in the
 * viewport - which on a landing page means it competes with the hero media for
 * bandwidth. Deferring rather than disabling keeps navigations fast while keeping the
 * critical path clear.
 */

let hasSettled = false;
let isTimerStarted = false;
const waiting = new Set<() => void>();

const settle = () => {
  if (hasSettled) return;
  hasSettled = true;
  waiting.forEach(notify => notify());
  waiting.clear();
};

const startSettleTimer = () => {
  if (isTimerStarted || typeof window === 'undefined') return;
  isTimerStarted = true;

  const whenIdle = () => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(settle, { timeout: 3000 });
    } else {
      window.setTimeout(settle, 1000);
    }
  };

  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
};

export const usePageSettled = () => {
  const [isSettled, setIsSettled] = useState(hasSettled);

  useEffect(() => {
    if (hasSettled) {
      setIsSettled(true);
      return;
    }

    const notify = () => setIsSettled(true);
    waiting.add(notify);
    startSettleTimer();

    return () => {
      waiting.delete(notify);
    };
  }, []);

  return isSettled;
};
