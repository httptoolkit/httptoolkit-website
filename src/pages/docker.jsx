import React from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config.js';
import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import { EmailSignupModal } from '../components/email-signup-modal';
import { StandaloneDownloadCTA } from '../components/cta';
import { DemoVideo } from '../components/demo-video';
import { SectionSpacer } from '../components/section-spacer';

import { TopHeroContainer, Pitch } from '../components/pitch/leading-pitch';
import { Description } from '../components/pitch/description';
import { FuturePlans } from '../components/pitch/future-plans';
import { TrailingPitchBlock } from '../components/pitch/trailing-pitch';

import { TargetIconContainer } from '../components/per-target/target-icon-container';
import { DockerLaunchGettingStarted } from '../components/per-target/docker-launch-getting-started';
import { DockerAttachGettingStarted } from '../components/per-target/docker-attach-getting-started';
import { DockerSupportedTools } from '../components/per-target/docker-supported-tools';

import { Testimonials } from '../components/testimonials.jsx';
import { InterceptFeature } from '../components/features/intercept';
import { InspectFeature } from '../components/features/inspect';
import { MockFeature } from '../components/features/mock';
import { EditFeature } from '../components/features/edit';
import { BreakpointFeature } from '../components/features/breakpoint';

import DockerLogo from '../images/3rd-party-logos/docker.png';

const GettingStartedIntro = styled.p`
    ${p => p.theme.fontSizeText};
    font-style: italic;
    text-align: center;
    width: 100%;
    margin-bottom: 40px;
`

const GettingStartedOr = styled.p`
    font-style: italic;
    text-align: center;

    ${media.desktop`
        flex-shrink: 1;
        margin: 40px 20px 20px 0;
    `}

    ${media.mobileOrTablet`
        flex: 100% 0 0;
        margin-bottom: 30px;
    `}
`;

const SplitGettingStarted = styled.div`
    display: flex;
    flex-wrap: wrap;

    ol {
        ${media.desktop`
            flex: 45% 0 0;
            margin-bottom: 0;
        `}

        ${media.tablet`
            flex: 80% 0 0;
            margin-bottom: 20px;
        `}

        ${media.mobile`
            flex: 100% 0 0;
            margin-bottom: 20px;
        `}
    }

    ${media.desktop`
        margin-bottom: 120px;
    `}

    ${media.mobileOrTablet`
        margin-bottom: 20px;
    `}
`;

export default class DockerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateModalOpen: false
        };
    }

    render() {
        return <Layout location={this.props.location}>
            <Helmet>
                <title>Capture, debug and mock all Docker HTTP traffic</title>

                <meta property="og:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <TopHeroContainer>
                <Pitch target='Docker' />
                <TargetIconContainer>
                    <img src={DockerLogo} alt="The Docker logo" />
                </TargetIconContainer>
                <StandaloneDownloadCTA />
            </TopHeroContainer>

            <DemoVideo name="docker-demo" />

            <Description />

            <SplitGettingStarted>
                <GettingStartedIntro>Two ways to get started:</GettingStartedIntro>
                <DockerLaunchGettingStarted />
                <GettingStartedOr>or</GettingStartedOr>
                <DockerAttachGettingStarted />
            </SplitGettingStarted>
            <DockerSupportedTools />
            <SectionSpacer />

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

            <EmailSignupModal
                source='docker-footer-modal'
                isOpen={!!this.state.updateModalOpen}
                onClose={() => this.setState({updateModalOpen: false })}
            />
        </Layout>;
    }
}