import _ from 'lodash';
import React from 'react';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';

import { styled, media } from '../styles';

import FullWidthSection from '../components/full-width-section';
import { DownloadWidget } from '../components/download-widget';
import { Modal } from '../components/modal';
import MailchimpSignupForm from '../components/mailchimp-signup-form';

const HeroBlock = FullWidthSection.extend`
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

const TopHeroBlock = HeroBlock.extend`
    padding-top: 120px;
    padding-bottom: 336px;

    ${media.mobileOrTablet`
        padding-bottom: 100px;
    `}
`;

const BottomHeroBlock = HeroBlock.extend`
    padding: 120px 0;
`;

const BottomHeroCTA = styled.h2`
    ${p => p.theme.fontSizeHeading}
    font-weight: bold;
    line-height: 1.3;
    margin-bottom: 18px;
`;

const Pitch = styled.h1`
    ${p => p.theme.fontSizeBiggerHeading}
    font-weight: bold;
    margin-bottom: 60px;
`;

const Highlight = styled.span`
    color: ${p => p.theme.popColor};
    font-weight: bold;
`;

const SubPitch = styled.h2`
    ${p => p.theme.fontSizeSubheading}
    line-height: 1.3;

    max-width: 450px;
    margin-bottom: 60px;
`;

const WidgetAndDemoPitchContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 60px;
`;

const WidgetDemoSpacer = styled.div`
    ${media.desktop`
        height: 0px;
        width: 30px;
    `}

    ${media.mobileOrTablet`
        height: 30px;
        width: 100%;
    `}
`;

const DemoPitch = styled.div`
    ${p => p.theme.fontSizeSubheading}
    font-style: italic;
    font-family: Courgette;
`;

const ShiftDown = styled.span`
    position: relative;
    top: 7px;
`;

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

const ViewDescription = styled.p`
    ${p => p.theme.fontSizeSubheading}
    font-style: italic;
    line-height: 1.3;

    ${media.desktop`
        margin: 120px auto;
    `}

    ${media.mobileOrTablet`
        margin: 60px auto;
    `}

    text-align: center;
    max-width: 490px;
`;

const Feature = styled.section`
    display: flex;
    align-items: center;

    ${media.desktop`
        flex-direction: ${p => p.reverse ? 'row-reverse' : 'row'};

        margin: 0 -15px 120px -15px;
        > * {
            margin: 0 15px;
        }
    `}

    ${media.mobileOrTablet`
        flex-wrap: wrap;
        flex-direction: column;
        margin: 0 10px 60px;
    `}

    ${media.tablet`
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    `}

    > .gatsby-image-outer-wrapper {
        ${media.desktop`
            flex: 0 0 55%;
        `}

        ${media.mobileOrTablet`
            flex: 0 0 100%;
            width: 100%;
        `}
    }
`;

const FeatureTextContainer = styled.div`
    display: flex;
    flex-direction: column;

    ${media.mobileOrTablet`
        margin-bottom: 40px;
    `}
`;

const FeatureTitle = styled.h3`
    text-transform: uppercase;
    ${p => p.theme.fontSizeSubheading};
    color: ${p => p.theme.mainSubtleColor};
    font-weight: bold;

    padding-bottom: 30px;
`;

const FeatureSubHeading = styled.h4`
    ${p => p.theme.fontSizeHeading};
    font-weight: bold;
    line-height: 1.3;
    padding-bottom: 30px;
`;

const FeatureDescription = styled.p`
    ${p => p.theme.fontSizeText}
    line-height: 1.3;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

const FeatureImg = styled(Img)`
    object-fit: contain;

    mask-image: linear-gradient(
        to bottom,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,1) 95%,
        rgba(0,0,0,0)
    );
`;

const ModalTitle = styled.h2`
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
        const { data } = this.props;

        return <div>
            <Helmet>
                <title>HTTP View | Intercept, explore & debug HTTP</title>
            </Helmet>
            <TopHeroBlock>
                <Pitch>
                    Debug deeper with <Highlight>HTTP View</Highlight>
                </Pitch>
                <SubPitch>
                    Intercept HTTP(S) with one click,
                    explore & examine traffic up close,
                    and discover exactly what your code is sending.
                </SubPitch>

                <WidgetAndDemoPitchContainer>
                    <DownloadWidget />
                    <WidgetDemoSpacer/>
                    <DemoPitch>or see a live demo <ShiftDown>↴</ShiftDown></DemoPitch>
                </WidgetAndDemoPitchContainer>
            </TopHeroBlock>

            <VideoWindowBorder>
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

            <ViewDescription>
                <Highlight>HTTP View</Highlight> is the first release of{' '}
                <Highlight>HTTP Toolkit</Highlight>,
                a suite of beautiful & open-source tools
                for debugging, testing and building with HTTP(S)
                on Windows, Linux & Mac.
            </ViewDescription>

            <Feature>
                <FeatureTextContainer>
                    <FeatureTitle>Intercept</FeatureTitle>

                    <FeatureSubHeading>
                        Capture HTTP(S)<br/>with zero setup
                    </FeatureSubHeading>

                    <FeatureDescription>
                        HTTP View includes automatic interception
                        integrations for HTTP and HTTPS on a huge
                        range of platforms, with more coming soon,
                        from Chrome to iOS to Docker.
                    </FeatureDescription>

                    <FeatureDescription>
                        For platforms without automatic integrations, HTTP View{' '}
                        acts as an HTTP(S) proxy, compatible with almost all HTTP clients.
                    </FeatureDescription>
                </FeatureTextContainer>

                <FeatureImg sizes={data.interceptScreenshot.sizes} />
            </Feature>

            <Feature reverse>
                <FeatureTextContainer>
                    <FeatureTitle>Explore</FeatureTitle>

                    <FeatureSubHeading>
                        Quickly skim & search HTTP traffic
                    </FeatureSubHeading>

                    <FeatureDescription>
                        Automatic highlighting of requests by content type, status
                        and source lets you quickly skim streams
                        of requests, and easily spot issues.
                    </FeatureDescription>

                    <FeatureDescription>
                        Search over the full request & response URLs, statuses
                        and headers to effortlessly find specific messages.
                    </FeatureDescription>
                </FeatureTextContainer>

                <FeatureImg sizes={data.exploreScreenshot.sizes} />
            </Feature>

            <Feature>
                <FeatureTextContainer>
                    <FeatureTitle>Examine</FeatureTitle>

                    <FeatureSubHeading>
                        Deep dive into HTTP exchanges
                    </FeatureSubHeading>

                    <FeatureDescription>
                        Check the full URL, status, headers and
                        body of every request or response to understand exactly
                        what's being sent.
                    </FeatureDescription>
                    <FeatureDescription>
                        Dive into the details of bodies with built-in editor highlighting
                        and autoformatting for JavaScript, JSON, HTML, hex and more.
                        Built with all the power of Monaco, the editor from Visual Studio Code.
                    </FeatureDescription>
                </FeatureTextContainer>

                <FeatureImg sizes={data.examineScreenshot.sizes} />
            </Feature>

            <ViewDescription>
                And that's just the first release!
                <br/><br/>
                Future plans include manual & automatic HTTP rewriting,
                performance & security metrics, HTTP client tools,
                and much more...
                <br/><br/>
                Sound good? <a href='#' onClick={(e) => {
                    e.preventDefault();
                    this.setState({ updateModalOpen: true });
                }}>
                    Sign up for updates
                </a>,<br/>or download now below.
            </ViewDescription>

            <BottomHeroBlock>
                <BottomHeroCTA>
                    Try it for yourself
                </BottomHeroCTA>
                <DownloadWidget />
            </BottomHeroBlock>

            <Modal isOpen={!!this.state.updateModalOpen} onClose={() => this.setState({updateModalOpen: false })}>
                <ModalTitle>Sign up for updates</ModalTitle>

                <MailchimpSignupForm
                    autoFocus
                    action={`https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&SOURCE=view-signup`}
                    emailTitle={`Enter your email to get updates on new releases`}
                    hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
                    submitText={"Sign up now"}
                />
            </Modal>
        </div>;
    }
}

export const query = graphql`
    query GetViewImages {
        interceptScreenshot: imageSharp(id: { regex: "/intercept-screenshot.png/" }) {
            sizes(maxWidth: 750) {
                ...GatsbyImageSharpSizes
            }
        }
        exploreScreenshot: imageSharp(id: { regex: "/explore-screenshot.png/" }) {
            sizes(maxWidth: 750) {
                ...GatsbyImageSharpSizes
            }
        }
        examineScreenshot: imageSharp(id: { regex: "/examine-screenshot.png/" }) {
            sizes(maxWidth: 750) {
                ...GatsbyImageSharpSizes
            }
        }
    }
`