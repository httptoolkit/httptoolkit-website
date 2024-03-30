'use client';

import { loadPlanPricesUntilSuccess } from '@httptoolkit/accounts';
import { useEffect } from 'react';

import { isSSR } from '@/lib/utils';

export const LoadPricing = () => {
  useEffect(() => {
    if (!isSSR) {
      (window as any).pricingPromise = loadPlanPricesUntilSuccess();
    }
  }, []);

  return null;
};
