import React from 'react';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection }from '../components/full-width-section';
import { MailchimpSignupForm } from '../components/mailchimp-signup-form';

const PageContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const Header = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bolder;

    margin-bottom: 60px;
`;

const Details = styled.p`
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
    <PageContainer>
        <Header>
            Keep yourself up to date
        </Header>
        <Details>
            There's a lot of new HTTP Toolkit features coming soon, from iOS & Docker interception to request diffing.
        </Details>
        <Details>
            Want to hear about the latest new HTTP Toolkit features as soon as they land? <strong>Sign up for updates:</strong>
        </Details>
        <MailchimpSignupForm
            action="https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&amp;SOURCE=keep-me-updated"
            emailTitle={"Enter your email"}
            hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
            submitText={"Sign up"}
        />
    </PageContainer>
</Layout>);