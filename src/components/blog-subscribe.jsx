import React from 'react';

import { styled, media } from '../styles';

import { MailchimpSignupForm } from './mailchimp-signup-form';

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
            <MailchimpSignupForm
                action={'https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&id=001b24c3da&SOURCE=blog:subscribe'}
                emailTitle={'Enter your email to stay up to date with new blog posts & updates'}
                privacyPolicy={'No spam, just new blog posts hot off the press'}
                hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_001b24c3da"}
                submitText={'Subscribe'}
            />
        </SubscribeText>
    </SubscribeCTAContainer>
};