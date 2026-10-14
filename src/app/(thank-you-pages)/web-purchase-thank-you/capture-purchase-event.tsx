'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { capture } from '@/lib/analytics';

export const CapturePurchaseEvent = () => {
  const params = useSearchParams();
  const sku = params.get('sku');

  useEffect(() => {
    const [planName, planCycle] = sku?.split('-') ?? [];
    capture('Plan purchased', { planName, planCycle, sku });
  }, [sku]);

  return null;
};
