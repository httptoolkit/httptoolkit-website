import * as React from 'react';
import {
    GettingStartedSteps
} from './getting-started';

export const ElectronGettingStarted = () =>
    <GettingStartedSteps>
        <li>Open HTTP Toolkit</li>
        <li>Pick any Electron executable</li>
        <li>See, debug & rewrite all its HTTP(S) traffic</li>
    </GettingStartedSteps>;