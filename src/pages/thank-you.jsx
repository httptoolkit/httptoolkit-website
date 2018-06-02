import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { styled, media, css } from '../styles';

import FullWidthSection from '../components/full-width-section';

const ThankYouContainer = FullWidthSection.extend`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const ThankYouHeader = styled.h1`
    ${p => p.theme.fontSizeUltraHeading}
    font-weight: bolder;

    margin-bottom: 60px;
`;

const ThankYouDetails = styled.p`
    ${p => p.theme.fontSizeSubheading}
    color: ${p => p.theme.mainSubtleColor};
    line-height: 1.25;

    ${media.desktop`
        width: 70%;
    `}

    > strong {
        color: ${p => p.theme.popColor};
    }

    margin: 0 0 20px;
`;

const ShareLinks = styled.div`
    ${media.mobile`
        text-align: center;
    `}

    > * {
        display: inline-block;

        ${media.desktopOrTablet`
            min-width: 250px;
        `}

        ${media.mobile`
            width: 90%;
        `}

        margin: 10px 10px 10px 0;
        padding: 20px;

        text-align: center;
        text-decoration: none;
        color: #fff;
        font-weight: bolder;
        ${p => p.theme.fontSizeSubheading};

        border-radius: 4px;
        border: 1px solid ${p => p.theme.containerBackground};

        > svg {
            display: block;
            margin: 0 auto 20px;
            height: 24px;
        }

        &.facebook {
            background: linear-gradient(to bottom, #4B69A8, #3B5998);
        }

        &.twitter {
            background: linear-gradient(to bottom, #10BCEF, #00ACED);
        }
    }
`;

export default () => (<ThankYouContainer>
    <ThankYouHeader>
        Thanks for signing up
    </ThankYouHeader>
    <ThankYouDetails>
        The first release of <strong>HTTP Toolkit</strong> is being finished up as we speak, but you're
        at the front of the line when it's ready!
    </ThankYouDetails>
    <ThankYouDetails>
        Watch your inbox for updates and an invite, coming soon.
    </ThankYouDetails>
    <ShareLinks>
        <a
            className='twitter'
            href="https://twitter.com/intent/tweet?hashtags=httptoolkit&text=HTTP%20Toolkit%20looks%20awesome!%20New%20open-source%20tool%20to%20intercept%2C%20debug%20%26%20build%20with%20HTTP.%20You%20can%20sign%20up%20for%20early%20access%20at&url=https%3A%2F%2Fhttptoolkit.tech"
            target="_blank"
        >
            <FontAwesomeIcon icon={['fab', 'twitter']} />
            Share on Twitter
        </a>
        <a
            className='facebook'
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhttptoolkit.tech"
            target="_blank"
        >
            <FontAwesomeIcon icon={['fab', 'facebook']} />
            Share on Facebook
        </a>
    </ShareLinks>
</ThankYouContainer>);