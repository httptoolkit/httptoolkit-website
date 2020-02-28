import Img from 'gatsby-image';
import { graphql } from 'gatsby';

import { styled, media } from '../styles';

import { ProPill } from './pro-pill';

// Define a fragment, so this can be used in queries elsewhere
// Export const required - presumably to ensure this is preserved
export const imageFragment = graphql`
    fragment FeatureImage on File {
        childImageSharp {
            fluid(maxWidth: 750) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
    }
`

export const Feature = styled.section`
    display: flex;
    align-items: center;

    ${media.desktop`
        flex-direction: ${p => p.reverse ? 'row-reverse' : 'row'};

        margin: 0 -15px 120px -15px;
        > * {
            margin: 0 15px;
        }
    `}

    ${media.mobileOrTablet`
        flex-wrap: wrap;
        flex-direction: column;
        margin: 0 10px 60px;
    `}

    ${media.tablet`
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    `}

    > .gatsby-image-wrapper {
        ${media.desktop`
            flex: 0 0 55%;
        `}

        ${media.mobileOrTablet`
            flex: 0 0 100%;
            width: 100%;
        `}
    }
`;

export const FeatureTextContainer = styled.div`
    display: flex;
    flex-direction: column;

    ${media.mobileOrTablet`
        margin-bottom: 40px;
    `}
`;

export const FeatureTitle = styled.h3`
    text-transform: uppercase;
    ${p => p.theme.fontSizeSubheading};
    color: ${p => p.theme.mainSubtleColor};
    font-weight: bold;

    padding-bottom: 30px;
`;

export const FeatureSubHeading = styled.h4`
    ${p => p.theme.fontSizeHeading};
    font-weight: bold;
    line-height: 1.3;
    padding-bottom: 30px;
`;

export const FeatureDescription = styled.p`
    ${p => p.theme.fontSizeText};
    line-height: 1.3;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

export const FeatureList = styled.ul`
    ${p => p.theme.fontSizeText};
    line-height: 1.3;

    &:not(:last-child) {
        margin-bottom: 30px;
    }

    list-style: circle;
    padding-left: 20px;

    > li:not(:first-child) {
        margin-top: 10px;
    }
`;

export const BigProFeaturePill = styled(ProPill)`
    ${p => p.theme.fontSizeSubheading};
    vertical-align: 0.35em;
    margin-left: 5px;
`;

export const SmallProFeaturePill = styled(ProPill)`
    ${p => p.theme.fontSizeText};
    line-height: 1;
    margin-left: 5px;
`;

export const FeatureImg = styled(Img)`
    object-fit: contain;

    mask-image: linear-gradient(
        to bottom,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 95%,
        rgba(0,0,0,0)
    );
`;