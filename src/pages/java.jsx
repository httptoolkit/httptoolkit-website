import React from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config.js';
import { styled, media } from '../styles';

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
import { JavaLaunchGettingStarted } from '../components/per-target/java-launch-getting-started';
import { JavaAttachGettingStarted } from '../components/per-target/java-attach-getting-started';
import { JavaSupportedTools } from '../components/per-target/java-supported-tools';

import { FeatureCards } from '../components/features/feature-cards';
import { InterceptFeature } from '../components/features/intercept';
import { InspectFeature } from '../components/features/inspect';
import { MockFeature } from '../components/features/mock';
import { EditFeature } from '../components/features/edit';
import { BreakpointFeature } from '../components/features/breakpoint';

import javaLogo from '../images/3rd-party-logos/java.png';
import kotlinLogo from '../images/3rd-party-logos/kotlin.png';
import scalaLogo from '../images/3rd-party-logos/scala.png';

const IconSmallPrint = styled.p`
    ${p => p.theme.fontSizeText};
    margin-top: 20px;
    height: auto;
    padding-bottom: 10px;
`;

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

export default class JavaPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateModalOpen: false
        };
    }

    render() {
        return <Layout location={this.props.location}>
            <Helmet>
                <title>Capture, debug and mock all Java HTTP traffic</title>

                <meta property="og:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:image" content={siteMetadata.siteUrl + 'screenshot-social.png'} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <TopHeroContainer>
                <Pitch target='Java' />
                <TargetIconContainer>
                    <img src={scalaLogo} alt="The Scala Logo" />
                    <img src={javaLogo} alt="The Java Logo" />
                    <img src={kotlinLogo} alt="The Kotlin Logo" />
                    <IconSmallPrint>
                        (and anything else on the JVM)
                    </IconSmallPrint>
                </TargetIconContainer>
                <StandaloneDownloadCTA />
            </TopHeroContainer>

            <DemoVideo />

            <Description />

            <SplitGettingStarted>
                <GettingStartedIntro>Two ways to get started:</GettingStartedIntro>
                <JavaLaunchGettingStarted />
                <GettingStartedOr>or</GettingStartedOr>
                <JavaAttachGettingStarted />
            </SplitGettingStarted>
            <JavaSupportedTools />
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