import React from 'react';

import { styled, media, ThemeProvider, theme } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection }from '../components/full-width-section';
import { ButtonLink } from '../components/form';

const ErrorContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const ErrorHeader = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bolder;

    margin-bottom: 60px;
`;

const ErrorDetails = styled.p`
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

const HomeLink = styled(ButtonLink)`
    margin: 60px auto;
`;

export default () => (<ThemeProvider theme={theme}>
    <Layout location={{ pathname: '/' }}>
        <ErrorContainer>
            <ErrorHeader>
                Page Not Found
            </ErrorHeader>
            <ErrorDetails>
                Oh no! Sorry, this page doesn't exist.
            </ErrorDetails>
            <HomeLink to="/">
                Take me to the home page
            </HomeLink>
        </ErrorContainer>
    </Layout>
</ThemeProvider>);