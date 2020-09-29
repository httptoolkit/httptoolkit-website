import * as React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

import { Nowrap } from '../nowrap';
import { styled } from '../../styles';
import {
    Feature,
    FeatureTextContainer,
    FeatureTitle,
    FeatureSubHeading,
    FeatureDescription,
    FeatureList,
    FeatureImg
} from '../feature';

const LinkedFeatureList = styled(FeatureList)`
    a[href^="/"] {
        font-weight: bold;

        &:not([aria-current]) {
            color: ${p => p.theme.popColor};
        }

        &[aria-current] {
            text-decoration: none;
        }
    }
`;

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

            <LinkedFeatureList>
                <li>Desktop browsers like <strong>Chrome, Edge & Firefox</strong></li>
                <li><Link to="/android/">
                    Android
                </Link> applications and browsers</li>
                <li>Backend & scripting languages, like&nbsp;
                    <Link to="/javascript/">
                        Node.js
                    </Link>, <Link to="/python/">
                        Python
                    </Link> & <Link to="/ruby/">
                        Ruby
                    </Link>
                </li>
                <li>Almost all terminal or <Link to="/electron/">
                    Electron-based
                </Link> applications</li>
                <li>
                    More coming soon, all powered by <a
                        href='https://github.com/httptoolkit/feedback'
                        target="_blank"
                        rel='noopener noreferrer'
                    >
                        your feedback
                    </a>
                </li>
            </LinkedFeatureList>

            <FeatureDescription>
                For platforms without automatic setup, HTTP Toolkit{' '}
                can be used as an HTTP(S) proxy, <strong>compatible with
                HTTP requests from any language or tool</strong>.
            </FeatureDescription>
        </FeatureTextContainer>

        <FeatureImg
            fluid={data.interceptScreenshot.childImageSharp.fluid}
            alt="HTTP interception for Chrome, Firefox, CLI tools, Docker, Edge, Android and more"
        />
    </Feature>}
/>;