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

export const ExamineFeature = (p) => <StaticQuery
    query={graphql`
        query {
            examineScreenshot: file(relativePath: { eq: "examine-screenshot.png" }) {
                ...FeatureImage
            }
        }
    `}
    render={(data) => <Feature reverse={p.reverse}>
        <FeatureTextContainer>
            <FeatureTitle>Examine</FeatureTitle>

            <FeatureSubHeading>
                Deep dive into HTTP exchanges
            </FeatureSubHeading>

            <FeatureDescription>
                Check the full URL, status, headers and
                body of every request or response to examine exactly
                what's being sent.
            </FeatureDescription>
            <FeatureDescription>
                Dive into the details of bodies with built-in editor <strong>highlighting
                and autoformatting for JavaScript, JSON, HTML, hex and more</strong>.
                Built with all the power of Monaco, the editor from Visual Studio Code.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg fluid={data.examineScreenshot.childImageSharp.fluid} />
    </Feature>}
/>;