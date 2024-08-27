'use client';

import { screens, styled } from "@/styles";

export const PairContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    max-width: 100%;
    width: 100%;

    @media (min-width: ${screens['lg']}) {
        width: 1344px;
        height: 744px;
    }

    margin: 0 auto;
    padding: 0 10px;

    > .phone {
        width: 300px;
        max-width: min(20vw, 300px);
        transition: margin 0.5s, transform 0.5s;
    }

    > .hidden-phone {
        margin-right: calc(-1 * min(20vw, 300px));
        transform: scale(70%);
    }

    > .visible-phone {
        margin-right: -5px;
        display: block;
        @media (min-width: ${screens['xl']}) {
            margin-right: 30px;
        }
    }
`;