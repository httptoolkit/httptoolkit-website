import * as _ from 'lodash';
import { observable } from 'mobx';

import { isSSR } from '../util';

if (!isSSR) import('val-loader!./paddle');

const PADDLE_VENDOR_ID = 37222;

const waitForPaddle = new Promise((resolve) => {
    if (isSSR) return;

    const checkForPaddle = () => {
        if (!!window.Paddle) {
            window.Paddle.Setup({ vendor: PADDLE_VENDOR_ID, enableTracking: false });
            resolve(window.Paddle);
        } else {
            setTimeout(checkForPaddle, 500);
        }
    };

    checkForPaddle();
});

function getPlanPrices(planId) {
    return waitForPaddle.then((paddle) =>
        new Promise((resolve) => {
            paddle.Product.Prices(planId, 1, resolve);
        })
    );
}

export const SubscriptionPlans = observable({
    'pro-monthly': { id: 550380 },
    'pro-annual': { id: 550382 },
    'team-monthly': { id: 550789 },
    'team-annual': { id: 550788 },
});

_.map(SubscriptionPlans, (PlanDetails) => {
    getPlanPrices(PlanDetails.id).then((planPricing) => {
        const planPrice = planPricing.price.net.replace(/[.,]00$/g, '');
        const monthlyPrice = planPricing.recurring.subscription.type === 'year' ?
            planPrice.replace(/[\d.,]+/g, (d) => _.round((parseFloat(d) / 12), 2).toString()) : planPrice;

        PlanDetails.prices = { total: planPrice, monthly: monthlyPrice };
    });
});

export const getSubscriptionPlanCode = (id) =>
    _.findKey(SubscriptionPlans, { id: id });

export const openCheckout = async (email, plan) => {
    const paddle = await waitForPaddle;

    return new Promise((resolve) => {
        paddle.Checkout.open({
            product: plan.id,
            email: email,
            disableLogout: true,
            allowQuantity: false,
            successCallback: () => resolve(true),
            closeCallback: () => resolve(false)
        });
    });
}