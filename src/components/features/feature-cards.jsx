import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { styled, media } from '../../styles';

const FeatureCardsBlock = styled.div`
    display: flex;
    justify-content: space-between;

    margin: 60px 0;

    ${media.mobile`
        margin-top: 60px;
        flex-direction: column;
    `}

    ${media.tablet`
        padding: 0 10px;
    `}

    ${media.desktopOrTablet`
        > :first-child {
            margin-left: 0;
        }

        > :last-child {
            margin-right: 0;
        }
    `}
`;

const FeaturesCard = styled.section`
    flex: 1;
    margin: 0 8px;

    ${media.mobile`
        :not(:last-child) {
            margin-bottom: 60px;
        }
    `}

    padding: 0;
    background-color: ${p => p.theme.popBackground};

    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);

    position: relative;

    > h3 {
        padding: 33px 30px 0;
        ${p => p.theme.fontSizeSubheading};
        color: ${p => p.theme.popColor};

        border-radius: 4px 4px 0 0;

        font-weight: bolder;
        text-transform: uppercase;
    }

    > svg {
        position: absolute;
        top: 21px;
        right: 21px;
        height: 48px;
        color: ${p => p.theme.containerBackground}
    }

    > p {
        ${p => p.theme.fontSizeText};
        line-height: 1.45;

        margin: 30px 30px;

        color: ${p => p.theme.mainColor};
    }
`;


export const FeatureCards = () => <FeatureCardsBlock>
    <FeaturesCard>
        <h3>Debug</h3>
        <FontAwesomeIcon icon={['fal', 'search']} size='3x' />
        <p>
            Effortlessly intercept & <strong>proxy any HTTP or HTTPS traffic</strong>
        </p>
        <p>
            <strong>Search, explore & inspect</strong> HTTP requests & responses
        </p>
        <p>
            <strong>One-click setup</strong> for Chrome, Node.js, Ruby, Python & more
        </p>
    </FeaturesCard>
    <FeaturesCard>
        <h3>Test</h3>
        <FontAwesomeIcon icon={['fal', 'stopwatch']} size='3x' />
        <p>
            <strong>Edit live requests & responses</strong>, to test your APIs & clients
        </p>
        <p>
            <strong>Simulate HTTP errors</strong>, timeouts & failed connections
        </p>
        <p>
            Validate request performance and <strong>debug caching & compression</strong>
        </p>
    </FeaturesCard>
    <FeaturesCard>
        <h3>Build</h3>
        <FontAwesomeIcon icon={['fal', 'wrench']} size='3x' />
        <p>
            Mock servers or endpoints for <strong>rapid API prototyping</strong>
        </p>
        <p>
            <strong>Export ready-to-use requests</strong> for curl, fetch
            &amp; 20 other tools
        </p>
        <p>
            Automate HTTP using HTTP Toolkit's <strong>
            <a href="https://github.com/httptoolkit/mockttp">
                open-source internals
            </a></strong>
        </p>
    </FeaturesCard>
</FeatureCardsBlock>;