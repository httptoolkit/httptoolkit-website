import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { styled, media } from '../styles';

import MailchimpSignupForm from './mailchimp-signup-form';

const SubscribeText = styled.div`
    margin: 30px 0 15px;
    ${p => p.theme.fontSizeSubheading};
    line-height: 1.8;
`;

const SubscribeLink = styled.a`
    font-weight: bold;
    &:hover {
        color: ${p => p.theme.popColor};
    }
`;

export const BlogSubscribe = (props) => {
    return <div className={props.className}>
        <SubscribeText>
            Subscribe to new blog posts by{' '}
            using <SubscribeLink href='/rss.xml'>RSS <FontAwesomeIcon icon={['fas', 'rss-square']} /></SubscribeLink>,{' '}
            following <SubscribeLink href='https://twitter.com/intent/user?screen_name=httptoolkit' target='_blank' rel='noopener'>
                HTTP Toolkit on Twitter <FontAwesomeIcon icon={['fab', 'twitter']} />
            </SubscribeLink>,{' '}
            or being notified by email:
        </SubscribeText>
        <MailchimpSignupForm
            action={'https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&id=001b24c3da&SOURCE=blog:subscribe'}
            emailTitle={'Enter your email to stay up to date with new blog posts & updates'}
            privacyPolicy={'No spam, just new blog posts hot off the press'}
            hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_001b24c3da"}
            submitText={'Subscribe'}
        />
    </div>
};