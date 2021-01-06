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
        this.reportPlanSelected(tierCode);
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
        this.reportPlanPurchased(tierCode);
    }.bind(this));

    reportPlanSelected(planName) {
        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'select',
                eventLabel: _.upperFirst(planName), // For historical reasons
            });
        }
    }

    reportPlanPurchased(planName) {
        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'purchased',
                eventLabel: _.upperFirst(planName), // For historical reasons
            });
        }
    }
}