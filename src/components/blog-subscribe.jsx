import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const SubscribeLink = styled.a`
    font-weight: bold;
    color: ${p => p.theme.primaryInputBackground};

    &:hover {
        color: ${p => p.theme.popColor};
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
            <strong>Become an HTTP &amp; debugging expert</strong> by subscribing to hear about new posts {
                props.inPostFooter
                    ? 'like this'
                    : 'like these'
            } via <SubscribeLink href='/rss.xml'>
                    RSS <FontAwesomeIcon icon={['fas', 'rss-square']} />
            </SubscribeLink>, or with new posts sent straight to your inbox:
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