import * as _ from 'lodash';
import { observable } from 'mobx';

import { isSSR } from '../util';

export const ACCOUNTS_API = process.env.GATSBY_ACCOUNTS_API ??
    `https://accounts.httptoolkit.tech/api`;

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
        `${ACCOUNTS_API}/get-prices?product_ids=${
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

export const getSKU = (paddleId) =>
    _.findKey(SubscriptionPlans, { id: paddleId });

export const openCheckout = (email, sku) => {
    // Jump to the checkout page:
    window.location =
        `${ACCOUNTS_API}/redirect-to-checkout?email=${
            encodeURIComponent(email)
        }&sku=${
            sku
        }&source=httptoolkit.com`;
}