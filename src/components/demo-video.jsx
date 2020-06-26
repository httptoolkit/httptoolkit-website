import React from 'react';

import { styled, media } from '../styles';
import { AppWindow } from './app-window';

const ShiftedAppWindow = styled(AppWindow)`
    margin-bottom: 60px;

    ${media.desktop`
        margin-top: -336px;
    `}

    ${media.mobileOrTablet`
        margin-top: -100px;
    `}

    ${media.tablet`
        margin-left: 30px;
        margin-right: 30px;
        max-width: calc(100% - 60px);
    `}

    ${media.mobile`
        margin-left: 10px;
        margin-right: 10px;
        max-width: calc(100% - 20px);
    `}
`;

const LiveDemoVideo = styled.video`
    display: block;
    background-color: #000;
    width: 100%;

    ${media.desktop`
        min-height: 541px;
        border-radius: 0 0 3px 3px;
    `}

    ${media.mobileOrTablet`
        min-height: 44vw;
    `}
`;

export const DemoVideo = (props) => {
    const videoName = props.name || "http-mock-demo";

    return <ShiftedAppWindow>
        <LiveDemoVideo controls autoPlay loop muted>
            <source src={`/${videoName}.mp4`} type="video/mp4" />
            <source src={`/${videoName}.webm`} type="video/webm" />
        </LiveDemoVideo>
    </ShiftedAppWindow>;
}