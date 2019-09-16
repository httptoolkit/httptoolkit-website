import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { styled, media } from '../styles';

import MailchimpSignupForm from './mailchimp-signup-form';

const SubscribeText = styled.div`
    ${p => p.theme.fontSizeSubheading};

    ${media.desktopOrTablet`
        line-height: 1.8;
    `}
    ${media.mobile`
        line-height: 1.4;
    `}
`;

const SubscribeLink = styled.a`
    font-weight: bold;
    color: ${p => p.theme.primaryColor};

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

const CTAItem = styled.li`
    margin-top: 10px;
`;

export const BlogSubscribe = (props) => {
    return <SubscribeCTAContainer>
        <SubscribeText>
            <strong>{
                props.inPostFooter
                    ? 'Subscribe to more posts like this'
                    : 'Subscribe to new posts like these'
            }</strong>
            <ul>
                <CTAItem>
                    via <SubscribeLink href='/rss.xml'>
                        RSS <FontAwesomeIcon icon={['fas', 'rss-square']} />
                    </SubscribeLink>
                </CTAItem>
                <CTAItem>
                    by following <SubscribeLink
                        href='https://twitter.com/intent/user?screen_name=httptoolkit'
                        target='_blank'
                        rel='noopener'
                    >
                        HTTP Toolkit on Twitter <FontAwesomeIcon icon={['fab', 'twitter']} />
                    </SubscribeLink>
                </CTAItem>
                <CTAItem>
                    or with new posts sent straight to your inbox:
                    <MailchimpSignupForm
                        action={'https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&id=001b24c3da&SOURCE=blog:subscribe'}
                        emailTitle={'Enter your email to stay up to date with new blog posts & updates'}
                        privacyPolicy={'No spam, just new blog posts hot off the press'}
                        hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_001b24c3da"}
                        submitText={'Subscribe'}
                    />
                </CTAItem>
            </ul>
            </SubscribeText>
    </SubscribeCTAContainer>
};