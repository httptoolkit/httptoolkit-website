import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { siteMetadata } from '../../gatsby-config.js';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { MailchimpSignupModal } from '../components/mailchimp-signup-modal';
import { StandaloneDownloadCTA } from '../components/cta';
import { DemoVideo } from '../components/demo-video';

import { TopHeroContainer } from '../components/pitch/leading-pitch';
import { FuturePlans } from '../components/pitch/future-plans';
import { TrailingPitchBlock } from '../components/pitch/trailing-pitch';

import { Testimonials } from '../components/testimonials.jsx';
import { SectionSpacer } from '../components/section-spacer.jsx';

import { InterceptFeature } from '../components/features/intercept';
import { InspectFeature } from '../components/features/inspect';
import { MockFeature } from '../components/features/mock';
import { EditFeature } from '../components/features/edit';
import { BreakpointFeature } from '../components/features/breakpoint';

const Heading = styled.h1`
    ${p => p.theme.fontSizeHeading};
    font-weight: bold;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    ${media.desktop`
        margin-bottom: 110px;
    `}

    ${media.mobileOrTablet`
        margin-bottom: 60px;
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
        margin-bottom: 60px;

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
        margin-bottom: 120px;
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

const UniqueFeatures = styled.ul`
    ${p => p.theme.fontSizeSubheading};
    line-height: 1.5;
    max-width: 760px;

    ${media.desktop`
        margin: 0 auto 60px;
    `}
    ${media.mobileOrTablet`
        margin: 0 auto 30px;
        padding: 0 10px;
    `}
`;

export const UniqueFeature = styled((p) =>
    <li className={p.className}>
        <FontAwesomeIcon icon={['fas', 'check']} />
        <div>
            { p.children }
        </div>
    </li>
)`
    display: flex;
    margin-bottom: 10px;

    > svg {
        margin-right: 15px;
        margin-top: 5px;
        color: #27bc17;
    }

    a:hover {
        color: ${p => p.theme.popColor};
    }
`;

export default class CharlesAlternativePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { updateModalOpen: false };
    }

    render() {
        return <Layout location={this.props.location}>
            <Helmet>
                <title>A Chrome DevTools alternative | HTTP Toolkit</title>

                <meta property="og:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <TopHeroContainer>
                <Heading>
                    Want an alternative to Chrome's network tab?
                </Heading>
                <SubHeading>
                    <Highlight>HTTP Toolkit</Highlight> is a supercharged alternative to Chrome's built-in
                    networking tools, designed for faster debugging and complete control of any HTTP(S) traffic.
                </SubHeading>
                <StandaloneDownloadCTA
                    privacyPolicy="(No spam, no newsletters - just a quick & easy download link)"
                />
            </TopHeroContainer>

            <DemoVideo />

            <Description>
                <Highlight>HTTP Toolkit</Highlight> has all the core network debugging features you already know, plus:
            </Description>
            <UniqueFeatures>
                <UniqueFeature>
                    A <strong>fully featured body editor</strong> powered by the internals of VS Code to explore, search
                    and examine request and response bodies with autoformatting and folding for JSON, CSS, HTML, XML, and more
                </UniqueFeature>
                <UniqueFeature>
                    Flexible rules to <strong>automatically rewrite traffic</strong> so you can match requests
                    and breakpoint them, return mock responses, simulate errors, create timeouts, redirect traffic and more
                </UniqueFeature>
                <UniqueFeature>
                    Interception for other browsers and tabs: capture and compare traffic from
                    different sessions, all in one place.
                </UniqueFeature>
                <UniqueFeature>
                    Powerful filtering, including tools to pin and delete of individual requests, to collect and examine just
                    the requests and responses that matter to you
                </UniqueFeature>
                <UniqueFeature>
                    <strong>Built-in documentation</strong> for every standard HTTP header & status code, plus specific
                    endpoint docs & validation for 1400+ popular APIs
                </UniqueFeature>
                <UniqueFeature>
                    Caching and compression analysis, to explain how and why responses might (or might not) be
                    cached in future, and automatically highlight errors and potential improvements in your
                    configuration
                </UniqueFeature>
                <UniqueFeature>
                    Automatically interception for non-browser clients too, including{' '}
                    <Link to="/docker/">Docker</Link>, <Link to="/javascript/">Node.js</Link>,{' '}
                    <Link to="/python/">Python</Link>, <Link to="/ruby/">Ruby</Link>, and{' '}
                    <Link to="/android/">Android</Link>
                </UniqueFeature>
            </UniqueFeatures>
            <Description>
                All within a modern beautiful UI, available for Windows, Linux & Mac, and of course <Highlight>100% open-source</Highlight>.
            </Description>

            <StandaloneDownloadCTA />

            <Testimonials />
            <SectionSpacer />

            <InterceptFeature />
            <InspectFeature reverse />
            <BreakpointFeature />
            <MockFeature reverse />
            <EditFeature />

            <FuturePlans onSignupUpdate={() => this.setState({ updateModalOpen: true })}/>
            <TrailingPitchBlock />

            <MailchimpSignupModal
                source='view-signup'
                isOpen={!!this.state.updateModalOpen}
                onClose={() => this.setState({updateModalOpen: false })}
            />
        </Layout>;
    }
}