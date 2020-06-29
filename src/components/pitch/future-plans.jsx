import React from 'react';

import { styled, media } from '../../styles';
import { LinkButton } from '../form';

const FutureContainer = styled.p`
    ${p => p.theme.fontSizeSubheading};
    font-style: italic;
    line-height: 1.3;

    ${media.desktop`
        margin: 0 auto 120px;
    `}

    ${media.mobileOrTablet`
        margin: 0 auto 60px;
        padding: 0 10px;
    `}

    text-align: center;
    max-width: 490px;
`;

export const FuturePlans = (p) => <FutureContainer>
    And there's more to come too!
    <br/><br/>
    Future plans include security analysis & metrics,
    session-wide performance graphs & analysis, HTTP
    client tooling, Docker integration & more...
    <br/><br/>
    Sound good? <LinkButton onClick={(e) => {
        e.preventDefault();
        p.onSignupUpdate();
    }}>
        Sign up for updates
    </LinkButton>,<br/>or download now below.
</FutureContainer>;