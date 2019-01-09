const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');

const LATEST_VERSION = '0.1.1';

const releasePathMap = {
    'win-exe': `v${LATEST_VERSION}/HTTP.Toolkit-${LATEST_VERSION}.Setup.exe`,
    'win-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-win32-x64-${LATEST_VERSION}.zip`,
    'linux-deb': `v${LATEST_VERSION}/httptoolkit_${LATEST_VERSION}_amd64.deb`,
    'linux-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-linux-x64-${LATEST_VERSION}.zip`,
    'osx-dmg': `v${LATEST_VERSION}/HTTP.Toolkit.dmg`,
    'osx-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-darwin-x64-${LATEST_VERSION}.zip`
}

exports.createPages = ({ boundActionCreators }) => {
    const { createPage } = boundActionCreators;

    const viewThankYou = path.resolve('./src/templates/view-thank-you.jsx');

    _.forEach(releasePathMap, (releasePath, downloadId) => {
        createPage({
            path: `/view/thank-you/${downloadId}`,
            component: viewThankYou,
            context: { releasePath }
        });
    });
}

exports.onPostBootstrap = function (pages) {
    return fs.copy('./node_modules/monaco-editor/min/vs', './public/vs');
};