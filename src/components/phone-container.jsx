import * as React from 'react';

import { styled, media } from '../styles';

const PhoneOutline = styled.div`
    background-color: #c8c8c8;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
    border: 1px solid #a8a8a8;

    box-sizing: border-box;
    position: relative;

    ${media.desktop`
        border-radius: 24px;
        padding: 40px 6px;
    `}

    ${media.tablet`
        border-radius: 18px;
        padding: 28px 4px;
    `}

    ${media.mobile`
        border-radius: 10px;
        padding: 18px 2px;
    `}
`;

const PhoneScreen = styled.div`
    background-color: #000;
`;

const HomeButton = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;

    background-color: #a8a8a8;

    ${media.desktop`
        bottom: 8px;
        height: 26px;
        border-radius: 12px;
    `}

    ${media.tablet`
        bottom: 6px;
        height: 16px;
        border-radius: 8px;
    `}

    ${media.mobile`
        bottom: 3px;
        height: 12px;
        border-radius: 4px;
    `}
`;

export const PhoneContainer = styled((p) =>
    <PhoneOutline className={p.className}>
        <PhoneScreen>
            { p.children }
        </PhoneScreen>
        <HomeButton />
    </PhoneOutline>
)``;