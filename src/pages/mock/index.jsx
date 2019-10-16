import React from 'react';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { styled, media } from '../../styles';

import { Layout } from '../../components/layout';
import FullWidthSection from '../../components/full-width-section';
import { DownloadWidget } from '../../components/download-widget';
import { Modal } from '../../components/modal';
import { AppWindow } from '../../components/app-window';
import MailchimpSignupForm from '../../components/mailchimp-signup-form';
import { LinkButton, ButtonLink } from '../../components/form';

import { FeatureCardsBlock, FeaturesCard } from '../../components/features/feature-cards';
import { InterceptFeature } from '../../components/features/intercept';
import { InspectFeature } from '../../components/features/inspect';
import { MockFeature } from '../../components/features/mock';
import { EditFeature } from '../../components/features/edit';
import { BreakpointFeature } from '../../components/features/breakpoint';

const HeroBlockContainer = styled(FullWidthSection)`
    ${media.mobileOrTablet`
        padding-top: 60px;
        padding-bottom: 60px;
    `}

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};

    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const TopHeroContainer = styled(HeroBlockContainer)`
    padding-top: 120px;
    padding-bottom: 336px;

    ${media.mobileOrTablet`
        padding-bottom: 100px;
    `}
`;

const BottomHeroContainer = styled(HeroBlockContainer)`
    padding: 120px 0 60px;

    ${media.mobileOrTablet`
        padding-bottom: 0;
    `}
`;

const BottomHeroCTA = styled.h2`
    ${p => p.theme.fontSizeHeading};
    font-weight: bold;
    line-height: 1.3;
    margin-bottom: 18px;
`;

export const BottomHeroBlock = () =>
    <BottomHeroContainer>
        <BottomHeroCTA>
            Try it for yourself
        </BottomHeroCTA>
        <CTAWidgets />
    </BottomHeroContainer>


export const Pitch = styled.h1`
    ${p => p.theme.fontSizeBiggerHeading};
    font-weight: bold;
    margin-bottom: 60px;
`;

export const Highlight = styled.span`
    color: ${p => p.theme.popColor};
    font-weight: bold;
`;

export const SubPitch = styled.h2`
    ${p => p.theme.fontSizeNearlyHeading};
    line-height: 1.3;

    max-width: 650px;
    margin-bottom: 60px;

    ${media.mobileOrTablet`
        br {
            content: ' ';
        }
        br:after {
            content: ' ';
        }
    `}
`;

const WidgetsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: space-evenly;

    ${media.desktop`
        width: 100%;
        margin-bottom: 110px;
    `}
    ${media.mobileOrTablet`
        min-width: 80%;
        margin-bottom: 60px;
    `}
`;

const Or = styled.span`
    font-style: italic;
    font-family: 'Courgette', sans-serif;
    ${p => p.theme.fontSizeSubheading};
    padding: 20px 0;

    align-self: center;

    ${media.mobileOrTablet`
        display: none;
    `}
`;

const DownloadMockWidget = styled(DownloadWidget)`
    ${media.desktop`
        width: 38%;
    `}
    ${media.mobileOrTablet`
        min-width: 80%;
    `}

    > button {
        &:first-child {
            border-right: none;
        }
        &:not(:first-child) {
            border-left: none;
        }
    }
`;

const BuyProWidget = styled(ButtonLink).attrs({
    to: '/get-pro',
    children: 'Get Pro'
})`
    ${p => p.theme.fontSizeNearlyHeading};
    font-weight: bold;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 38%;
    ${media.mobileOrTablet`
        display: none;
    `}
`;

export const CTAWidgets = (p) =>
    <WidgetsContainer>
        <DownloadMockWidget outsideContainer={p.outsideContainer} />
        <Or>or</Or>
        <BuyProWidget />
    </WidgetsContainer>


const LiveDemoVideo = styled.video`
    background-color: #000;
    width: 100%;

    ${media.desktop`
        min-height: 541px;
        border-radius: 0 0 5px 5px;
    `}

    ${media.mobileOrTablet`
        min-height: 50vw;
    `}
`;

export const DemoVideo = () => <AppWindow>
    <LiveDemoVideo controls autoPlay loop muted>
        <source src="/http-mock-demo.mp4" type="video/mp4" />
        <source src="/http-mock-demo.webm" type="video/webm" />
    </LiveDemoVideo>
</AppWindow>

export const SectionSpacer = styled.div`
    width: 100%;
    visibility: hidden;

    ${media.desktop`
        height: 120px;
    `}

    ${media.mobileOrTablet`
        height: 60px;
    `}
`;

const MockPitch = () => <PitchHeading>
        <OneClick>
        With one click<ShiftDown>↴</ShiftDown>
        </OneClick>
        <PitchLine>
            Intercept & view all your HTTP(S)
        </PitchLine>
        <PitchLine>
            Mock endpoints or entire servers
        </PitchLine>
        <PitchLine>
            Rewrite, redirect, or inject errors
        </PitchLine>
    </PitchHeading>;

const OneClick = styled.div`
    font-weight: initial;
    font-style: italic;
    font-family: Courgette;
    text-align: center;
    margin-bottom: 30px;
`;

const ShiftDown = styled.span`
    position: relative;
    top: 10px;
`;

const PitchHeading = styled.div`
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

    > svg, > ${OneClick} {
        color: ${p => p.theme.popColor};
    }
`;

const PitchLine = styled.h1`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

const MockDescriptionContainer = styled.p`
    ${p => p.theme.fontSizeNearlyHeading};
    line-height: 1.3;
    margin: 0 auto 60px;

    ${media.mobileOrTablet`
        padding: 0 10px;
    `}

    text-align: center;
    max-width: 700px;
`;

export const MockDescription = () => <MockDescriptionContainer>
    <Highlight>HTTP Mock</Highlight> is the latest tool in <Highlight>HTTP Toolkit</Highlight>,{' '}
    a suite of beautiful & <a
        href="https://github.com/httptoolkit"
        target="_blank"
        rel='noopener noreferrer'
    >open-source</a> tools for debugging, testing and building with HTTP(S),
    on Windows, Linux & Mac.
</MockDescriptionContainer>;

export const MockFeatureCards = () => <FeatureCardsBlock>
    <FeaturesCard>
        <h3>Debug</h3>
        <FontAwesomeIcon icon={['fal', 'search']} size='3x' />
        <p>
            Effortlessly intercept & proxy any HTTP or HTTPS traffic
        </p>
        <p>
            Search, explore & inspect HTTP requests & responses
        </p>
        <p>
            One-click setup for Chrome, Node.js, Ruby, Python & more
        </p>
    </FeaturesCard>
    <FeaturesCard>
        <h3>Test</h3>
        <FontAwesomeIcon icon={['fal', 'stopwatch']} size='3x' />
        <p>
            Edit requests & responses live, to test both APIs & clients
        </p>
        <p>
            Simulate HTTP errors, timeouts & failed connections
        </p>
        <p>
            Proxy traffic to edit all HTTP, or mock as a standalone server
        </p>
    </FeaturesCard>
    <FeaturesCard>
        <h3>Build</h3>
        <FontAwesomeIcon icon={['fal', 'wrench']} size='3x' />
        <p>
            Mock servers or endpoints for rapid prototyping
        </p>
        <p>
            Export ready-to-use requests for curl, fetch
            &amp; 20 other tools
        </p>
        <p>
            Automate HTTP using HTTP Toolkit's{' '}
            <a href="https://github.com/httptoolkit/mockttp">
            open-source internals
            </a>
        </p>
    </FeaturesCard>
</FeatureCardsBlock>;

export const StandaloneDownloadWidget = styled(DownloadMockWidget).attrs({
    outsideContainer: true
})`
    ${media.desktop`
        width: 50%;
        margin: 0 auto 120px;
    `}

    ${media.mobileOrTablet`
        margin: 0 10px 120px;
    `};
`;

const MockFutureContainer = styled.p`
    ${p => p.theme.fontSizeSubheading};
    font-style: italic;
    line-height: 1.3;

    ${media.desktop`
        margin: 0 auto 120px;
    `}

    ${media.mobileOrTablet`
        margin: 0 auto 60px;
        padding: 0 10px;
    `}

    text-align: center;
    max-width: 490px;
`;

export const MockFuturePlans = (p) => <MockFutureContainer>
    And there's more to come too!
    <br/><br/>
    Future plans include security analysis & metrics,
    session-wide performance graphs & analysis, HTTP
    client tooling, Android integration, and much more...
    <br/><br/>
    Sound good? <LinkButton onClick={(e) => {
        e.preventDefault();
        p.onSignupUpdate();
    }}>
        Sign up for updates
    </LinkButton>,<br/>or download now below.
</MockFutureContainer>

export const ModalTitle = styled.h2`
    margin-bottom: 30px;
`;

export default class MockPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateModalOpen: false
        };
    }

    render() {
        return <Layout>
            <Helmet>
                <title>Intercept, debug & mock HTTP</title>
            </Helmet>
            <TopHeroContainer>
                <MockPitch />
                <StandaloneDownloadWidget />
            </TopHeroContainer>

            <DemoVideo />

            <SectionSpacer />
            <MockDescription />
            <MockFeatureCards />
            <StandaloneDownloadWidget />

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