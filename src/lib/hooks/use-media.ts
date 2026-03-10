import { useSyncExternalStore } from 'react';

export function useMedia(query: string, defaultState = false): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => defaultState,
  );
}
