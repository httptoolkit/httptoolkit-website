import * as React from 'react';

import { styled, media } from '../styles';

const VideoWindowBorder = styled.div`
    border-radius: 4px 4px 9px 9px;
    background-color: #c8c8c8;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
    border: 1px solid #a8a8a8;

    box-sizing: border-box;

    padding: 0;

    ${media.desktop`
        padding-top: 24px;
        background: linear-gradient(to bottom, #dfdfdf, #cacaca 24px);
    `}

    ${media.tablet`
        padding-top: 16px;
        background: linear-gradient(to bottom, #dfdfdf, #cacaca 16px);
    `}

    ${media.mobile`
        padding-top: 12px;
        background: linear-gradient(to bottom, #dfdfdf, #cacaca 12px);
    `}

    > video {
        border-top: solid 1px #a8a8a8;
    }

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
        height: 18px;
    `}

    ${media.tablet`
        height: 10px;
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