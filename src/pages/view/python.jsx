import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { graphql, StaticQuery } from 'gatsby';

import { Layout } from '../../components/layout';
import { Modal } from '../../components/modal';
import MailchimpSignupForm from '../../components/mailchimp-signup-form';

import { PythonGettingStarted } from '../../components/per-target/python-getting-started';
import { PythonSupportedTools } from '../../components/per-target/python-supported-tools';

import { InterceptFeature } from '../../components/features/intercept';
import { ExploreFeature } from '../../components/features/explore';
import { ExamineFeature } from '../../components/features/examine';
import { UnderstandFeature } from '../../components/features/understand';
import { AccelerateFeature } from '../../components/features/accelerate';

import {
    TopHeroContainer,
    CTAWidgets,
    Pitch,
    Highlight,
    SubPitch,
    SectionSpacer,
    ViewDescription,
    ViewFuturePlans,
    BottomHeroBlock,
    ModalTitle
} from './index';
import { AppWindow } from '../../components/app-window';

export default class ViewPythonPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateModalOpen: false
        };
    }

    render() {
        return <Layout>
            <Helmet>
                <title>Capture, view and debug your Python code's HTTP traffic</title>
            </Helmet>
            <TopHeroContainer>
                <Pitch>
                    HTTP Debugging for <Highlight>Python</Highlight>
                </Pitch>
                <SubPitch>
                    Instantly view & debug all HTTP traffic<br/>
                    from any Python tool, script, or server
                </SubPitch>

                <CTAWidgets />
            </TopHeroContainer>

            <AppWindow>
                <StaticQuery
                    query={graphql`
                        query {
                            pythonScreenshot: file(relativePath: { eq: "python-ui-screenshot.png" }) {
                                childImageSharp {
                                    fluid(maxWidth: 1024) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                }
                            }
                        }
                    `}
                    render={(data) =>
                        <Img fluid={data.pythonScreenshot.childImageSharp.fluid} />
                    }
                />
            </AppWindow>

            <SectionSpacer />
            <ViewDescription />
            <PythonGettingStarted />
            <PythonSupportedTools />
            <SectionSpacer />
            <CTAWidgets outsideContainer={true} />
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
                    action={`https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&SOURCE=php-view-signup`}
                    emailTitle={`Enter your email to get updates on new releases`}
                    hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
                    submitText={"Sign up now"}
                    forceVertical={true}
                />
            </Modal>
        </Layout>;
    }
}