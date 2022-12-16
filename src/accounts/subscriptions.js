import * as _ from 'lodash';
import { observable } from 'mobx';

import { isSSR } from '../util';

const paddlePromise = !isSSR
    ? import('val-loader!./paddle').then((importResult) => {
        if (importResult?.Paddle?.Setup) {
            // Some recent Paddle versions seem to use AMD, so that we get
            // a promise for the module from the import itself?
            return importResult.Paddle;
        } else return new Promise((resolve) => {
            // In the past, we've always needed to load Paddle from a global:
            const checkForPaddle = () => {
                if (!!window.Paddle) {
                    resolve(window.Paddle);
                } else {
                    setTimeout(checkForPaddle, 500);
                }
            };

            checkForPaddle();
        });
    }).then((paddle) => {
        paddle.Setup({ vendor: PADDLE_VENDOR_ID, enableTracking: false });
        return paddle;
    })
    : new Promise(() => {}); // During SSR, Paddle never becomes available

const PADDLE_VENDOR_ID = 37222;

function formatPrice(currency, price) {
    return Number(price).toLocaleString(undefined, {
        style:"currency",
        currency: currency,
        minimumFractionDigits: _.round(price) === price ? 0 : 2,
        maximumFractionDigits: 2
    })
}

async function loadPlanPrices() {
    const response = await fetch(
        `https://accounts.httptoolkit.tech/api/get-prices?product_ids=${
            Object.values(SubscriptionPlans).map(plan => plan.id).join(',')
        }`
    );

    if (!response.ok) {
        console.log(response);
        throw new Error(`Failed to look up prices, got ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
        console.log(data);
        throw new Error("Price lookup request was unsuccessful");
    }

    const productPrices = data.response.products;

    productPrices.forEach((productPrice) => {
        const plan = _.find(SubscriptionPlans, { id: productPrice.product_id });
        if (!plan) return;

        const currency = productPrice.currency;
        const totalPrice = productPrice.price.net;
        const monthlyPrice = productPrice.subscription.interval === 'year'
            ? totalPrice / 12
            : totalPrice;

        plan.prices = {
            currency: currency,
            total: formatPrice(currency, totalPrice),
            monthly: formatPrice(currency, monthlyPrice)
        };
    });
}

export const SubscriptionPlans = observable({
    'pro-monthly': { id: 550380 },
    'pro-annual': { id: 550382 },
    'pro-perpetual': { id: 599788 },
    'team-monthly': { id: 550789 },
    'team-annual': { id: 550788 },
});

if (!isSSR) {
    // In the UI, we async load the plan prices onto the plan object
    // above, using the data from the Paddle API.
    // Prices are localized, so we can't do this during SSR.
    loadPlanPrices();
}

export const getSubscriptionPlanCode = (id) =>
    _.findKey(SubscriptionPlans, { id: id });

export const openCheckout = async (email, plan) => {
    const paddle = await paddlePromise;

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