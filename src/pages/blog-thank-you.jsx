import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection }from '../components/full-width-section';
import ShareLinks from '../components/share-links';

const ThankYouContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const ThankYouHeader = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bolder;

    margin-bottom: 60px;
`;

const ThankYouDetails = styled.p`
    ${p => p.theme.fontSizeSubheading};
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

export default () => (<Layout>
    <ThankYouContainer>
        <ThankYouHeader>
            Thanks for signing up
        </ThankYouHeader>
        <ThankYouDetails>
            Watch your inbox for new blog posts coming soon.
        </ThankYouDetails>
        <ThankYouDetails>
            Have you tried HTTP Toolkit out for yourself yet? <Link to='/'>Download it now</Link>.
        </ThankYouDetails>
        <ShareLinks>
            <a
                className='twitter'
                href="https://twitter.com/intent/tweet?hashtags=httptoolkit&text=HTTP%20Toolkit%20looks%20awesome!%20New%20open-source%20tool%20to%20intercept%2C%20debug%20%26%20build%20with%20HTTP.%20Download%20it%20now%20at&url=https%3A%2F%2Fhttptoolkit.tech/"
                target="_blank"
                rel='noopener noreferrer'
            >
                <FontAwesomeIcon icon={['fab', 'twitter']} />
                Share HTTP Toolkit<br/>on Twitter
            </a>
            <a
                className='facebook'
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhttptoolkit.tech"
                target="_blank"
                rel='noopener noreferrer'
            >
                <FontAwesomeIcon icon={['fab', 'facebook']} />
                Share HTTP Toolkit<br/>on Facebook
            </a>
        </ShareLinks>
    </ThankYouContainer>
</Layout>);