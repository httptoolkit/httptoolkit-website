import {
  showLoginDialog,
  getLastUserData,
  getLatestUserData,
  loginEvents,
  goToCheckout,
  prefetchCheckout,
  initializeAuthUi,
} from '@httptoolkit/accounts';
import { get } from 'lodash-es';
import { flow, observable, computed, makeObservable } from 'mobx';

import { isSSR } from '../utils';

export class AccountStore {
  constructor() {
    makeObservable(this, {
      subscriptionPlans: observable,
      modal: observable,
      waitingForPurchase: observable,
      user: observable,
      isLoggedIn: computed,
      isPaidUser: computed,
      subscription: computed,
    });

    if (!isSSR) {
      initializeAuthUi({
        refreshToken: false,
      });

      // The pricing lookup promise is always triggered at first load, within layout.tsx.
      window.pricingPromise?.then(prices => {
        this.subscriptionPlans = prices;
      });
    }

    // Update account data automatically on login, logout & every 10 mins
    loginEvents.on('authenticated', async () => {
      await this.updateUser();
      loginEvents.emit('user_data_loaded');
    });

    if (!isSSR) {
      this.updateUser();
      setInterval(this.updateUser, 1000 * 60 * 10);
    }
    loginEvents.on('logout', this.updateUser);
  }

  subscriptionPlans = null; // Set once the price loading has completed

  modal = null;

  waitingForPurchase = false;

  user = !isSSR ? getLastUserData() : {};

  getSKU = (tierCode, planCycle) => {
    return `${tierCode}-${planCycle}`;
  };

  updateUser = flow(
    function* () {
      this.user = yield getLatestUserData();
    }.bind(this),
  );

  get isLoggedIn() {
    return !!this.user.email;
  }

  get isPaidUser() {
    // Set with the last known active subscription details
    const subscriptionExpiry = get(this, 'user.subscription.expiry');

    return !!subscriptionExpiry && subscriptionExpiry.valueOf() > Date.now();
  }

  get subscription() {
    if (!this.isPaidUser) return {};

    const [paidTier, paidCycle] = this.user.subscription.plan.split('-');
    const status = this.user.subscription.status;

    return { paidTier, paidCycle, status };
  }

  login = flow(function* () {
    if (!this.isLoggedIn) {
      this.modal = 'login';
      yield showLoginDialog();
      this.modal = null;
    }
  }).bind(this);

  buyPlan = flow(
    function* (tierCode, planCycle, posthog) {
      this.reportPurchaseEvent('Select plan', tierCode, planCycle, posthog);
      const sku = this.getSKU(tierCode, planCycle);

      let loggingIn = true;
      if (!this.isLoggedIn) {
        this.modal = 'login';

        // Update account data automatically on login, logout & every 10 mins
        loginEvents.once('authenticated', async authResult => {
          // If a user logs in after picking a plan, they're going to go to the
          // checkout imminently. The API has to query Paddle to build that checkout,
          // so we start prefetching the redirect early, to kick that process off ASAP:
          const initialEmailResult = authResult?.idTokenPayload?.email;
          if (initialEmailResult && loggingIn) {
            // Check loggingIn to skip if cancelled
            // Start preparing to redirect immediately, without waiting for user_data_loaded.
            prefetchCheckout(initialEmailResult, sku, 'web');
          }
        });

        this.reportPurchaseEvent('Login started', tierCode, planCycle, posthog);
        yield showLoginDialog();
        if (this.isLoggedIn) {
          this.reportPurchaseEvent('Login completed', tierCode, planCycle, posthog);
        } else {
          this.reportPurchaseEvent('Login cancelled', tierCode, planCycle, posthog);
        }
      } else {
        this.reportPurchaseEvent('Already logged in', tierCode, planCycle, posthog);
      }

      loggingIn = false;

      if (!this.isLoggedIn || this.isPaidUser) {
        // Login cancelled or failed, or they have a plan already
        this.modal = null;
        return;
      }

      if (this.user?.banned) {
        alert('Your account has been blocked for abuse. Please contact help@httptoolkit.com.');
        return;
      }

      this.reportPurchaseEvent('Checkout started', tierCode, planCycle, posthog);

      // This redirects the entire page to the checkout:
      return goToCheckout(this.user.email, sku, 'web');
    }.bind(this),
  );

  reportPurchaseEvent(name, planName, planCycle, posthog) {
    const sku = this.getSKU(planName, planCycle);
    if (posthog) {
      posthog.capture(name, { planName, planCycle, sku });
    }
  }
}
