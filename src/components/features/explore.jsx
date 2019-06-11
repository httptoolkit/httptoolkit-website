import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import {
    Feature,
    FeatureTextContainer,
    FeatureTitle,
    FeatureSubHeading,
    FeatureDescription,
    FeatureImg
} from '../feature';

export const ExploreFeature = (p) => <StaticQuery
    query={graphql`
        query {
            exploreScreenshot: file(relativePath: { eq: "explore-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Explore</FeatureTitle>

            <FeatureSubHeading>
                Quickly skim & search HTTP traffic
            </FeatureSubHeading>

            <FeatureDescription>
                Automatic highlighting of requests by content type, status
                and source lets you quickly skim streams
                of requests, and easily spot issues.
            </FeatureDescription>

            <FeatureDescription>
                Search over the full request & response URLs, statuses
                and headers to effortlessly find specific messages.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.exploreScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;