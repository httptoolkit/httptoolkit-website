import React from 'react';
import Helmet from 'react-helmet';

import { Layout } from '../../components/layout';
import { Modal } from '../../components/modal';
import MailchimpSignupForm from '../../components/mailchimp-signup-form';

import { RubyGettingStarted } from '../../components/per-target/ruby-getting-started';
import { RubySupportedTools } from '../../components/per-target/ruby-supported-tools';

import { InterceptFeature } from '../../components/features/intercept';
import { InspectFeature } from '../../components/features/inspect';
import { MockFeature } from '../../components/features/mock';
import { EditFeature } from '../../components/features/edit';
import { BreakpointFeature } from '../../components/features/breakpoint';

import {
    TopHeroContainer,
    StandaloneDownloadWidget,
    MockPitch,
    MockLanguageIcons,
    DemoVideo,
    SectionSpacer,
    MockDescription,
    MockFeatureCards,
    MockFuturePlans,
    BottomHeroBlock,
    ModalTitle
} from './index';

export default class MockRubyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateModalOpen: false
        };
    }

    render() {
        return <Layout>
            <Helmet>
                <title>Capture, debug and mock your Ruby app's HTTP traffic</title>
            </Helmet>
            <TopHeroContainer>
                <MockPitch language='Ruby' />
                <MockLanguageIcons icons={[
                    { icon: ['fas', 'gem'], color: '#CC342D' }
                ]} />
                <StandaloneDownloadWidget />
            </TopHeroContainer>

            <DemoVideo />

            <SectionSpacer />
            <MockDescription />
            <RubyGettingStarted />
            <RubySupportedTools />
            <SectionSpacer />

            <StandaloneDownloadWidget />

            <MockFeatureCards />
            <SectionSpacer />

            <InterceptFeature />
            <InspectFeature reverse />
            <BreakpointFeature />
            <MockFeature reverse />
            <EditFeature />

            <MockFuturePlans onSignupUpdate={() => this.setState({ updateModalOpen: true })}/>
            <BottomHeroBlock />

            <Modal isOpen={!!this.state.updateModalOpen} onClose={() => this.setState({updateModalOpen: false })}>
                <ModalTitle>Sign up for updates</ModalTitle>

                <MailchimpSignupForm
                    autoFocus
                    action={`https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&SOURCE=view-signup`}
                    emailTitle={`Enter your email to get updates on new releases`}
                    hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
                    submitText={"Sign up now"}
                    forceVertical={true}
                />
            </Modal>
        </Layout>;
    }
}