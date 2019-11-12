import React from "react";
import Helmet from 'react-helmet';
import moment from 'moment';
import { graphql } from "gatsby"
import Img from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { styled, media } from '../styles';
import { isSSR } from '../util';

import { Layout } from '../components/layout';
import FullWidthSection from '../components/full-width-section';
import { BlogSubscribe } from '../components/blog-subscribe';
import { Headshot } from '../components/footer';

const BlogPostContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
    padding-bottom: 60px;
`;

const PublishDate = styled.p`
  font-style: italic;
  text-align: right;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  > a {
    margin-left: 5px;
  }
`;

const BlogPost = styled.article`
  position: relative;
  background-color: ${p => p.theme.mainBackground};

  ${media.mobile`
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
  }

  h2 {
    ${p => p.theme.fontSizeHeading};

    margin: 60px 0 30px;

    ${media.desktop`
      letter-spacing: -1px;
    `}

    &:first-child {
      margin: 10px 0 60px;
      font-style: italic;
    }

    &:not(:first-child) {
      font-weight: bold;
    }
  }

  h3 {
    font-weight: bold;
    ${p => p.theme.fontSizeText};
    color: ${p => p.theme.mainColor};
    line-height: 1.45;
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
    white-space: pre-wrap;
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

const CoverImg = styled(Img)`
  object-fit: cover;
  width: 100vw;
  max-height: 60vh;
  margin: 0 calc(-1 * (100vw - 100%) / 2);
`;

const SocialContainer = styled.div`
  position: absolute;
  left: 100%;
  height: 100%;
  margin-top: 49px;
`;

const SocialIcons = styled.div`
  ${media.desktop`
    position: sticky;
    top: 120px;

    > a, > button {
      margin: 20px 40px 0 40px;
      padding: 10px;
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      cursor: pointer;

      text-decoration: none;
      border: none;

      display: block;

      > svg {
        width: 100% !important;
        height: 100%;
      }

      &:hover, &:focus {
        opacity: 0.6;
      }
    }
  `}

  ${media.tablet`
    display: none;
  `}

  ${media.mobile`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;

    align-items: stretch;
    justify-content: space-evenly;

    background-color: ${p => p.theme.mainBackground};

    > a {
      height: 40px;
      width: 40px;
      padding: 5px;
      box-sizing: border-box;
      flex-grow: 0;

      > svg {
        width: 100% !important;
        height: 100%;
      }
    }

    > button {
      height: 40px;
      flex-grow: 1;
    }
  `}
`;

const SocialLink = (p) =>
  !p.url
    ? null
    : <a
        className={p.className}
        title={p.title}
        href={p.url}
        target='_blank'
        rel="noopener noreferrer"
      >
        { p.children }
      </a>

const TwitterIcon = styled((p) =>
  <SocialLink className={p.className} url={p.url} title='Share this post on Twitter'>
    <FontAwesomeIcon icon={['fab', 'twitter']} />
  </SocialLink>
)`
  background: linear-gradient(to bottom, #10BCEF, #00ACED);
  color: #fff;
`;

const RedditIcon = styled((p) =>
  <SocialLink className={p.className} url={p.url} title='Share this post on Reddit'>
    <FontAwesomeIcon icon={['fab', 'reddit-alien']} />
  </SocialLink>
)`
  padding: 8px;
  background-color: #ff4500;
  color: #fff;
`;

const DevToIcon = styled((p) =>
  <SocialLink className={p.className} url={p.url} title='Share this post on Dev.to'>
    <FontAwesomeIcon icon={['fab', 'dev']} />
  </SocialLink>
)`
&& { padding: 0; }
  color: #0a0a0a;
`;

const HackerNewsIcon = styled((p) =>
  <SocialLink className={p.className} url={p.url} title='Share this post on Hacker News'>
    <FontAwesomeIcon icon={['fab', 'hacker-news']} />
  </SocialLink>
)`
  && { padding: 0; }
  color: #ff4000;
`;

const ProductHuntIcon = styled((p) =>
  <SocialLink className={p.className} url={p.url} title='Share this post on Product Hunt'>
    <FontAwesomeIcon icon={['fab', 'product-hunt']} />
  </SocialLink>
)`
  && { padding: 5px; }
  color: #da552f;
`;

const WebShare = styled((p) =>
  (isSSR || !navigator || !navigator.share) ? null
  : <button
    title="Share this post"
    className={p.className}
    onClick={() => {
      navigator.share({
        text: p.title,
        url: p.postUrl
      });
    }}
  >
    <FontAwesomeIcon icon={['fas', 'share-alt']} />
  </button>
)`
  && { padding: 10px 11px 10px 9px; }
  border: none;
  background-color: ${p => p.theme.primaryColor};
  color: ${p => p.theme.mainBackground};
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  const { slug } = post.fields;
  const postUrl = `https://httptoolkit.tech/blog/${slug}`;
  const { frontmatter } = post;
  const { title } = frontmatter;
  const publishDate = moment.utc(post.frontmatter.date, 'YYYY-MM-DDTHH:mm');

  const twitterUrl = frontmatter.twitterUrl ||
    `https://twitter.com/intent/tweet?text=${title}&url=${postUrl}`;
  const redditUrl = frontmatter.redditUrl ||
    `http://www.reddit.com/submit?url=${postUrl}`;
  const hackerNewsUrl = frontmatter.hackerNewsUrl ||
    `https://news.ycombinator.com/submitlink?u=${postUrl}`;
  const devToUrl = frontmatter.devToUrl || false;
  const productHuntUrl = frontmatter.productHuntUrl || false;

  return (<Layout>
    <BlogPostContainer width='780px'>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={post.excerpt} />

        <meta property="og:title"       content={title} />
        <meta property="og:description" content={post.excerpt} />

        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      <BlogPost>
        <CoverImg fluid={post.frontmatter.cover_image.childImageSharp.fluid} />
        <SocialContainer>
          <SocialIcons>
            <TwitterIcon url={twitterUrl} />
            <RedditIcon url={redditUrl} />
            <DevToIcon url={devToUrl} />
            <HackerNewsIcon url={hackerNewsUrl} />
            <ProductHuntIcon url={productHuntUrl} />
            <WebShare postUrl={postUrl} title={title} />
          </SocialIcons>
        </SocialContainer>

        <h1>{title}</h1>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <PublishDate title={publishDate.format('MMM Do YYYY')}>
          Published { publishDate.fromNow() } by <a
            href="https://twitter.com/pimterry"
          >
            Tim Perry
          </a> <Headshot />
        </PublishDate>
      </BlogPost>

      <BlogSubscribe inPostFooter={true} />
    </BlogPostContainer>
  </Layout>);
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        cover_image {
          childImageSharp{
            fluid(maxWidth: 2560) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        redditUrl,
        hackerNewsUrl,
        productHuntUrl,
        devToUrl,
        twitterUrl
      }
    }
  }
`;