import React from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config.js';

import { Layout } from '../components/layout';
import { EmailSignupModal } from '../components/email-signup-modal';
import { StandaloneDownloadCTA } from '../components/cta';
import { DemoVideo } from '../components/demo-video';
import { SectionSpacer } from '../components/section-spacer';
import { ProductLdData } from '../components/product-ld-data.jsx';

import { TopHeroContainer, Pitch } from '../components/pitch/leading-pitch';
import { Description } from '../components/pitch/description';
import { FuturePlans } from '../components/pitch/future-plans';
import { TrailingPitchBlock } from '../components/pitch/trailing-pitch';

import { TargetIconContainer } from '../components/per-target/target-icon-container';
import { RubyGettingStarted } from '../components/per-target/ruby-getting-started';
import { RubySupportedTools } from '../components/per-target/ruby-supported-tools';

import { Testimonials } from '../components/testimonials.jsx';
import { InterceptFeature } from '../components/features/intercept';
import { InspectFeature } from '../components/features/inspect';
import { MockFeature } from '../components/features/mock';
import { EditFeature } from '../components/features/edit';
import { BreakpointFeature } from '../components/features/breakpoint';

import rubyLogo from '../images/3rd-party-logos/ruby.png';

export default class RubyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateModalOpen: false
        };
    }

    render() {
        return <Layout location={this.props.location}>
            <Helmet>
                <title>Capture, debug and mock your Ruby app's HTTP traffic</title>

                <meta property="og:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:card" content="summary_large_image" />
                { ProductLdData() }
            </Helmet>
            <TopHeroContainer>
                <Pitch target='Ruby' />
                <TargetIconContainer>
                    <img src={rubyLogo} alt="The Ruby Logo" />
                </TargetIconContainer>
                <StandaloneDownloadCTA />
            </TopHeroContainer>

            <DemoVideo />

            <Description />

            <RubyGettingStarted />
            <RubySupportedTools />
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
                source='ruby-footer-modal'
                isOpen={!!this.state.updateModalOpen}
                onClose={() => this.setState({updateModalOpen: false })}
            />
        </Layout>;
    }
}