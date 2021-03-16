import * as React from 'react';
import {
    GettingStartedSteps
} from './getting-started';

export const JavaAttachGettingStarted = () =>
    <GettingStartedSteps>
        <li>Launch any local JVM process as normal</li>
        <li>Click 'Attach to JVM' in HTTP Toolkit, and pick your process</li>
        <li>Instantly view, debug &amp; rewrite all JVM HTTP(S) traffic</li>
    </GettingStartedSteps>;