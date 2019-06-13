import React from 'react';
import Helmet from 'react-helmet';

import { styled, media } from '../../styles';

import { Layout } from '../../components/layout';
import FullWidthSection from '../../components/full-width-section';
import { DownloadWidget } from '../../components/download-widget';
import { Modal } from '../../components/modal';
import MailchimpSignupForm from '../../components/mailchimp-signup-form';
import { LinkButton, ButtonLink } from '../../components/form';
import { FeaturedBy } from '../../components/featured-by';

import { InterceptFeature } from '../../components/features/intercept';
import { ExploreFeature } from '../../components/features/explore';
import { ExamineFeature } from '../../components/features/examine';
import { UnderstandFeature } from '../../components/features/understand';
import { AccelerateFeature } from '../../components/features/accelerate';

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
    margin-bottom: 60px;

    ${media.desktop`
        width: 100%;
    `}
    ${media.mobileOrTablet`
        min-width: 80%;
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

const DownloadViewWidget = styled(DownloadWidget)`
    ${media.desktop`
        width: 38%;
    `}
    ${media.mobileOrTablet`
        min-width: 80%;
    `}

    > button {
        color: ${p => p.theme.mainColor};
        background-color: ${p => p.outsideContainer
            ? p.theme.mainBackground
            : p.theme.containerBackground
        };

        border: 1px solid ${p => p.theme.containerBorder};

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
        <DownloadViewWidget outsideContainer={p.outsideContainer} />
        <Or>or</Or>
        <BuyProWidget />
    </WidgetsContainer>

const VideoWindowBorder = styled.div`
    border-radius: 4px;
    background-color: rgba(0,0,0,0.2);
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);

    box-sizing: border-box;

    padding: 0 4px 4px 4px;

    ${media.desktop`
        padding-top: 29px;
    `}

    ${media.tablet`
        padding-top: 20px;
    `}

    ${media.mobile`
        padding-top: 12px;
    `}

    width: 1024px;
    max-width: 100%;

    position: relative;
    margin-bottom: 60px;

    ${media.desktop`
        margin-top: -336px;
    `}

    ${media.mobileOrTablet`
        margin-top: -100px;
    `}

    ${media.tablet`
        margin-left: 30px;
        margin-right: 30px;
        max-width: calc(100% - 60px);
    `}

    ${media.mobile`
        margin-left: 10px;
        margin-right: 10px;
        max-width: calc(100% - 20px);
    `}
`;

const VideoWindowButtons = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 350 100"
})`
    position: absolute;
    top: 3px;
    left: 0px;

    fill: rgba(103, 113, 121, 0.6);

    ${media.desktop`
        height: 24px;
    `}

    ${media.tablet`
        height: 16px;
    `}

    ${media.mobile`
        height: 6px;
    `}
`;

const LiveDemoVideo = styled.video`
    background-color: #000;
    width: 100%;

    ${media.desktop`
        min-height: 569px;
        border-radius: 0 0 5px 5px;
    `}

    ${media.mobileOrTablet`
        min-height: 50vw;
    `}
`;

export const DemoVideo = () => <VideoWindowBorder>
    <VideoWindowButtons>
        <circle cx="75" cy="50" r="25"/>
        <circle cx="175" cy="50" r="25"/>
        <circle cx="275" cy="50" r="25"/>
    </VideoWindowButtons>

    <LiveDemoVideo controls autoPlay loop muted>
        <source src="/http-view-demo.mp4" type="video/mp4" />
        <source src="/http-view-demo.webm" type="video/webm" />
    </LiveDemoVideo>
</VideoWindowBorder>

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

const ViewDescriptionContainer = styled.p`
    ${p => p.theme.fontSizeNearlyHeading};
    line-height: 1.3;
    margin: 0 auto 60px;

    ${media.mobileOrTablet`
        padding: 0 10px;
    `}

    text-align: center;
    max-width: 700px;
`;

export const ViewDescription = () => <ViewDescriptionContainer>
    <Highlight>HTTP View</Highlight> is the first release of <Highlight>HTTP Toolkit</Highlight>,{' '}
    a suite of beautiful & <a
        href="https://github.com/httptoolkit"
        target="_blank"
        rel='noopener noreferrer'
    >open-source</a> tools for debugging, testing and building with
    HTTP(S) on Windows, Linux & Mac.
</ViewDescriptionContainer>

const ViewFutureContainer = styled.p`
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

export const ViewFuturePlans = (p) => <ViewFutureContainer>
    And that's just the first release!
    <br/><br/>
    Future plans include manual & automatic HTTP rewriting,
    security analysis & metrics, HTTP client tools,
    and much more...
    <br/><br/>
    Sound good? <LinkButton onClick={(e) => {
        e.preventDefault();
        p.onSignupUpdate();
    }}>
        Sign up for updates
    </LinkButton>,<br/>or download now below.
</ViewFutureContainer>

export const ModalTitle = styled.h2`
    margin-bottom: 30px;
`;

export default class ViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateModalOpen: false
        };
    }

    render() {
        return <Layout>
            <Helmet>
                <title>Intercept, explore & debug HTTP</title>
            </Helmet>
            <TopHeroContainer>
                <Pitch>
                    Debug deeper with <Highlight>HTTP View</Highlight>
                </Pitch>
                <SubPitch>
                    Intercept HTTP(S) with one click,
                    explore & examine traffic up close,
                    and discover exactly what your code is sending.
                </SubPitch>

                <CTAWidgets />
            </TopHeroContainer>

            <DemoVideo />

            <SectionSpacer />
            <ViewDescription />
            <FeaturedBy />
            <SectionSpacer />

            <InterceptFeature />
            <ExploreFeature reverse />
            <ExamineFeature />
            <UnderstandFeature reverse />
            <AccelerateFeature />

            <ViewFuturePlans onSignupUpdate={() => this.setState({ updateModalOpen: true })}/>
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