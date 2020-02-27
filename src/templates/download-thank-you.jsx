import React, { useEffect } from 'react';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection } from '../components/full-width-section';
import { MailchimpSignupForm } from '../components/mailchimp-signup-form';

const ThankYouContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    ${p => !p.leftAlign && media.desktop`
        align-items: center;
    `}

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

export default ({ pageContext: { releasePath, downloadCommand } }) => {
    if (releasePath) {
        useEffect(() => {
            // Trigger a download of the app
            var iframe = document.createElement('iframe');
            iframe.src = `https://github.com/httptoolkit/httptoolkit-desktop/releases/download/${releasePath}`;
            iframe.style.display = "none";
            document.body.appendChild(iframe);
        }, []);
    }

    return <Layout>
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
                There's a lot more to come soon though, including automated Android, iOS & Docker interception, security linting and request diffing.
            </ThankYouDetails>
            <ThankYouDetails>
                <strong>Sign up now, so you don't miss new features & releases:</strong>
            </ThankYouDetails>
            <MailchimpSignupForm
                action="https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&amp;SOURCE=view-thank-you"
                emailTitle={"Enter your email"}
                hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
                submitText={"Sign up"}
            />
        </ThankYouContainer>
    </Layout>;
}