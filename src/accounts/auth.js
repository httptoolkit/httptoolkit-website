import * as _ from 'lodash';
import { Mutex } from 'async-mutex';
import { EventEmitter } from 'events';

import * as jwt from 'jsonwebtoken';
import { Auth0LockPasswordless } from '@httptoolkit/auth0-lock';

import { theme } from '../styles';
import { getSubscriptionPlanCode } from './subscriptions';

const AUTH0_CLIENT_ID = 'KAJyF1Pq9nfBrv5l3LHjT9CrSQIleujj';
const AUTH0_DOMAIN = 'login.httptoolkit.tech';

// We read data from auth0 (via a netlify function), which includes
// the users subscription data, signed into a JWT that we can
// validate using this public key.
const AUTH0_DATA_PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzRLZvRoiWBQS8Fdqqh/h
xVDI+ogFZ2LdIiMOQmkq2coYNvBXGX016Uw9KNlweUlCXUaQZkDuQBmwxcs80PEn
IliLvJnOcIA9bAJFEF36uIwSI/ZRj0faExanLO78cdIx+B+p69kFGlohQGzJmS1S
v/IYYu032hO+F5ypR+AoXn6qtGGLVN0zAvsvLEF3urY5jHiVbgk2FWD3FWMU3oBF
jEEjeSlAFnwJZgeEMFeYni7W/rQ8seU8y3YMIg2UyHpeVNnuWbJFFwGq8Aumg4SC
mCVpul3MYubdv034/ipGZSKJTwgubiHocrSBdeImNe3xdxOw/Mo04r0kcZBg2l/b
7QIDAQAB
-----END PUBLIC KEY-----
`;

const isSSR = typeof window === 'undefined';

const auth0Lock = isSSR ? {} : new Auth0LockPasswordless(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    configurationBaseUrl: 'https://cdn.eu.auth0.com',

    // Passwordless - email a code, confirm the code
    allowedConnections: ['email'],
    passwordlessMethod: 'code',

    auth: {
        // Entirely within the page please
        redirect: false,
        redirectUrl: `${window.location.protocol}//${window.location.host}`,
        responseType: 'token id_token'
    },

    // UI config
    autofocus: true,
    allowAutocomplete: true,
    theme: {
        primaryColor: theme.popColor,
        logo: 'https://httptoolkit.tech/icon-600.png'
    },
    languageDictionary: {
        title: 'Log in / Sign up'
    }
});

export const loginEvents = new EventEmitter();

// Forward auth0 events to the emitter
if (!isSSR){
    [
        'authenticated',
        'unrecoverable_error',
        'authorization_error',
        'hide'
    ].forEach((event) =>
        auth0Lock.on(event, (data) => loginEvents.emit(event, data))
    );
}

// Manually hide _after_ user logs in (no autohide) to ensure that
// the events trigger in an order that makes showLoginDialog happen.
loginEvents.on('user_data_loaded', () => auth0Lock.hide());

export const showLoginDialog = () => {
    auth0Lock.show();

    // Login is always followed by either:
    // hide - user cancels login
    // authenticated - user logs in
    // authorization_error - something (login or data loading) goes wrong.
    return new Promise((resolve, reject) => {
        loginEvents.once('user_data_loaded', () => resolve(true));
        loginEvents.once('hide', () => resolve(false));

        loginEvents.once('unrecoverable_error', reject);
        loginEvents.once('authorization_error', reject);
    });
};

export const logOut = () => {
    loginEvents.emit('logout');
};

let tokens = isSSR ? {} : JSON.parse(localStorage.getItem('tokens'));

const tokenMutex = new Mutex();

// Must be run inside a tokenMutex
function setTokens(newTokens) {
    tokens = newTokens;
    localStorage.setItem('tokens', JSON.stringify(newTokens));
}

function updateTokensAfterAuth({ accessToken, expiresIn }) {
    return tokenMutex.runExclusive(() =>
        setTokens({
            accessToken,
            accessTokenExpiry: Date.now() + (expiresIn * 1000)
        })
    )
}

loginEvents.on('authenticated', updateTokensAfterAuth);
loginEvents.on('logout', () => tokenMutex.runExclusive(() => setTokens(null)));

// Must be run inside a tokenMutex
async function refreshSession() {
    if (!tokens) throw new Error("Can't check session if we're not logged in");

    return new Promise((resolve, reject) => {
        auth0Lock.checkSession({}, (error, authResult) => {
            if (error) reject(error);
            else {
                resolve(authResult.accessToken);
                updateTokensAfterAuth(authResult);
            }
        })
    });
}

function getToken() {
    return tokenMutex.runExclusive(() => {
        if (!tokens) return;

        const timeUntilExpiry = tokens.accessTokenExpiry.valueOf() - Date.now();

        // If the token is expired or close (10 mins), refresh it
        let refreshPromise = timeUntilExpiry < 1000 * 60 * 10 ?
            refreshSession() : null;

        if (timeUntilExpiry > 1000 * 5) {
            // If the token is good for now, use it, even if we've
            // also triggered a refresh in the background
            return tokens.accessToken;
        } else {
            // If the token isn't usable, wait for the refresh
            return refreshPromise;
        }
    });
};

/*
 * Synchronously gets the last received user data, _without_
 * refreshing it in any way. Used for the initial load, whilst
 * we refresh in the background.
 */
export function getLastUserData() {
    if (isSSR) return {};

    try {
        return parseUserData(localStorage.getItem('last_jwt'));
    } catch (e) {
        console.warn("Couldn't parse saved user data", e);
        return {};
    }
}

/*
 * Get the latest valid user data we can. If possible, it loads the
 * latest data from the server. If that fails to load, or if it loads
 * but fails to parse, we return the latest user data.
 *
 * If there are no tokens available, or the latest data is expired,
 * this returns an empty (logged out) user.
 */
export async function getLatestUserData() {
    const lastUserData = getLastUserData();

    try {
        const userJwt = await requestUserData();
        const userData = parseUserData(userJwt);
        localStorage.setItem('last_jwt', userJwt);
        return userData;
    } catch (e) {
        loginEvents.emit('authorization_error', e);
        return lastUserData;
    }
}

function parseUserData(userJwt) {
    if (!userJwt) return {};

    const appData = jwt.verify(userJwt, AUTH0_DATA_PUBLIC_KEY, {
        algorithms: ['RS256'],
        audience: 'https://httptoolkit.tech/app_data',
        issuer: 'https://httptoolkit.tech/'
    });

    const subscription = {
        id: appData.subscription_id,
        status: appData.subscription_status,
        plan: getSubscriptionPlanCode(appData.subscription_plan_id),
        expiry: new Date(appData.subscription_expiry)
    };

    return {
        email: appData.email,
        // Use undefined rather than {} when there's no subscription data.
        subscription: _.some(subscription) ? subscription : undefined
    };
}

async function requestUserData() {
    const token = await getToken();
    if (!token) return '';

    const appDataResponse = await fetch('https://accounts.httptoolkit.tech/.netlify/functions/get-app-data', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return appDataResponse.text();
}