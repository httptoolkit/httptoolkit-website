import React from 'react';
import { Link, graphql } from 'gatsby';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import FullWidthSection from '../components/full-width-section';
import { Hr } from '../components/hr';
import { BlogSubscribe } from '../components/blog-subscribe';

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark(
            limit: 100
            sort: { fields: [frontmatter___date], order: DESC },
            filter: { frontmatter: { draft: { ne: true } } }
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

const BlogListContainer = FullWidthSection.extend`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const BlogHeading = styled.h1`
    ${p => p.theme.fontSizeUltraHeading}
    font-weight: bolder;
`;

const BlogHeader = styled.div`
    ${media.desktop`
        margin: 60px 0 75px;
    `}

    ${media.mobileOrTablet`
        margin: 60px 0 40px;
    `}
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

export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges;

    return <Layout>
        <BlogListContainer width='780px'>
            <BlogHeader>
                <BlogHeading>Read the Blog</BlogHeading>
                <BlogSubscribe />
            </BlogHeader>

            <Hr/>

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