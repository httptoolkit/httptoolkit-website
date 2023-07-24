import React from 'react';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection }from '../components/full-width-section';
import { EmailSignupForm } from '../components/email-signup-form';

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

export default (props) => (<Layout location={props.location}>
    <PageContainer>
        <Header>
            Keep yourself up to date
        </Header>
        <Details>
            There's a lot of new HTTP Toolkit features coming soon, like automated iOS interception,
            HTTP client tools, gRPC & GraphQL support, and request diffing.
        </Details>
        <Details>
            Want to hear about the latest new HTTP Toolkit features as soon as they land? <strong>Sign up for updates:</strong>
        </Details>
        <EmailSignupForm
            action="https://http-toolkit.mailcoach.app/subscribe/a63464bc-1d3f-4318-9229-91061d658373"
            source='keep-me-updated'
            emailTitle={"Enter your email"}
            submitText={"Sign up"}
        />
    </PageContainer>
</Layout>);