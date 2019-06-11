import * as React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from "gatsby";

import { styled, media } from '../styles';

const FeaturedByContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    ${media.desktop`
        margin-bottom: 170px;
    `}

    ${media.mobileOrTablet`
        margin-bottom: 110px;
    `}
`;

const FeaturedByTitle = styled.h3`
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    ${p => p.theme.fontSizeSubheading};
    color: ${p => p.theme.mainSubtleColor};
    font-weight: bold;

    margin-bottom: 40px;
`;

const FeaturedByOrg = styled((props) => <a
    {...props}
    target="_blank"
    rel='noopener noreferrer'
>
    <Img alt={props.alt} fluid={props.fluid} />
</a>)`
    opacity: 0.8;
    min-width: 150px;
    margin-bottom: 10px;

    &:hover {
        opacity: 1;
    }
`;

export const FeaturedBy = () => <StaticQuery
    query={graphql`
        fragment FeaturedLogo on File {
            childImageSharp {
                fluid(maxHeight: 150) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }

        query {
            smashingLogo: file(relativePath: { eq: "3rd-party-logos/smashing-mag.png" }) {
                ...FeaturedLogo
            }
            webOpsLogo: file(relativePath: { eq: "3rd-party-logos/webops-weekly.png" }) {
                ...FeaturedLogo
            }
            phLogo: file(relativePath: { eq: "3rd-party-logos/product-hunt.png" }) {
                ...FeaturedLogo
            }
            jsDailyLogo: file(relativePath: { eq: "3rd-party-logos/js-daily.jpg" }) {
                ...FeaturedLogo
            }
            betalistLogo: file(relativePath: { eq: "3rd-party-logos/betalist.png" }) {
                ...FeaturedLogo
            }
            netlifyLogo: file(relativePath: { eq: "3rd-party-logos/netlify.png" }) {
                ...FeaturedLogo
            }
        }
    `}
    render={data => <FeaturedByContainer>
        <FeaturedByTitle>Featured by</FeaturedByTitle>
        <FeaturedByOrg
            href="https://javascriptweekly.com/issues/434"
            alt="JavaScript Daily"
            fluid={data.jsDailyLogo.childImageSharp.fluid}
        />
        <FeaturedByOrg
            href="https://twitter.com/smashingmag/status/1123879784688291841"
            alt="Smashing Magazine"
            fluid={data.smashingLogo.childImageSharp.fluid}
        />
        <FeaturedByOrg
            href="https://www.producthunt.com/posts/http-view"
            alt="Product Hunt"
            fluid={data.phLogo.childImageSharp.fluid}
        />
        <FeaturedByOrg
            href="https://webopsweekly.com/issues/213"
            alt="WebOps Daily"
            fluid={data.webOpsLogo.childImageSharp.fluid}
        />
        <FeaturedByOrg
            href="https://betalist.com/startups/http-toolkit"
            alt="Betalist"
            fluid={data.betalistLogo.childImageSharp.fluid}
        />
        <FeaturedByOrg
            href="https://www.netlify.com/blog/2019/02/18/featured-site-http-toolkit/"
            alt="Netlify"
            fluid={data.netlifyLogo.childImageSharp.fluid}
        />
    </FeaturedByContainer>}
/>