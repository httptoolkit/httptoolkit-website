import React from "react";
import Helmet from 'react-helmet';
import { graphql } from "gatsby"

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { DocsSidebar } from '../components/docs-sidebar';

const DocContainer = styled.section`
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

const Doc = styled.article`
    position: relative;
    flex-grow: 1;
    background-color: ${p => p.theme.popBackground};

    ${media.desktop`
        border-left: 1px solid rgba(0,0,0,0.2);
        box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

        padding-left: 60px;
        padding-right: calc((100vw - ${p => p.theme.pageWidth.desktop}) / 2);
    `}

    ${media.tablet`
        padding: 0 30px;
    `}

    ${media.mobile`
        padding: 0 20px;
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

    li > ul {
        margin-top: -20px;
        margin-bottom: 10px;
    }

    li {
        margin-bottom: 10px;

        & > p:only-child {
        margin-bottom: 0;
        }
    }

    strong > a {
        color: ${p => p.theme.popColor};
    }

    blockquote {
        white-space: pre;
    }

    blockquote > p {
        border-left: 5px solid ${p => p.theme.mainSubtleColor};
        padding-left: 10px;
    }

    code {
        font-weight: bold;
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

export default ({ data }) => {
    const doc = data.markdownRemark;
    const { frontmatter } = doc;
    const { title } = frontmatter;

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
            <Doc>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: doc.html }} />
            </Doc>
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