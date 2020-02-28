import React from 'react';
import Helmet from 'react-helmet';

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
import { ElectronGettingStarted } from '../components/per-target/electron-getting-started';
import { ElectronSupportedTools } from '../components/per-target/electron-supported-tools';

import { FeatureCards } from '../components/features/feature-cards';
import { InterceptFeature } from '../components/features/intercept';
import { InspectFeature } from '../components/features/inspect';
import { MockFeature } from '../components/features/mock';
import { EditFeature } from '../components/features/edit';
import { BreakpointFeature } from '../components/features/breakpoint';

import ElectronLogo from '../images/3rd-party-logos/electron.svg';

export default class ElectronPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { updateModalOpen: false };
    }

    render() {
        return <Layout>
            <Helmet>
                <title>Capture, debug and mock your Node.js and web JS's HTTP traffic</title>
            </Helmet>
            <TopHeroContainer>
                <Pitch target='Electron' />
                <TargetIconContainer>
                    <img src={ElectronLogo} alt="The Electron logo" />
                </TargetIconContainer>
                <StandaloneDownloadCTA />
            </TopHeroContainer>

            <DemoVideo name="electron-demo" />

            <SectionSpacer />
            <Description />
            <ElectronGettingStarted />
            <ElectronSupportedTools />
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