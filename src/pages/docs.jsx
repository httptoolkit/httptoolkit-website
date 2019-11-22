import React from "react";
import Helmet from 'react-helmet';
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { DocsMenu } from '../components/docs-sidebar';
import { Docsearch } from "../components/docsearch";

export const DocContainer = styled.section`
    /* Based on FullWidthSection, but no right padding here (it's below) */
    ${media.desktop`
        padding-left: calc((100vw - ${p => p.theme.pageWidth.desktop}) / 2);
        margin: 0 calc(-1 * (100vw - ${p => p.theme.pageWidth.desktop}) / 2);
        flex-direction: row;
    `}

    ${media.tablet`
        padding-left: 30px;
        padding-right: 30px;
        flex-direction: column;
    `}

    ${media.mobile`
        flex-direction: column;
    `}

    flex: 1;
    display: flex;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const DocIntroBody = styled.div`
    position: relative;
    flex-grow: 1;
    background-color: ${p => p.theme.popBackground};

    ${media.desktop`
        border-left: 1px solid rgba(0,0,0,0.2);
        box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

        padding-left: 60px;
        padding-right: calc((100vw - ${p => p.theme.pageWidth.desktop}) / 2);
        padding-bottom: 60px;
    `}

    ${media.tablet`
        padding: 0 30px 20px;
    `}

    ${media.mobile`
        padding: 0 20px 20px;
        overflow-wrap: break-word;
    `}

    h1 {
        ${p => p.theme.fontSizeBiggerHeading};
        font-weight: bold;
        color: ${p => p.theme.mainColor};
        margin-top: 60px;

        ${media.desktop`
            letter-spacing: -1px;
        `}

        ${media.mobileOrTablet`
            margin-top: 30px;
        `}
    }
`;

const IntroDocsearch = styled(Docsearch)`
    margin: 60px 0;
`;

const GettingStartedTile = styled(Link)`
    margin: 60px auto;
    ${media.desktop`
        width: 60%;
    `}
    background: none;

    cursor: pointer;
    text-decoration: none;

    background-image: linear-gradient(
        transparent,
        rgba(0,0,0,.05) 40%,
        rgba(0,0,0,.1)
    );

    &:hover:not(:active) {
        background-image: linear-gradient(
            rgba(0,0,0,.1),
            rgba(0,0,0,.05) 40%,
            transparent
        );
    }

    display: block;
    padding: 20px;
    border: 1px solid ${p => p.theme.containerBorder};
    border-radius: 4px;

    text-align: center;

    > svg {
        margin-bottom: 10px;
        color: ${p => p.theme.popColor};
    }

    > h2 {
        ${p => p.theme.fontSizeHeading};
        color: ${p => p.theme.popColor};
        font-weight: bold;
    }

    > p {
        margin-top: 10px;
        ${p => p.theme.fontSizeSubheading};
    }
`;

export default () => {
    return (<Layout>
        <Helmet>
            <title>HTTP Toolkit Documentation</title>
        </Helmet>
        <DocContainer>
            <DocIntroBody>
                <h1>The HTTP Toolkit Docs</h1>

                <GettingStartedTile to="/docs/getting-started">
                    <FontAwesomeIcon icon={['fal', 'rocket']} size='4x' />
                    <h2>Quickstart Guide</h2>
                    <p>
                        New to HTTP Toolkit? Start here.
                    </p>
                </GettingStartedTile>

                <IntroDocsearch />

                <DocsMenu />
            </DocIntroBody>
        </DocContainer>
    </Layout>);
};