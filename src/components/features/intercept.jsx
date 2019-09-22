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
                Automatic interception setup for HTTP & HTTPS
                from most clients, including browsers like <strong>
                Chrome & Firefox</strong>, almost all CLI tools, and backend languages
                like <strong>Node.js, Python & Ruby</strong>, with more platforms
                coming soon.
            </FeatureDescription>

            <FeatureDescription>
                For platforms without automatic integrations, HTTP Toolkit{' '}
                acts as an HTTP(S) proxy, <strong>compatible with standard
                HTTP requests from any language or tool</strong>.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.interceptScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;