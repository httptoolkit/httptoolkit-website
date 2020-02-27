import React from 'react';

import { styled, media } from '../styles';
import { AppWindow } from './app-window';

const LiveDemoVideo = styled.video`
    background-color: #000;
    width: 100%;

    ${media.desktop`
        min-height: 541px;
        border-radius: 0 0 5px 5px;
    `}

    ${media.mobileOrTablet`
        min-height: 50vw;
    `}
`;

export const DemoVideo = () => <AppWindow>
    <LiveDemoVideo controls autoPlay loop muted>
        <source src="/http-mock-demo.mp4" type="video/mp4" />
        <source src="/http-mock-demo.webm" type="video/webm" />
    </LiveDemoVideo>
</AppWindow>