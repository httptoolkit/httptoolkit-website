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

export const InspectFeature = (p) => <StaticQuery
    query={graphql`
        query {
            inspectScreenshot: file(relativePath: { eq: "inspect-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Inspect</FeatureTitle>

            <FeatureSubHeading>
                Explore, search & examine HTTP
            </FeatureSubHeading>

            <FeatureDescription>
                Skim through traffic with highlighting by content type, status
                & source, or search by URL, status and headers to hunt down
                the messages that matter.
            </FeatureDescription>

            <FeatureDescription>
                Examine the URL, status, headers & body of each request or
                response, <strong>with inline explanations & docs from <a
                    href="https://developer.mozilla.org/docs/Web/HTTP"
                    target="_blank"
                    rel='noopener noreferrer'
                >
                    MDN
                </a></strong>.
            </FeatureDescription>
            <FeatureDescription>
                Dig into message bodies with <strong>highlighting & autoformatting for
                JSON, HTML, JS, hex and others</strong>, all using the power of
                Monaco, the editor from Visual Studio Code.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.inspectScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;