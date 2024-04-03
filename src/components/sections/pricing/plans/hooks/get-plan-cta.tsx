'use client';

import { upperFirst } from 'lodash';
import { usePostHog } from 'posthog-js/react';
import { useCallback } from 'react';

import { StyledPricingCardCTAWrapper } from '../components/card/card.styles';

import { Button } from '@/components/elements/button';
import { PaperPlaneTilt, Sparkle, Spinner } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { DownloadButton } from '@/components/modules/download-button';
import type { AccountStore } from '@/lib/store/account-store';

export const usePlanCta = () => {
  const posthog = usePostHog();

  return useCallback((tierCode: string, account: AccountStore, waitingForPurchase: boolean, planCycle: string) => {
    const { paidTier, paidCycle } = account.subscription;

    if (waitingForPurchase) {
      return <Button icon={Spinner}></Button>;
    }

    if (tierCode === 'free') {
      return <DownloadButton />;
    }

    if (paidTier === tierCode) {
      if (paidCycle === planCycle) {
        return (
          <StyledPricingCardCTAWrapper>
            <DownloadButton />
            <Text fontSize="s" color="lightGrey">
              Download now and log in to access your {upperFirst(tierCode)} subscription
            </Text>
          </StyledPricingCardCTAWrapper>
        );
      }

      return (
        <StyledPricingCardCTAWrapper>
          <Button href="/contact/">Change to {planCycle}</Button>
          <Text fontSize="s" color="lightGrey">
            You already have this {paidCycle} plan.
          </Text>
        </StyledPricingCardCTAWrapper>
      );
    }

    if (tierCode === 'pro') {
      return (
        <Button icon={Sparkle} onClick={() => account.buyPlan('pro', planCycle, posthog)}>
          Buy Pro
        </Button>
      );
    }

    if (tierCode === 'team') {
      return (
        <Button
          $variant="secondary"
          href="/contact/"
          icon={PaperPlaneTilt}
          onClick={() => account.reportPurchaseEvent('Select team plan', tierCode, planCycle, posthog)}
        >
          Get in touch
        </Button>
      );
    }
  }, []);
};
