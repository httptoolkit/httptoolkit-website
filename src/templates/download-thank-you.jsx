import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection } from '../components/full-width-section';
import { EmailSignupForm } from '../components/email-signup-form';

const ThankYouContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    ${p => !p.leftAlign && media.desktop`
        align-items: center;
    `}

    padding-top: 20px;
    padding-bottom: 20px;

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

const InstallCode = styled.code`
    ${p => p.theme.fontSizeHeading};
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    color: #ccc;
    background-color: #2d2d2d;
    border-radius: 4px;
    padding: 30px;
    margin: 0 0 40px;
`;

export default ({ pageContext: {
    releasePath,
    downloadCommand,
    targetName
}, location }) => {
    if (releasePath) {
        useEffect(() => {
            // Trigger a download of the app
            var iframe = document.createElement('iframe');
            iframe.src = `https://github.com/httptoolkit/httptoolkit-desktop/releases/download/${releasePath}`;
            iframe.style.display = "none";
            document.body.appendChild(iframe);
        }, [releasePath]);
    }

    return <Layout location={location}>
        <Helmet>
            <title>Download HTTP Toolkit for {targetName}</title>
        </Helmet>
        <ThankYouContainer leftAlign={!downloadCommand}>
            { downloadCommand
                ? <InstallCode>
                    { downloadCommand }
                </InstallCode>
                : <>
                    <ThankYouHeader>
                        HTTP Toolkit is now downloading...
                    </ThankYouHeader>
                    <ThankYouDetails>
                        <em>
                            Didn't work? Click{' '}
                            <a href={`https://github.com/httptoolkit/httptoolkit-desktop/releases/download/${releasePath}`}>
                                here
                            </a>.
                        </em>
                    </ThankYouDetails>
                </>
            }
            <ThankYouDetails>
                { downloadCommand && "You'll soon be downloading HTTP Toolkit. " }
                There's lots more HTTP Toolkit features coming soon too, like automated iOS interception,
                HTTP client tools, gRPC & GraphQL support, and request diffing.
            </ThankYouDetails>
            <ThankYouDetails>
                <strong>Join the mailing list now, so you don't miss new features & releases:</strong>
            </ThankYouDetails>
            <EmailSignupForm
                action="https://http-toolkit.mailcoach.app/subscribe/a63464bc-1d3f-4318-9229-91061d658373"
                source="download-thank-you"
                emailTitle={"Enter your email"}
                submitText={"Sign up"}
            />
        </ThankYouContainer>
    </Layout>;
}