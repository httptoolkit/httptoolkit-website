import {
    getLastUserData,
    getLatestUserData,
    goToCheckout,
    loadPlanPricesUntilSuccess,
    SubscriptionPlans,
    TierCode,
    PricedSKU,
    User,
    logOut
} from '@httptoolkit/accounts';

import { PostHog } from 'posthog-js';
import {
    makeObservable,
    observable,
    computed,
    flow,
    action,
    when
} from 'mobx';

import { isSSR } from '../utils';

// Limited interval here - tighter type than the accounts module
export type Interval = "monthly" | "annual";

export class AccountStore {

    subscriptionPlans: SubscriptionPlans | null = null;
    loginModalVisible: boolean = false;
    user: User = !isSSR
        ? getLastUserData()
        : { featureFlags: [], banned: false };

    constructor() {
        makeObservable(this, {
            subscriptionPlans: observable,
            loginModalVisible: observable,
            user: observable,
            isLoggedIn: computed,
            isPaidUser: computed,
            subscription: computed
        });

        if (!isSSR) {
            loadPlanPricesUntilSuccess()
                .then(action((prices: SubscriptionPlans) => {
                    this.subscriptionPlans = prices;
                }));
        }

        if (!isSSR) {
            this.updateUser();
            setInterval(this.updateUser, 1000 * 60 * 10);
        }
    }

    getPlanMonthlyPrice(tierCode: TierCode, planCycle: Interval): string | null {
        if (!this.subscriptionPlans) return null;

        const sku = this.getSKU(tierCode, planCycle);
        return (
            this.subscriptionPlans[sku]?.prices as { monthly: string }
        ).monthly ?? null;
    }

    calculateMaxAnnualSaving(): number | null {
        if (!this.subscriptionPlans) return null;

        const discounts = (['pro', 'team'] as const).map((tierCode) => {
            const monthlySku = this.getSKU(tierCode, 'monthly');
            const annualSku = this.getSKU(tierCode, 'annual');

            if (
                !this.subscriptionPlans ||
                !this.subscriptionPlans[monthlySku] ||
                !this.subscriptionPlans[annualSku]
            ) return NaN;

            const monthlyTotal = (
                this.subscriptionPlans[monthlySku].prices as { rawTotal: number }
            ).rawTotal;
            const annualTotal = (
                this.subscriptionPlans[annualSku].prices as { rawTotal: number }
            ).rawTotal;
            const annualPerMonth = annualTotal / 12;

            return 1 - (annualPerMonth / monthlyTotal);
        }).filter(d => !isNaN(d));

        if (discounts.length === 0) return null;
        return Math.round(Math.max(...discounts));
    }

    getSKU = (tierCode: TierCode, planCycle: Interval): PricedSKU => {
        return `${tierCode}-${planCycle}` as PricedSKU;
    };

    updateUser = flow(function* (this: AccountStore) {
        this.user = yield getLatestUserData();
    }.bind(this));

    get isLoggedIn(): boolean {
        return !!this.user.email;
    }

    get isPaidUser(): boolean {
        const subscriptionExpiry = this.user.subscription?.expiry;
        return !!subscriptionExpiry &&
            subscriptionExpiry.valueOf() > Date.now();
    }

    get subscription(): { paidTier?: TierCode; paidCycle?: Interval; status?: string } {
        if (!this.isPaidUser) return {};

        const [paidTier, paidCycle] = this.user.subscription!.plan.split('-') as [TierCode, Interval];
        const status = this.user.subscription!.status;

        return { paidTier, paidCycle, status };
    }

    login = flow(function* (this: AccountStore) {
        if (!this.isLoggedIn) {
            this.loginModalVisible = true;
            yield when(() => this.loginModalVisible === false);
        }
    }).bind(this);

    endLogin = flow(function* (this: AccountStore) {
        this.loginModalVisible = false;
    }).bind(this);

    finalizeLogin = flow(function* (this: AccountStore) {
        yield this.updateUser();
        this.loginModalVisible = false;
    }).bind(this);

    logOut = flow(function* (this: AccountStore) {
        if (this.isLoggedIn) {
            yield logOut();
            yield this.updateUser();
        }
    }).bind(this);

    buyPlan = flow(
        function* (this: AccountStore, tierCode: TierCode, planCycle: Interval, posthog?: PostHog) {
            this.reportPurchaseEvent('Select plan', tierCode, planCycle, posthog);
            const sku = this.getSKU(tierCode, planCycle);

            if (!this.isLoggedIn) {
                this.reportPurchaseEvent('Login started', tierCode, planCycle, posthog);
                yield this.login();
                if (this.isLoggedIn) {
                    this.reportPurchaseEvent('Login completed', tierCode, planCycle, posthog);
                } else {
                    this.reportPurchaseEvent('Login cancelled', tierCode, planCycle, posthog);
                }
            } else {
                this.reportPurchaseEvent('Already logged in', tierCode, planCycle, posthog);
            }

            if (!this.isLoggedIn || this.isPaidUser) {
                return;
            }

            if (this.user?.banned) {
                alert('Your account has been blocked for abuse. Please contact help@httptoolkit.com.');
                return;
            }

            this.reportPurchaseEvent('Checkout started', tierCode, planCycle, posthog);
            return goToCheckout(this.user.email!, sku, 'web');
        }.bind(this)
    );

    reportPurchaseEvent(name: string, planName: TierCode, planCycle: Interval, posthog?: PostHog): void {
        const sku = this.getSKU(planName, planCycle);
        if (posthog) {
            posthog.capture(name, { planName, planCycle, sku });
        }
    }
}

export const accountStore = new AccountStore();