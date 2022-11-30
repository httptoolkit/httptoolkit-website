import * as React from 'react';
import {
    GettingStartedSteps
} from './getting-started';

export const DockerAttachGettingStarted = () =>
    <GettingStartedSteps>
        <li>Launch a Docker container anywhere</li>
        <li>Click 'Attach to Docker' in HTTP Toolkit, and pick your container</li>
        <li>HTTP Toolkit recreates & restarts the container with interception injected</li>
        <li>Instantly inspect, debug &amp; rewrite all your container's HTTP(S) traffic</li>
    </GettingStartedSteps>;