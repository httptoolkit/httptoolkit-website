import * as React from 'react';

import { styled, media } from '../styles';

const VideoWindowBorder = styled.div`
    border-radius: 4px;
    background-color: rgba(0,0,0,0.2);
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);

    box-sizing: border-box;

    padding: 0 4px 4px 4px;

    ${media.desktop`
        padding-top: 29px;
    `}

    ${media.tablet`
        padding-top: 20px;
    `}

    ${media.mobile`
        padding-top: 12px;
    `}

    width: 1024px;
    max-width: 100%;

    position: relative;
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

const VideoWindowButtons = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 350 100"
})`
    position: absolute;
    top: 3px;
    left: 0px;

    fill: rgba(103, 113, 121, 0.6);

    ${media.desktop`
        height: 24px;
    `}

    ${media.tablet`
        height: 16px;
    `}

    ${media.mobile`
        height: 6px;
    `}
`;

export const AppWindow = (p) => <VideoWindowBorder>
    <VideoWindowButtons>
        <circle cx="75" cy="50" r="25"/>
        <circle cx="175" cy="50" r="25"/>
        <circle cx="275" cy="50" r="25"/>
    </VideoWindowButtons>

    { p.children }
</VideoWindowBorder>