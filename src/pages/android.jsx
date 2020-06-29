import React from 'react';
import Helmet from 'react-helmet';

import { Layout } from '../components/layout';
import { MailchimpSignupModal } from '../components/mailchimp-signup-modal';
import { StandaloneDownloadCTA } from '../components/cta';
import { AndroidDemoVideo } from '../components/per-target/android-demo-video';
import { SectionSpacer } from '../components/section-spacer';

import { TopHeroContainer, Pitch } from '../components/pitch/leading-pitch';
import { Description } from '../components/pitch/description';
import { FuturePlans } from '../components/pitch/future-plans';
import { TrailingPitchBlock } from '../components/pitch/trailing-pitch';

import { AndroidDetails } from '../components/per-target/android-details';

import { InterceptFeature } from '../components/features/intercept';
import { InspectFeature } from '../components/features/inspect';
import { MockFeature } from '../components/features/mock';
import { EditFeature } from '../components/features/edit';
import { BreakpointFeature } from '../components/features/breakpoint';

export default class JSPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { updateModalOpen: false };
    }

    render() {
        const sendToEmailBlurb = <>
            You're on mobile, but you'll need the desktop app to get started.
            Send yourself a link to try it now on your computer:
        </>

        return <Layout>
            <Helmet>
                <title>Capture, debug & mock Android HTTP traffic</title>
            </Helmet>
            <TopHeroContainer>
                <Pitch target='Android' />
                <StandaloneDownloadCTA sendToEmailText={sendToEmailBlurb} />
            </TopHeroContainer>

            <AndroidDemoVideo />

            <SectionSpacer />
            <Description />
            <SectionSpacer />
            <AndroidDetails />
            <SectionSpacer />

            <StandaloneDownloadCTA sendToEmailText={sendToEmailBlurb} />

            <InspectFeature reverse />
            <BreakpointFeature />
            <MockFeature reverse />
            <EditFeature />

            <FuturePlans onSignupUpdate={() => this.setState({ updateModalOpen: true })}/>
            <TrailingPitchBlock sendToEmailText={sendToEmailBlurb} />

            <MailchimpSignupModal
                source='view-signup'
                isOpen={!!this.state.updateModalOpen}
                onClose={() => this.setState({updateModalOpen: false })}
            />
        </Layout>;
    }
}