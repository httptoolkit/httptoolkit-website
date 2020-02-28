import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';

import { Nowrap } from '../nowrap';
import {
    Feature,
    FeatureTextContainer,
    FeatureTitle,
    FeatureSubHeading,
    FeatureDescription,
    FeatureList,
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
                Automatic setup for targeted interception of HTTP & HTTPS
                from most clients, including:
            </FeatureDescription>

            <FeatureList>
                <li>Browsers like <strong>Chrome, Edge & Firefox</strong></li>
                <li>Almost all terminal or Electron-based applications</li>
                <li>Backend & scripting languages, including <strong>Node.js, Python & Ruby</strong></li>
                <li>
                    More coming soon, all powered by <a
                        href='https://github.com/httptoolkit/feedback'
                        target="_blank"
                        rel='noopener noreferrer'
                    >
                        your feedback
                    </a>
                </li>
            </FeatureList>

            <FeatureDescription>
                For platforms without automatic setup, HTTP Toolkit{' '}
                can be used as an HTTP(S) proxy, <strong>compatible with
                HTTP requests from any language or tool</strong>.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.interceptScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;