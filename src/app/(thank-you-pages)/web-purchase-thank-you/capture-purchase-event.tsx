'use client';

import { useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';

export const CapturePurchaseEvent = () => {
  const params = useSearchParams();
  const posthog = usePostHog();

  const sku = params.get('sku');
  const checkoutId = params.get('checkoutId');

  if (checkoutId) {
    posthog?.identify(checkoutId);
  }

  const [planName, planCycle] = sku?.split('-') ?? [];
  posthog?.capture('Plan purchased', { planName, planCycle, sku });

  return null;
};
