'use client';

import { useTheme } from 'next-themes';
import { usePathname, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

let lastUrl: string | undefined = undefined;

export default function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!pathname) return;

    if (!posthog) return;

    let url = window.origin + pathname;
    if (searchParams.toString()) {
      url = url + `?${searchParams.toString()}`;
    }

    // This can trigger with re-renders etc - so we actively block
    // duplicate reports for the same URL.
    if (url === lastUrl) return;
    else lastUrl = url;

    posthog.capture('$pageview', {
      $current_url: url,
      theme: resolvedTheme
    });
  }, [pathname, searchParams, posthog, resolvedTheme]);

  return null;
}
