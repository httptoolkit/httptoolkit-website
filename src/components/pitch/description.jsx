import React from 'react';

import { styled, media } from '../../styles';

const Highlight = styled.span`
    color: ${p => p.theme.popColor};
    font-weight: bold;
`;

const DescriptionContainer = styled.p`
    ${p => p.theme.fontSizeNearlyHeading};
    line-height: 1.3;
    margin: 0 auto 60px;

    ${media.mobileOrTablet`
        padding: 0 10px;
    `}

    text-align: center;
    max-width: 700px;
`;

export const Description = () => <DescriptionContainer>
    <Highlight>HTTP Toolkit</Highlight> is a suite of beautiful & <a
        href="https://github.com/httptoolkit"
        target="_blank"
        rel='noopener noreferrer'
    >open-source</a> tools for debugging, testing and building with HTTP(S),
    on Windows, Linux & Mac.
</DescriptionContainer>;