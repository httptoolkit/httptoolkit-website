import * as _ from 'lodash';
import { flow, observable, computed } from 'mobx';

import { isSSR } from '../util';

import {
    showLoginDialog,
    getLastUserData,
    getLatestUserData,
    loginEvents,
    goToCheckout,
    SubscriptionPlans,
    prefetchCheckout,
    initializeAuthUi
} from '@httptoolkit/accounts';

export class AccountStore {
    constructor() {
        if (!isSSR) {
            initializeAuthUi({
                refreshToken: false
            });

            // The pricing lookup promise is always triggered at first load, within layout.tsx.
            window.pricingPromise.then((prices) => { this.subscriptionPlans = prices });
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

    getSKU = (tierCode, planCycle) => {
        return `${tierCode}-${planCycle}`;
    }

    @observable
    subscriptionPlans; // Set once the price loading has completed

    @observable
    modal = null;

    @observable
    waitingForPurchase = false;

    @observable
    user = !isSSR ? getLastUserData() : {};

    updateUser = flow(function * () {
        this.user = yield getLatestUserData();
    }.bind(this));

    @computed get isLoggedIn() {
        return !!this.user.email;
    }

    @computed get isPaidUser() {
        // Set with the last known active subscription details
        const subscriptionExpiry = _.get(this, 'user.subscription.expiry');

        return !!subscriptionExpiry && subscriptionExpiry.valueOf() > Date.now();
    }

    @computed get subscription() {
        if (!this.isPaidUser) return {};

        const [ paidTier, paidCycle ] = this.user.subscription.plan.split('-');
        const status = this.user.subscription.status;

        return { paidTier, paidCycle, status };
    }

    login = flow(function * () {
        if (!this.isLoggedIn) {
            this.modal = 'login';
            yield showLoginDialog();
            this.modal = null;
        }
    }).bind(this);

    buyPlan = flow(function * (tierCode, planCycle) {
        this.reportPlanSelected(tierCode, planCycle);
        const sku = this.getSKU(tierCode, planCycle);
        const plan = SubscriptionPlans[sku];

        let loggingIn = true;
        if (!this.isLoggedIn) {
            this.modal = 'login';

            // Update account data automatically on login, logout & every 10 mins
            loginEvents.once('authenticated', async (authResult) => {
                // If a user logs in after picking a plan, they're going to go to the
                // checkout imminently. The API has to query Paddle to build that checkout,
                // so we start prefetching the redirect early, to kick that process off ASAP:
                const initialEmailResult = authResult?.idTokenPayload?.email;
                if (initialEmailResult && loggingIn) { // Check loggingIn to skip if cancelled
                    // Start preparing to redirect immediately, without waiting for user_data_loaded.
                    prefetchCheckout(initialEmailResult, sku, 'web');
                }
            });

            yield showLoginDialog();
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

        // This redirects the entire page to the checkout:
        return goToCheckout(this.user.email, sku);
    }.bind(this));

    reportPlanSelected(planName, planCycle) {
        const sku = this.getSKU(planName, planCycle);

        if (window.posthog) {
            posthog.capture('Select plan', { planName, planCycle, sku });
        }
    }

    reportPlanPurchaseBlocked(planName, planCycle) {
        const sku = this.getSKU(planName, planCycle);

        if (window.posthog) {
            posthog.capture('Plan purchase blocked', { planName, planCycle, sku });
        }
    }
}