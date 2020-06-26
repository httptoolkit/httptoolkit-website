import * as React from 'react';

import { styled, media } from '../styles';

const VideoWindowBorder = styled.div`
    border-radius: 4px;
    background-color: #c8c8c8;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
    border: 1px solid #a8a8a8;

    box-sizing: border-box;

    ${media.desktopOrTablet`
        padding: 0 3px 3px 3px;
    `}

    ${media.mobile`
        padding: 0 2px 2px 2px;
    `}

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

export const AppWindow = styled((p) =>
    <VideoWindowBorder className={p.className}>
        <VideoWindowButtons>
            <circle cx="75" cy="50" r="25"/>
            <circle cx="175" cy="50" r="25"/>
            <circle cx="275" cy="50" r="25"/>
        </VideoWindowButtons>

        { p.children }
    </VideoWindowBorder>
)``;