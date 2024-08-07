const { posthog } = require('posthog-js');

const POSTHOG_KEY = process.env.GATSBY_POSTHOG_KEY;

if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
        api_host: 'https://events.httptoolkit.tech',

        autocapture: false, // We don't need events here - just page views is fine.
        persistence: "memory", // No cookies/local storage please

        advanced_disable_decide: true, // We don't need dynamic features, skip checking
        disable_session_recording: false, // Disabled server-side, but disable explicitly here too
    });

    // Make this global, so we can track events elsewhere
    window.posthog = posthog;
}

let lastUrl = location.href;

exports.onRouteUpdate = () => {
    if (POSTHOG_KEY && location.href !== lastUrl) {
        posthog.capture('$pageview');
        lastUrl = location.href;
    }
};