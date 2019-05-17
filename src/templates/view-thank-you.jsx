import React from 'react';
import Helmet from 'react-helmet';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import FullWidthSection from '../components/full-width-section';
import MailchimpSignupForm from '../components/mailchimp-signup-form';

const ThankYouContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};

    ${media.desktop`
        > form {
            max-width: 700px;
        }
    `}
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
        width: 70%;
    `}

    > strong {
        color: ${p => p.theme.popColor};
    }

    margin: 0 0 40px;
`;

export default ({ pageContext: { releasePath } }) => (<Layout>
    <ThankYouContainer>
        <Helmet>
            <meta httpEquiv='refresh' content={`1;url=https://github.com/httptoolkit/httptoolkit-desktop/releases/download/${releasePath}`} />
        </Helmet>
        <ThankYouHeader>
            Sign up for updates
        </ThankYouHeader>
        <ThankYouDetails>
            <strong>You're now downloading HTTP View</strong>, the first release of HTTP Toolkit.
            But there's a lot more to come soon, including automated Android, iOS & Docker interception,
            request & response editing, and security linting.
        </ThankYouDetails>
        <ThankYouDetails>
            Sign up now, so you don't miss new features & releases:
        </ThankYouDetails>
        <MailchimpSignupForm
            action="https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&amp;SOURCE=view-thank-you"
            emailTitle={"Enter your email"}
            hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
            submitText={"Sign up"}
        />
    </ThankYouContainer>
</Layout>);