import React from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config.js';

import { Layout } from '../components/layout';
import { MailchimpSignupModal } from '../components/mailchimp-signup-modal';
import { StandaloneDownloadCTA } from '../components/cta';
import { DemoVideo } from '../components/demo-video';
import { SectionSpacer } from '../components/section-spacer';

import { TopHeroContainer, Pitch } from '../components/pitch/leading-pitch';
import { Description } from '../components/pitch/description';
import { FuturePlans } from '../components/pitch/future-plans';
import { TrailingPitchBlock } from '../components/pitch/trailing-pitch';

import { TargetIconContainer } from '../components/per-target/target-icon-container';
import { JSGettingStarted } from '../components/per-target/js-getting-started';
import { JSSupportedTools } from '../components/per-target/js-supported-tools';

import { FeatureCards } from '../components/features/feature-cards';
import { InterceptFeature } from '../components/features/intercept';
import { InspectFeature } from '../components/features/inspect';
import { MockFeature } from '../components/features/mock';
import { EditFeature } from '../components/features/edit';
import { BreakpointFeature } from '../components/features/breakpoint';

import ChromeLogo from '../images/3rd-party-logos/chrome.png';
import NodeJSLogo from '../images/3rd-party-logos/nodejs.png';
import FirefoxLogo from '../images/3rd-party-logos/firefox.png';

export default class JSPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { updateModalOpen: false };
    }

    render() {
        return <Layout location={this.props.location}>
            <Helmet>
                <title>Capture, debug and mock your Node.js and web JS's HTTP traffic</title>

                <meta property="og:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <TopHeroContainer>
                <Pitch target='JavaScript' />
                <TargetIconContainer>
                    <img src={ChromeLogo} alt="The Chrome logo" />
                    <img src={NodeJSLogo} alt="The Node.js logo" />
                    <img src={FirefoxLogo} alt="The Firefox logo" />
                </TargetIconContainer>
                <StandaloneDownloadCTA />
            </TopHeroContainer>

            <DemoVideo />

            <SectionSpacer />
            <Description />
            <JSGettingStarted />
            <JSSupportedTools />
            <SectionSpacer />

            <StandaloneDownloadCTA />

            <FeatureCards />
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