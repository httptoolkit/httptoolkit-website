import React from "react";
import Helmet from 'react-helmet';
import { graphql } from "gatsby"

import { styled, media } from '../styles';
import { Layout } from '../components/layout';
import { DocsSidebar } from '../components/docs-sidebar';
import { Docsearch } from '../components/docsearch';

import { DocContainer } from '../pages/docs';

const DocBody = styled.article`
    position: relative;
    flex-grow: 1;
    background-color: ${p => p.theme.popBackground};

    ${media.desktop`
        border-left: 1px solid rgba(0,0,0,0.2);
        box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

        padding-left: 60px;
        padding-right: calc((100vw - ${p => p.theme.pageWidth.desktop}) / 2);
        padding-bottom: 60px;

        max-width: calc(${p => p.theme.pageWidth.desktop} - 240px);
        box-sizing: content-box;
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

    h2 {
        ${p => p.theme.fontSizeHeading};

        margin: 60px 0 30px;

        ${media.desktop`
            letter-spacing: -1px;
        `}
    }

    h3 {
        ${p => p.theme.fontSizeNearlyHeading};
        color: ${p => p.theme.mainColor};
        line-height: 1.45;
        margin-bottom: 30px;
    }

    h4 {
        font-weight: bold;
        ${p => p.theme.fontSizeSubheading};
        color: ${p => p.theme.mainColor};
        line-height: 1.45;
        margin-bottom: 30px;
    }

    p, ul, ol {
        ${p => p.theme.fontSizeText};
        font-family: 'Merriweather', serif;
        color: ${p => p.theme.mainColor};
        line-height: 1.8;
        letter-spacing: -0.01em;
        margin-bottom: 30px;
    }

    > div > p:first-child {
        margin-top: 60px;
    }

    ul {
        list-style-type: circle;
        margin-left: 25px;
    }

    ol {
        list-style-type: decimal;
        margin-left: 25px;
    }

    li > ul, li > ol {
        margin-bottom: 10px;
    }

    li {
        padding-left: 5px;
        margin-bottom: 10px;

        & > p {
            margin-bottom: 10px;
        }

        & > p:only-child {
            margin-bottom: 0;
        }
    }

    strong > a {
        color: ${p => p.theme.popColor};
    }

    blockquote {
        white-space: pre-wrap;
    }

    blockquote > p {
        border-left: 5px solid ${p => p.theme.mainSubtleColor};
        padding-left: 10px;
    }

    code {
        font-weight: bold;
        ${media.mobileOrTablet`
            word-break: break-all !important;
        `}
    }

    p > code, li > code, a > code {
        user-select: all;
        font-size: 90%;
        background-color: transparent !important;
        color: ${p => p.theme.mainColor} !important;
    }

    .gatsby-highlight {
        margin-bottom: 30px;
    }
`;

const MobileDocsearch = styled(Docsearch)`
    ${media.desktop`
        display: none;
    `}

    margin-top: 30px;
`;

export default ({ data }) => {
    const doc = data.markdownRemark;
    const { frontmatter } = doc;
    const { title } = frontmatter;
    const { slug } = doc.fields;

    // Links to the raw markdown -> click the edit pencil, and it forks & starts an editor.
    const editUrl = `https://github.com/httptoolkit/httptoolkit.tech/blob/master/src/docs/${
        slug.replace(/\/$/, '') // Trim trailing slashes
    }.md`;

    return (<Layout>
        <DocContainer>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={doc.excerpt} />

                <meta property="og:title" content={title} />
                <meta property="og:description" content={doc.excerpt} />

                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={doc.excerpt} />
            </Helmet>

            <DocsSidebar />
            <DocBody>
                <MobileDocsearch name='mobile' />
                <h1>{title}</h1>
                <em>Help improve these docs <a href={editUrl} target='_blank' rel='noopener noreferrer'>on GitHub</a></em>
                <div dangerouslySetInnerHTML={{ __html: doc.html }} />
                <em>Edit this page <a href={editUrl} target='_blank' rel='noopener noreferrer'>on GitHub</a></em>
            </DocBody>
        </DocContainer>
    </Layout>);
};

export const query = graphql`
    query DocQuery($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            excerpt
            html
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
    }
`;