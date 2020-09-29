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

export const BreakpointFeature = (p) => <StaticQuery
    query={graphql`
        query {
            breakpointScreenshot: file(relativePath: { eq: "breakpoint-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Breakpoint</FeatureTitle>

            <FeatureSubHeading>
                Pause & edit live HTTP traffic
            </FeatureSubHeading>

            <FeatureDescription>
                Precisely match requests, jump to them when they appear,
                and edit anything: the target URL, method, headers or body.
            </FeatureDescription>

            <FeatureDescription>
                Manually respond directly to requests as they arrive, or
                pass them upstream, and pause & edit the real response
                on the way back.
            </FeatureDescription>

            <FeatureDescription>
                <strong>
                    Step through HTTP traffic request by request,
                    or manually mock endpoints and errors.
                </strong>
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg
            fluid={data.breakpointScreenshot.childImageSharp.fluid}
            alt="HTTP debugging with breakpoints on live traffic"
        />
    </Feature>}
/>;