import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import {
    Feature,
    FeatureTextContainer,
    FeatureTitle,
    FeatureSubHeading,
    FeatureDescription,
    FeatureImg,
    BigProFeaturePill
} from '../feature';

export const MockFeature = (p) => <StaticQuery
    query={graphql`
        query {
            mockScreenshot: file(relativePath: { eq: "mock-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Mock</FeatureTitle>

            <FeatureSubHeading>
                Test with fully automated mock responses <BigProFeaturePill />
            </FeatureSubHeading>

            <FeatureDescription>
                Create rules to match requests and respond with your own content,
                to <strong>quickly prototype against new endpoints or services</strong>.
            </FeatureDescription>

            <FeatureDescription>
                Define new endpoints, override existing ones, or replace external services,
                to reproduce tricky edge cases and test your error handling.
            </FeatureDescription>

            <FeatureDescription>
                Import & export your mock rulesets, to build complex setups and share
                them with your team.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.mockScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;