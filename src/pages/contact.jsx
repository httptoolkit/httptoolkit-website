import React from 'react';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { TextInput, TextArea, SubmitInput } from '../components/form';

import FullWidthSection from '../components/full-width-section';

const SplashContainer = FullWidthSection.extend`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const SplashHeader = styled.h1`
    ${p => p.theme.fontSizeUltraHeading}
    font-weight: bolder;

    margin-bottom: 60px;

    ${media.mobileOrTablet`
        margin-top: 60px;
    `}
`;

const SplashBody = styled.div`
    ${p => p.theme.fontSizeSubheading}
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

const ContactForm = styled(({ email, ...props }) =>
    <form action={`https://formspree.io/${ email }`} method="POST" {...props}>
        <TextInput type="text" name="name" placeholder="Your Name" />
        <TextInput type="email" name="_replyto" placeholder="your@email.com" />
        <TextArea name="message" placeholder="Your message..." />
        <SubmitInput value="Send" />
    </form>
)`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 10px;

    input, textarea {
        margin: 10px 0;
    }
`;

export default () => (<Layout>
    <SplashContainer>
        <SplashHeader>
            Contact us
        </SplashHeader>
        <SplashBody>
            Have questions, suggestions, or problems?
        </SplashBody>
        <ContactForm email="tim@httptoolkit.tech" />
    </SplashContainer>
</Layout>);