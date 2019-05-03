const fetch = require('node-fetch');

// This file is run at _build_ time, and the output becomes the import elsewhere.
// This effectively pulls the latest paddle JS and includes it in our bundle,
// every time the app is built.
module.exports = function () {
    return fetch('https://cdn.paddle.com/paddle/paddle.js')
    .then((paddleResponse) => paddleResponse.text())
    .then((paddleScript) => ({
        // We prepend logic to ensure everything is registered globally, because _half_ of
        // Paddle.js assumes that that's the case, and mobile viewport management breaks
        // if module or define are defined.
        code: `
            (function () {
                const define = undefined;
                const module = undefined;
                ${paddleScript}
            })();
        `
    }));
}