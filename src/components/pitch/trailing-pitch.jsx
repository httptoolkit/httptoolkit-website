import React from 'react';

import { styled, media } from '../../styles';

import { HeroBlockContainer } from './hero-block-container';
import { DownloadCTA, BuyProCTA } from '../cta';

const Or = styled.span`
    font-style: italic;
    font-family: 'Courgette', sans-serif;
    ${p => p.theme.fontSizeSubheading};
    padding: 20px 0;

    align-self: center;

    ${media.mobileOrTablet`
        display: none;
    `}
`;

const WidgetsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-evenly;

    ${media.desktop`
        width: 100%;
        margin-bottom: 110px;
    `}
    ${media.mobileOrTablet`
        min-width: 80%;
        margin-bottom: 60px;
    `}
`;

const CTAWidgets = (p) =>
    <WidgetsContainer>
        <DownloadCTA outsideContainer={p.outsideContainer} />
        <Or>or</Or>
        <BuyProCTA />
    </WidgetsContainer>;


const BottomHeroContainer = styled(HeroBlockContainer)`
    padding: 120px 0 60px;

    ${media.mobileOrTablet`
        padding-bottom: 0;
    `}
`;

const BottomHeroCTA = styled.h2`
    ${p => p.theme.fontSizeHeading};
    font-weight: bold;
    line-height: 1.3;
    margin-bottom: 18px;
`;

export const TrailingPitchBlock = () =>
    <BottomHeroContainer>
        <BottomHeroCTA>
            Try it for yourself
        </BottomHeroCTA>
        <CTAWidgets />
    </BottomHeroContainer>;
