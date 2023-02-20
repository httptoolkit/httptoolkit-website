import * as _ from 'lodash';
import { flow, observable, computed } from 'mobx';

import { prefetchPage, isSSR } from '../util';

import {
    showLoginDialog,
    getLastUserData,
    getLatestUserData,
    loginEvents
} from '../accounts/auth';
import { getCheckoutUrl, openCheckout, SubscriptionPlans } from '../accounts/subscriptions';

export class AccountStore {
    constructor() {
        // Update account data automatically on login, logout & every 10 mins
        loginEvents.on('authenticated', async () => {
            await this.updateUser();
            loginEvents.emit('user_data_loaded');
        });
        loginEvents.on('logout', this.updateUser);
        if (!isSSR) setInterval(this.updateUser, 1000 * 60 * 10);
        this.updateUser();
    }

    getSKU = (tierCode, planCycle) => {
        return `${tierCode}-${planCycle}`;
    }

    @observable
    modal = null;

    @observable
    waitingForPurchase = false;

    @observable
    user = getLastUserData();

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
                    prefetchPage(getCheckoutUrl(initialEmailResult, sku));
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

        const isRiskyPayment = plan.prices?.currency === 'BRL' &&
            this.user?.email?.endsWith('@gmail.com'); // So far, all chargebacks have been from gmail accounts

        const newUser = !this.user?.subscription; // Even cancelled users will have an expired subscription left

        if (newUser && isRiskyPayment) {
            // This is annoying, I wish we didn't have to do this, but fraudulent BRL payments are now 80% of chargebacks,
            // and we need to tighten this up and block that somehow or payment platforms will eventually block
            // HTTP Toolkit globally. This error message is left intentionally vague to try and discourage fraudsters
            // from using a VPN to work around it. We do still allow this for existing customers, who are already
            // logged in - we're attempting to just block the creation of new accounts here.
            this.reportPlanPurchaseBlocked(tierCode, planCycle);

            alert(
                "Unfortunately, due to high levels of recent chargebacks & fraud, subscriptions for new accounts "+
                "will temporarily require manual validation & processing before setup.\n\n" +
                "Please email purchase@httptoolkit.com to begin this process."
            );

            return;
        }

        // This redirects the entire page to the checkout:
        return openCheckout(this.user.email, sku);
    }.bind(this));

    reportPlanSelected(planName, planCycle) {
        const sku = this.getSKU(planName, planCycle);

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'select',
                eventLabel: _.upperFirst(planName), // For historical reasons
            });
        }

        if (window.posthog) {
            posthog.capture('Select plan', { planName, planCycle, sku });
        }
    }

    reportPlanPurchaseBlocked(planName, planCycle) {
        const sku = this.getSKU(planName, planCycle);

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'purchase-blocked',
                eventLabel: _.upperFirst(planName), // For historical reasons
            });
        }

        if (window.posthog) {
            posthog.capture('Plan purchase blocked', { planName, planCycle, sku });
        }
    }
}