import React from 'react';

import { styled, media } from '../styles';

import { EmailSignupForm } from './email-signup-form';

const SubscribeText = styled.div`
    ${p => p.theme.fontSizeSubheading};

    ${media.desktopOrTablet`
        line-height: 1.8;
    `}
    ${media.mobile`
        line-height: 1.4;
    `}

    > form {
        margin-top: 10px;
    }
`;

const SubscribeCTAContainer = styled.div`
    background-color: ${p => p.theme.containerBackground};
    border-left: 3px solid ${p => p.theme.popColor};

    ${media.desktopOrTablet`
        padding: 30px;
    `}
    ${media.mobile`
        padding: 20px;
    `}
`;

export const BlogSubscribe = (props) => {
    return <SubscribeCTAContainer>
        <SubscribeText>
            <strong>Become an HTTP &amp; debugging expert</strong> by subscribing to receive {
                props.inPostFooter
                    ? 'more posts like this'
                    : 'new posts like these'
            } emailed straight to your inbox:
            <EmailSignupForm
                action="https://http-toolkit.mailcoach.app/subscribe/1bc7e8da-ebc9-445e-b746-afe83016d607"
                privacyPolicy={'No spam, just new blog posts hot off the press'}
                emailTitle={'Enter your email to stay up to date with new blog posts & updates'}
                submitText={'Subscribe'}
            />
        </SubscribeText>
    </SubscribeCTAContainer>
};