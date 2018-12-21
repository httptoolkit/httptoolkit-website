const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');

const releasePathMap = {
    'win-exe': 'v0.0.3/HTTP.Toolkit-0.0.3.Setup.exe',
    'win-standalone': 'v0.0.3/HTTP.Toolkit-win32-x64-0.0.3.zip',
    'linux-deb': 'v0.0.3/httptoolkit_0.0.3_amd64.deb',
    'linux-standalone': 'v0.0.3/HTTP.Toolkit-linux-x64-0.0.3.zip',
    'osx-dmg': 'v0.0.3/HTTP.Toolkit.dmg',
    'osx-standalone': 'v0.0.3/HTTP.Toolkit-darwin-x64-0.0.3.zip'
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