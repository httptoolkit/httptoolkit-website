import * as _ from 'lodash';
import { flow, observable, computed } from 'mobx';

import { delay, isSSR } from '../util';

import {
    showLoginDialog,
    getLastUserData,
    getLatestUserData,
    loginEvents
} from '../accounts/auth';
import { openCheckout, SubscriptionPlans } from '../accounts/subscriptions';

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

    getPlan = (tierCode, planCycle) => {
        return SubscriptionPlans[`${tierCode}-${planCycle}`];
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
        const plan = this.getPlan(tierCode, planCycle);

        if (!this.isLoggedIn) {
            this.modal = 'login';
            yield showLoginDialog();
        }

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

        this.modal = 'checkout';
        const purchased = yield openCheckout(this.user.email, plan);
        this.modal = null;

        if (!purchased) return;
        this.waitingForPurchase = tierCode;

        yield this.updateUser();
        while (!this.isPaidUser) {
            yield delay(1000);
            yield this.updateUser();
        }

        this.waitingForPurchase = false;
        this.reportPlanPurchased(tierCode, planCycle);
    }.bind(this));

    reportPlanSelected(planName, planCycle) {
        const sku = `${planName}-${planCycle}`;

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'select',
                eventLabel: _.upperFirst(planName), // For historical reasons
            });
        }

        if (window.posthog) {
            posthog.capture('Select plan', {
                planName,
                planCycle,
                sku
            });
        }
    }

    reportPlanPurchased(planName, planCycle) {
        const sku = `${planName}-${planCycle}`;

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'purchased',
                eventLabel: _.upperFirst(planName), // For historical reasons
            });
        }

        if (window.posthog) {
            posthog.capture('Plan purchased', {
                planName,
                planCycle,
                sku
            });
        }
    }

    reportPlanPurchaseBlocked(planName, planCycle) {
        const sku = `${planName}-${planCycle}`;

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'purchase-blocked',
                eventLabel: _.upperFirst(planName), // For historical reasons
            });
        }

        if (window.posthog) {
            posthog.capture('Plan purchase blocked', {
                planName,
                planCycle,
                sku
            });
        }
    }
}