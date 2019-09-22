import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { Nowrap } from '../nowrap';
import {
    Feature,
    FeatureTextContainer,
    FeatureTitle,
    FeatureSubHeading,
    FeatureDescription,
    FeatureImg,
    BigProFeaturePill
} from '../feature';

export const AccelerateFeature = (p) => <StaticQuery
    query={graphql`
        query {
            accelerateScreenshot: file(relativePath: { eq: "accelerate-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Accelerate</FeatureTitle>

            <FeatureSubHeading>
                <Nowrap>Go faster <BigProFeaturePill /></Nowrap>
            </FeatureSubHeading>

            <FeatureDescription>
                See timing info, and dive into the compression and caching of
                every exchange, for a full performance overview.
            </FeatureDescription>
            <FeatureDescription>
                Check the compression of your requests & responses, to find easy routes
                to save time & bandwidth, and get warnings for messages made larger by
                poor compression.
            </FeatureDescription>
            <FeatureDescription>
                Effortlessly understand HTTP caching, with detailed explanations of how
                each response will be cached, why, and warnings & suggestions to help
                you improve.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.accelerateScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;