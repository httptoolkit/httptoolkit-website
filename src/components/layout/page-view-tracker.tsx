'use client';

import { useTheme } from 'next-themes';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { capturePageview } from '@/lib/analytics';

let lastUrl: string | undefined = undefined;

export default function PageViewTracker(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!pathname) return;

    const url = new URL(pathname, window.origin);
    url.search = searchParams.toString();

    // Drop dupes - e.g. from rerenders or similar
    if (url.href === lastUrl) return;
    else lastUrl = url.href;

    capturePageview(url, { theme: resolvedTheme });
  }, [pathname, searchParams, resolvedTheme]);

  return null;
}
