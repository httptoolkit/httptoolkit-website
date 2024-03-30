'use client';

import { loadPlanPricesUntilSuccess } from '@httptoolkit/accounts';
// import { useEffect, useState } from 'react';

import { isSSR } from '@/lib/utils';

export const LoadPricing = () => {
  if (!isSSR) {
    (window as any).pricingPromise = loadPlanPricesUntilSuccess();
  }

  return null;
};
