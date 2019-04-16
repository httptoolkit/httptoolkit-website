import React from 'react';
import { graphql } from "gatsby"
import Img from 'gatsby-image';
import Helmet from 'react-helmet';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';
import FullWidthSection from '../components/full-width-section';
import { DownloadWidget } from '../components/download-widget';
import { Modal } from '../components/modal';
import MailchimpSignupForm from '../components/mailchimp-signup-form';
import { LinkButton } from '../components/form';
import { ProPill } from '../components/pro-pill';
import { Nowrap } from '../components/nowrap';

const HeroBlock = styled(FullWidthSection)`
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

const TopHeroBlock = styled(HeroBlock)`
    padding-top: 120px;
    padding-bottom: 336px;

    ${media.mobileOrTablet`
        padding-bottom: 100px;
    `}
`;

const BottomHeroBlock = styled(HeroBlock)`
    padding: 120px 0;
`;

const BottomHeroCTA = styled.h2`
    ${p => p.theme.fontSizeHeading};
    font-weight: bold;
    line-height: 1.3;
    margin-bottom: 18px;
`;

const Pitch = styled.h1`
    ${p => p.theme.fontSizeBiggerHeading};
    font-weight: bold;
    margin-bottom: 60px;
`;

const Highlight = styled.span`
    color: ${p => p.theme.popColor};
    font-weight: bold;
`;

const SubPitch = styled.h2`
    ${p => p.theme.fontSizeSubheading};
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
    ${p => p.theme.fontSizeSubheading};
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
    ${p => p.theme.fontSizeSubheading};
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

    > .gatsby-image-wrapper {
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
    ${p => p.theme.fontSizeText};
    line-height: 1.3;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

const ProFeature = styled(ProPill)`
    ${p => p.theme.fontSizeSubheading};
    vertical-align: 0.35em;
    margin-left: 5px;
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

        return <Layout>
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
                        Capture HTTP(S) <Nowrap>with zero setup</Nowrap>
                    </FeatureSubHeading>

                    <FeatureDescription>
                        HTTP View includes automatic interception
                        integrations for HTTP and HTTPS on a huge
                        range of platforms, with more coming soon,
                        from Chrome to iOS to Docker.
                    </FeatureDescription>

                    <FeatureDescription>
                        For platforms without automatic integrations, HTTP View{' '}
                        acts as an HTTP(S) proxy, <strong>compatible with almost all
                        HTTP clients, in any language</strong>.
                    </FeatureDescription>
                </FeatureTextContainer>

                <FeatureImg fluid={data.interceptScreenshot.childImageSharp.fluid} />
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

                <FeatureImg fluid={data.exploreScreenshot.childImageSharp.fluid} />
            </Feature>

            <Feature>
                <FeatureTextContainer>
                    <FeatureTitle>Examine</FeatureTitle>

                    <FeatureSubHeading>
                        Deep dive into HTTP exchanges
                    </FeatureSubHeading>

                    <FeatureDescription>
                        Check the full URL, status, headers and
                        body of every request or response to examine exactly
                        what's being sent.
                    </FeatureDescription>
                    <FeatureDescription>
                        Dive into the details of bodies with built-in editor <strong>highlighting
                        and autoformatting for JavaScript, JSON, HTML, hex and more</strong>.
                        Built with all the power of Monaco, the editor from Visual Studio Code.
                    </FeatureDescription>
                </FeatureTextContainer>

                <FeatureImg fluid={data.examineScreenshot.childImageSharp.fluid} />
            </Feature>

            <Feature reverse>
                <FeatureTextContainer>
                    <FeatureTitle>Understand</FeatureTitle>

                    <FeatureSubHeading>
                        Know <Nowrap>everything <ProFeature /></Nowrap>
                    </FeatureSubHeading>

                    <FeatureDescription>
                        Fully understand what you're sending & receiving, with <strong>inline
                        documentation, validation and analysis for 1400+ APIs</strong>, including
                        AWS, Github & Stripe, along with all standard HTTP headers.
                    </FeatureDescription>
                    <FeatureDescription>
                        Get documentation inline for the service and endpoint you're talking to, with
                        explanations of each parameter, and jump to the official docs with one click.
                    </FeatureDescription>
                    <FeatureDescription>
                        Spot misspelled, missed, or deprecated parameters before you put them in
                        production, and deeply understand responses, with response status & body
                        documentation included.
                    </FeatureDescription>
                </FeatureTextContainer>

                <FeatureImg fluid={data.understandScreenshot.childImageSharp.fluid} />
            </Feature>

            <Feature>
                <FeatureTextContainer>
                    <FeatureTitle>Accelerate</FeatureTitle>

                    <FeatureSubHeading>
                        <Nowrap>Go faster <ProFeature /></Nowrap>
                    </FeatureSubHeading>

                    <FeatureDescription>
                        See timing info, and dive into the compression and caching of
                        every exchange, for a full performance overview.
                    </FeatureDescription>
                    <FeatureDescription>
                        Check the compression of your requests & responses, to find easy routes
                        to save time & bandwidth, and get warnings for messages made larger by
                        poor compression.
                    </FeatureDescription>
                    <FeatureDescription>
                        Effortlessly understand HTTP caching, with detailed explanations of how
                        each response will be cached, why, and warnings & suggestions to help
                        you improve.
                    </FeatureDescription>
                </FeatureTextContainer>

                <FeatureImg fluid={data.accelerateScreenshot.childImageSharp.fluid} />
            </Feature>

            <ViewDescription>
                And that's just the first release!
                <br/><br/>
                Future plans include manual & automatic HTTP rewriting,
                security analysis & metrics, HTTP client tools,
                and much more...
                <br/><br/>
                Sound good? <LinkButton onClick={(e) => {
                    e.preventDefault();
                    this.setState({ updateModalOpen: true });
                }}>
                    Sign up for updates
                </LinkButton>,<br/>or download now below.
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
                    forceVertical={true}
                />
            </Modal>
        </Layout>;
    }
}

export const query = graphql`
    query {
        interceptScreenshot: file(relativePath: { eq: "intercept-screenshot.png" }) {
            childImageSharp {
                fluid(maxWidth: 750) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        exploreScreenshot: file(relativePath: { eq: "explore-screenshot.png" }) {
            childImageSharp {
                fluid(maxWidth: 750) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        examineScreenshot: file(relativePath: { eq: "examine-screenshot.png" }) {
            childImageSharp {
                fluid(maxWidth: 750) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        understandScreenshot: file(relativePath: { eq: "understand-screenshot.png" }) {
            childImageSharp {
                fluid(maxWidth: 750) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        accelerateScreenshot: file(relativePath: { eq: "accelerate-screenshot.png" }) {
            childImageSharp {
                fluid(maxWidth: 750) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`