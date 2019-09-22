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

export const UnderstandFeature = (p) => <StaticQuery
    query={graphql`
        query {
            understandScreenshot: file(relativePath: { eq: "understand-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Understand</FeatureTitle>

            <FeatureSubHeading>
                Know <Nowrap>everything <BigProFeaturePill /></Nowrap>
            </FeatureSubHeading>

            <FeatureDescription>
                Fully understand what you're sending & receiving, with <strong>inline
                documentation, validation and analysis for 1400+ APIs</strong>, including
                AWS, Github & Stripe, along with all standard HTTP headers.
            </FeatureDescription>
            <FeatureDescription>
                Get documentation inline for the service and endpoint you're talking to, with
                explanations of each parameter, and jump to the official docs with one click.
            </FeatureDescription>
            <FeatureDescription>
                Spot misspelled, missed, or deprecated parameters before you put them in
                production, and deeply understand responses, with response status & body
                documentation included.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.understandScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;