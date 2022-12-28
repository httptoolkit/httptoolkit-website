import React from 'react';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection }from '../components/full-width-section';
import { MailchimpSignupForm } from '../components/mailchimp-signup-form';

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

export default (props) => (<Layout location={props.location}>
    <ThankYouContainer>
        <ThankYouHeader>
            Thanks for your purchase!
        </ThankYouHeader>
        <ThankYouDetails>
            You can close this page now. Just go back to the HTTP Toolkit app to get started with
            access to all the advanced features HTTP Toolkit has to offer.
        </ThankYouDetails>
        <ThankYouDetails>
            Your support helps to drive HTTP Toolkit and its associated open-source
            projects moving forwards, and there's lots more coming soon, like
            automated iOS interception, HTTP client tools, gRPC & GraphQL support,
            and request diffing.
        </ThankYouDetails>
        <ThankYouDetails>
            <strong>Join the mailing list now, so you don't miss new features & releases:</strong>
        </ThankYouDetails>
        <MailchimpSignupForm
            action="https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&amp;SOURCE=web-purchase-thank-you"
            emailTitle={"Enter your email"}
            hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
            submitText={"Sign up"}
        />
    </ThankYouContainer>
</Layout>);