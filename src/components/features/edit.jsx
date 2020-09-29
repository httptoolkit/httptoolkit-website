import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import {
    Feature,
    FeatureTextContainer,
    FeatureTitle,
    FeatureSubHeading,
    FeatureDescription,
    FeatureImg,
    SmallProFeaturePill
} from '../feature';

export const EditFeature = (p) => <StaticQuery
    query={graphql`
        query {
            editScreenshot: file(relativePath: { eq: "edit-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Edit</FeatureTitle>

            <FeatureSubHeading>
                Rewrite <em>anything</em>
            </FeatureSubHeading>

            <FeatureDescription>
                Inject request timeouts, simulate connection failures, and <strong>
                silently redirect requests from one server to another</strong>.
                <SmallProFeaturePill />
            </FeatureDescription>

            <FeatureDescription>
                Precise matching lets you target the requests you care about.
                Match any requests sent anywhere by using HTTP Toolkit as a proxy,
                send requests directly to use it as a mock server.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg
            fluid={data.editScreenshot.childImageSharp.fluid}
            alt="Match and rewrite HTTP with custom rules"
        />
    </Feature>}
/>;