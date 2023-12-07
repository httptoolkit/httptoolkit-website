import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import { siteMetadata } from '../../gatsby-config.js';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { EmailSignupModal } from '../components/email-signup-modal';

import { HeroBlockContainer } from '../components/pitch/hero-block-container';
import { TrailingPitchBlock } from '../components/pitch/trailing-pitch';

const Heading = styled.h1`
    ${p => p.theme.fontSizeHeading};
    font-weight: bold;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    ${media.desktop`
        margin: 110px 0 60px;
    `}

    ${media.mobileOrTablet`
        margin: 60px 0 30px;
    `}
`;

const Highlight = styled.span`
    color: ${p => p.theme.popColor};
    font-weight: bold;
`;

const SubHeading = styled.h2`
    ${p => p.theme.fontSizeNearlyHeading};
    margin: 0 auto;
    max-width: 920px;

    ${media.mobileOrTablet`
        margin-bottom: 30px;

        br {
            display: inline;
            content: ' ';
            clear: none;

            &:before {
                content: ' ';
            }
        }
    `}

    ${media.tablet`
        padding: 0 20px;
    `}

    ${media.mobile`
        padding: 0 10px;
    `}

    ${media.desktop`
        margin-bottom: 60px;
    `}

    text-align: center;
    line-height: 1.5;
`;

const Description = styled(SubHeading.withComponent("p"))`
    ${media.mobileOrTablet`
        margin: 30px auto;
    `}

    ${media.desktop`
        margin: 60px auto;
    `}
`;

const Alternatives = styled.ul`
    ${p => p.theme.fontSizeNearlyHeading};
    line-height: 1.5;
    max-width: 760px;

    list-style: square outside none;

    margin: 0 auto;

    ${media.mobileOrTablet`
        padding: 0 10px;
    `}
`;

export const Comparison = styled((p) =>
    <li className={p.className}>
        { p.children }
    </li>
)`
    margin-bottom: 10px;

    a:hover {
        color: ${p => p.theme.popColor};
    }
`;

export default class AlternativePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { updateModalOpen: false };
    }

    render() {
        return <Layout location={this.props.location}>
            <Helmet>
                <title>HTTP Toolkit as an alternative to...</title>

                <meta property="og:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <HeroBlockContainer>
                <Heading>
                    HTTP Toolkit as an alternative to...
                </Heading>
                <SubHeading>
                    How does <Highlight>HTTP Toolkit</Highlight> compare as an alternative to other popular HTTP debuggers?
                </SubHeading>
            </HeroBlockContainer>

            <Description>
                Let's look at the value of HTTP Toolkit as a:
            </Description>
            <Alternatives>
                <Comparison>
                    <Link to="/fiddler-alternative/">Fiddler alternative</Link>
                </Comparison>
                <Comparison>
                    <Link to="/charles-alternative/">Charles alternative</Link>
                </Comparison>
                <Comparison>
                    <Link to="/chrome-devtools-alternative/">Chrome Devtools alternative</Link>
                </Comparison>
            </Alternatives>
            <Description>
                Is your favorite alternative tool not in the list? Want to know how HTTP Toolkit compares to other options? <a href="https://github.com/httptoolkit/httptoolkit/issues/new/choose">
                    Send in your feedback
                </a> or submit a PR for <a href="https://github.com/httptoolkit/httptoolkit-website/tree/main/src/pages">
                    this site
                </a> directly.
            </Description>

            <TrailingPitchBlock />

            <EmailSignupModal
                source='alternatives-footer-modal'
                isOpen={!!this.state.updateModalOpen}
                onClose={() => this.setState({updateModalOpen: false })}
            />
        </Layout>;
    }
}