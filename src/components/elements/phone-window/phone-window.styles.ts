'use client';

import { screens, styled } from '@/styles';

export const PhoneOutline = styled.div`
    background-color: var(--darkish-grey);
    background: linear-gradient(75deg, var(--dark-grey), var(--darkish-grey));

    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);
    border: 1px solid var(--darkish-grey);

    box-sizing: border-box;
    position: relative;

    max-width: 250px;

    --phone-border-radius: 10px;
    border-radius: var(--phone-border-radius);
    padding: 14px 0 18px;

    @media (min-width: ${screens['md']}) {
        --phone-border-radius: 18px;
        padding: 22px 0 28px;
    }
    @media (min-width: ${screens['lg']}) {
        --phone-border-radius: 24px;
        padding: 30px 0 40px;
    }

    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border: 1px solid var(--dark-grey);
        border-radius: var(--phone-border-radius);
    }
`;

export const PhoneScreen = styled.div<{
    $aspectRatio: string
}>`
    background-color: #000;

    border-width: 1px 0px;
    border-style: solid;
    border-color: var(--darkish-grey);

    line-height: 0;
    aspect-ratio: ${p => p.$aspectRatio};
`;

export const HomeButton = styled.div`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;

    background-color: var(--medium-grey);
    border: 1px solid var(--dark-grey);

    bottom: 3px;
    height: 12px;
    border-radius: 4px;

    @media (min-width: ${screens['md']}) {
        bottom: 6px;
        height: 16px;
        border-radius: 8px;
    }

    @media (min-width: ${screens['lg']}) {
        bottom: 8px;
        height: 26px;
        border-radius: 12px;
    }
`;