import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { styled, media, css } from '../styles';

import FullWidthSection from '../components/full-width-section';

const SplashContainer = FullWidthSection.extend`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const SplashHeader = styled.h1`
    ${p => p.theme.fontSizeUltraHeading}
    font-weight: bolder;

    margin: 60px 0;
`;

export default () => (<SplashContainer>
    <SplashHeader>
        Coming soon!
    </SplashHeader>
</SplashContainer>);