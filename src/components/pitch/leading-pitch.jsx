import React from 'react';

import { styled, media } from '../../styles';
import { HeroBlockContainer } from './hero-block-container';

export const TopHeroContainer = styled(HeroBlockContainer)`
    padding-top: 120px;
    padding-bottom: 336px;

    ${media.mobileOrTablet`
        padding-bottom: 100px;
    `}
`;

const OneClick = styled.div`
    font-weight: initial;
    font-style: italic;
    font-family: Courgette;
    text-align: center;
    margin-bottom: 30px;

    ${p => p.theme.popGradient}
`;

const ShiftDown = styled.span`
    position: relative;
    top: 10px;
    ${p => p.theme.popGradient}
`;

const PitchHeading = styled.h1`
    ${p => p.theme.fontSizeHeading};
    font-weight: bold;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    ${media.desktop`
        margin-bottom: 110px;
    `}

    ${media.mobileOrTablet`
        margin-bottom: 60px;
    `}

    > svg, > ${OneClick} {
        color: ${p => p.theme.popColor};
    }
`;

const PitchLine = styled.div`
    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

export const Pitch = (props) => <PitchHeading>
    <OneClick>
        With one click<ShiftDown>↴</ShiftDown>
    </OneClick>
    <PitchLine>
        Intercept & view all { props.target || 'your'} HTTP(S)
    </PitchLine>
    <PitchLine>
        Mock endpoints or entire servers
    </PitchLine>
    <PitchLine>
        Rewrite, redirect, or inject errors
    </PitchLine>
</PitchHeading>;