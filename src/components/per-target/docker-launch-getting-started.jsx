import * as React from 'react';
import {
    GettingStartedSteps
} from './getting-started';

export const DockerLaunchGettingStarted = () =>
    <GettingStartedSteps>
        <li>Open a terminal via HTTP Toolkit</li>
        <li>Run any command in that terminal to build or create a Docker container</li>
        <li>The build or container is automatically intercepted</li>
        <li>Instantly inspect, debug &amp; rewrite all your container's HTTP(S) traffic</li>
    </GettingStartedSteps>;