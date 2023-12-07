import React from 'react';
import { Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { FullWidthSection }from '../components/full-width-section';
import { BlogSubscribe } from '../components/blog-subscribe';

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(
            limit: 100
            sort: { fields: [frontmatter___date], order: DESC },
            filter: {
                frontmatter: { draft: { ne: true } }
                fields: { type: { eq: "blog-post" } }
            }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        draft
                    }
                }
            }
        }
    }
`

const BlogListContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const BlogHeading = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bolder;
    margin-bottom: 60px;
`;

const BlogHeader = styled.div`
    margin-top: 60px;
`;

const PostList = styled.ul`
    list-style-type: none;

    ${media.desktop`
        padding: 0 0 60px;
        margin: 50px 0 0 76px;
    `}

    ${media.mobileOrTablet`
        margin: 20px 0 0 40px;
    `}

    h2 {
        ${p => p.theme.fontSizeHeading};
        color: ${p => p.theme.mainColor};
    }

    a, em {
        display: block;
        padding: 20px;
    }

    a {
        position: relative;
        &::before {
            content: '\\2192';
            color: #000;
            position: absolute;

            ${media.desktop`
                left: -70px;
            `}

            ${media.mobileOrTablet`
                left: -35px;
            `}
        }

        &:hover {
            background: ${p => p.theme.popColor};
            text-decoration: none;
            color: white;
        }
    }
`

export default ({ data, location }) => {
    const posts = data.allMarkdownRemark.edges;

    return <Layout location={location}>
        <Helmet>
            <script type="application/ld+json">{
                JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "publisher": {
                        "@type": "Organization",
                        "name": "HTTP Toolkit",
                        "url": "https://httptoolkit.com/blog/",
                        "logo": "https://httptoolkit.com/logo-square.png"
                    }
                })
            }</script>
        </Helmet>
        <BlogListContainer width='780px'>
            <BlogHeader>
                <BlogHeading>Read the Blog</BlogHeading>
                <BlogSubscribe />
            </BlogHeader>

            <PostList>
                {posts.map(({ node: post }) => <li key={post.id}>
                    <h2>
                    <Link to={`/blog/${post.fields.slug}`}>{post.frontmatter.title}</Link>
                    </h2>
                </li>)}
            </PostList>
        </BlogListContainer>
    </Layout>
};