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

import { FeatureCards } from '../components/features/feature-cards';
import { InterceptFeature } from '../components/features/intercept';
import { InspectFeature } from '../components/features/inspect';
import { MockFeature } from '../components/features/mock';
import { EditFeature } from '../components/features/edit';
import { BreakpointFeature } from '../components/features/breakpoint';

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { updateModalOpen: false };
    }

    render() {
        return <Layout>
            <Helmet>
                <title>Intercept, debug & mock HTTP</title>
            </Helmet>
            <TopHeroContainer>
                <Pitch />
                <StandaloneDownloadCTA />
            </TopHeroContainer>

            <DemoVideo />

            <SectionSpacer />
            <Description />
            <FeatureCards />
            <StandaloneDownloadCTA />

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