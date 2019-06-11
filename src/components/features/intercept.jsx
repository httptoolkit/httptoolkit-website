import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { Nowrap } from '../nowrap';
import {
    Feature,
    FeatureTextContainer,
    FeatureTitle,
    FeatureSubHeading,
    FeatureDescription,
    FeatureImg
} from '../feature';

export const InterceptFeature = (p) => <StaticQuery
    query={graphql`
        query {
            interceptScreenshot: file(relativePath: { eq: "intercept-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Intercept</FeatureTitle>

            <FeatureSubHeading>
                Capture HTTP(S) <Nowrap>with zero setup</Nowrap>
            </FeatureSubHeading>

            <FeatureDescription>
                HTTP View includes automatic interception
                integrations for HTTP and HTTPS on a huge
                range of platforms, with more coming soon,
                from Chrome to iOS to Docker.
            </FeatureDescription>

            <FeatureDescription>
                For platforms without automatic integrations, HTTP View{' '}
                acts as an HTTP(S) proxy, <strong>compatible with almost all
                HTTP clients, in any language</strong>.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.interceptScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;