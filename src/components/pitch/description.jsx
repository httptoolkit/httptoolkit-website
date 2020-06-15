import React from 'react';

import { styled, media } from '../../styles';
import { Nowrap } from '../nowrap';

const Highlight = styled.span`
    color: ${p => p.theme.popColor};
    font-weight: bold;
`;

const DescriptionContainer = styled.h2`
    ${p => p.theme.fontSizeNearlyHeading};
    line-height: 1.3;
    margin: 0 auto;

    ${media.mobileOrTablet`
        margin-bottom: 60px;

        br {
            display: inline;
            content: ' ';
            clear: none;

            &:before {
                content: ' ';
            }
        }
    `}

    ${media.tablet`
        padding: 0 20px;
    `}

    ${media.mobile`
        padding: 0 10px;
    `}

    ${media.desktop`
        margin-bottom: 120px;
    `}

    text-align: center;
    line-height: 1.5;
`;

export const Description = () => <DescriptionContainer>
    <Highlight>HTTP Toolkit</Highlight> is a beautiful & <Nowrap><a
        href="https://github.com/httptoolkit"
        target="_blank"
        rel='noopener noreferrer'
    >open-source</a></Nowrap> tool<br/>
    for debugging, testing and building with HTTP(S)<br/>
    on Windows, Linux & Mac.
</DescriptionContainer>;