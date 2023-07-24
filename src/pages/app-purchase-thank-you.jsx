import React from 'react';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection }from '../components/full-width-section';
import { EmailSignupForm } from '../components/email-signup-form';

const ThankYouContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-top: 20px;
    padding-bottom: 20px;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};

    > form {
        ${media.desktop`
            width: 80%;
        `}
    }
`;

const ThankYouHeader = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bolder;

    margin-bottom: 40px;
`;

const ThankYouDetails = styled.p`
    ${p => p.theme.fontSizeSubheading};
    color: ${p => p.theme.mainSubtleColor};
    line-height: 1.25;

    ${media.desktop`
        width: 80%;
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
            You're all done, just go back to the HTTP Toolkit app to get started with
            access to all the advanced features HTTP Toolkit has to offer.
        </ThankYouDetails>
        <ThankYouDetails>
            There's lots more HTTP Toolkit features coming soon too, like automated iOS interception,
            HTTP client tools, gRPC & GraphQL support, and request diffing.
        </ThankYouDetails>
        <ThankYouDetails>
            <strong>Join the mailing list now, so you don't miss new features & releases:</strong>
        </ThankYouDetails>
        <EmailSignupForm
            action="https://http-toolkit.mailcoach.app/subscribe/a63464bc-1d3f-4318-9229-91061d658373"
            source="app-purchase-thank-you"
            emailTitle={"Enter your email"}
            submitText={"Sign up"}
        />
    </ThankYouContainer>
</Layout>);