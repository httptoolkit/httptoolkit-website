import React from 'react';
import Link from 'gatsby-link';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

import { styled, media, css } from '../styles';

import FullWidthSection from '../components/full-width-section';
import { Button, ButtonLink } from '../components/form';
import { Nowrap } from '../components/nowrap';
import MailchimpSignupForm from '../components/mailchimp-signup-form';
import { Modal } from '../components/modal';

const PricingContainer = FullWidthSection.extend`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.containerBackground};
`;

const PricingHeader = styled.h1`
    ${p => p.theme.fontSizeHeading}
    font-weight: bolder;

    text-align: center;
    margin: 60px;

    ${media.mobileOrTablet`
        margin: 30px auto 10px;
    `}
`;

const PricingTable = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    ${media.mobileOrTablet`
        flex-wrap: wrap;
    `};
`;

const PricingTier = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.1);
    border-radius: 4px;
    border: 1px solid rgba(200, 200, 200,0.5);

    > * {
        padding: 10px 20px;
    }

    ${p => p.highlighted ? css`
        background-color: ${p => p.theme.popBackground};

        ${media.desktop`
            z-index: 1;
            margin: -15px -5px;

            > ${TierHeader} {
                padding: 37.5px 0;
            }
        `}
    ` : css`
        background-color: ${p => p.theme.mainBackground};
    `}

    ${media.desktop`
        width: 34%;
    `}

    ${media.tablet`
        width: 500px;
    `}

    ${media.mobileOrTablet`
        margin: 20px auto;
    `}

    [data-icon="info-circle"] {
        color: ${p => p.theme.primaryColor};
        height: 19px;
    }
`;

const TierHeader = styled.div`
    width: 100%;
    padding: 30px 0;

    color: ${p => p.theme.mainColor};

    text-align: center;
    font-weight: bold;
    ${p => p.theme.fontSizeSubheading};
`;

const TierPrice = styled.div`
    text-align: center;
    font-size: 18pt;
    padding: 15px 0;

    color: ${p => p.theme.popColor};
    margin: 0 20px;

    border-style: solid;
    border-color: rgba(0,0,0,0.3);
    border-width: 1px 0;

    > small {
        display: block;
        margin-top: 10px;
        font-size: 80%;
        opacity: 0.6;
    }
`;

const Price = styled.span`
    font-weight: bold;
`;

const TierFeatures = styled.ul`
    padding: 30px 20px;
    ${p => p.theme.fontSizeText};
`;

const Feature = styled.li`
    margin-top: 20px;

    &:first-child {
        margin-top: 0;
    }

    ul {
        list-style-type: circle;
        list-style-position: inside;

        li {
            margin-top: 20px;
        }
    }
`;

const StyledTooltip = ({ children, ...props }) =>
    <Tooltip
        arrow={true}
        {...props}
        position='left'
        style={{ cursor: 'pointer' }}
    >
        { children }
    </Tooltip>;

const TooltipUl = styled.ul`
    max-width: 230px;

    > li:not(:first-child) {
        margin-top: 10px;
    }

    padding: 10px 0;
`;

const PricingCTA = styled.div`
    margin-top: auto;
    margin-bottom: 10px;

    > ${Button}, > ${ButtonLink} {
        text-align: center;
        width: 100%
    }
`;

const PricingFooter = styled.div`
    ${p => p.theme.fontSizeSubheading}

    width: 100%;
    text-align: center;

    margin 70px auto 60px;

    ${media.mobileOrTablet`
        margin: 60px auto;
    `}
`;

export default class PricingPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlan: false // False or the plan name
        };
    }

    selectPlan(planName) {
        this.setState({ selectedPlan: planName });
        window.scrollTo(0, 0);

        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'select',
                eventLabel: planName,
            });
        }
    }

    render() {
        return <PricingContainer>
            <PricingHeader>
                Pricing
            </PricingHeader>

            <PricingTable>
                <PricingTier>
                    <TierHeader>
                        Hobbyist
                    </TierHeader>
                    <TierPrice>
                        <Price>Free</Price>
                        <small>Forever</small>
                    </TierPrice>
                    <TierFeatures>
                        <Feature>
                            All essential HTTP debugging, testing and client features
                        </Feature>
                        <Feature>
                            Open source (Apache 2.0)
                        </Feature>
                        <Feature>
                            Cross-platform support (Linux/Mac/Windows)
                        </Feature>
                    </TierFeatures>
                    <PricingCTA>
                        <ButtonLink to='/view'>
                            Download
                        </ButtonLink>
                    </PricingCTA>
                </PricingTier>

                <PricingTier highlighted={true}>
                    <TierHeader>
                        Professional
                    </TierHeader>
                    <TierPrice>
                        <Price>$50</Price> / year
                        <small>
                            <StyledTooltip
                                html={<TooltipUl>
                                    <li>Permanent license, even if your subscription ends</li>
                                    <li>Covers all versions available during your subscription</li>
                                    <li>One named user, unlimited devices</li>
                                </TooltipUl>}>
                                Personal user license <FontAwesomeIcon icon={['far', 'info-circle']} />
                            </StyledTooltip>
                        </small>
                    </TierPrice>
                    <TierFeatures>
                        <Feature>
                            <em>All Hobbyist features, and:</em>
                        </Feature>
                        <Feature>
                            <StyledTooltip
                                html={<TooltipUl>
                                    <li>Full source available via Github, pull requests welcome!</li>
                                    <li>Make any changes for your own personal use</li>
                                    <li>Share derived works with anybody licensed for the original version</li>
                                </TooltipUl>}
                            >
                                Open source, for license{' '}
                                <Nowrap>holders&nbsp;<FontAwesomeIcon icon={['far', 'info-circle']} /></Nowrap>
                            </StyledTooltip>
                        </Feature>
                        <Feature>
                            Deeper inspection of request/response data
                        </Feature>
                        <Feature>
                            Security & performance analysis, warnings and metrics.
                        </Feature>
                        <Feature>
                            Import/export requests, responses,
                            and code snippets.
                        </Feature>
                        <Feature>
                            Customize with colour themes
                        </Feature>
                        <Feature>
                            <strong>Support ongoing development!</strong>
                        </Feature>
                    </TierFeatures>
                    <PricingCTA>
                        <Button onClick={() => this.selectPlan('Pro')}>
                            Buy Pro
                        </Button>
                    </PricingCTA>
                </PricingTier>

                <PricingTier>
                    <TierHeader>
                        Team
                    </TierHeader>
                    <TierPrice>
                        <Price>$100</Price> / seat / year
                        <small>
                            <StyledTooltip
                                html={<TooltipUl>
                                    <li>Permanent license, even if your subscription ends</li>
                                    <li>Covers all versions available during your subscription</li>
                                    <li>One named user, unlimited devices</li>
                                    <li>Named user can be changed at any time during your subscription</li>
                                </TooltipUl>}>
                                Transferable user license <FontAwesomeIcon icon={['far', 'info-circle']} />
                            </StyledTooltip>
                        </small>
                    </TierPrice>
                    <TierFeatures>
                        <Feature><em>All Professional features, and:</em></Feature>
                        <Feature>Pass licenses between team members as required</Feature>
                        <Feature>Team workspaces for low-friction collaboration</Feature>
                        <Feature>
                            Options available on request:
                            <ul>
                                <li>Self-hosted infrastructure</li>
                                <li>Private support</li>
                                <li>Training & consultancy</li>
                                <li>Bulk discounts</li>
                            </ul>
                        </Feature>
                    </TierFeatures>
                    <PricingCTA>
                        <Button onClick={() => this.selectPlan('Team')}>
                            Buy Team
                        </Button>
                    </PricingCTA>
                </PricingTier>
            </PricingTable>

            <PricingFooter>
                Questions? <Link to="/contact">Get in touch</Link>
            </PricingFooter>

            <Modal isOpen={!!this.state.selectedPlan} onClose={() => this.setState({selectedPlan: false })}>
                <h2>Sign up for updates</h2>
                <p>
                    Great enthusiasm! Unfortunately, HTTP Toolkit is still new, and you can't buy{' '}
                    {this.state.selectedPlan} quite yet.
                </p>
                <p>
                    Thanks for your support though. Sign up now for updates and access when new releases are ready:
                </p>
                <MailchimpSignupForm
                    autoFocus
                    action={`https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=32dc875c8b&SOURCE=prelaunch:${this.state.selectedPlan}`}
                    emailTitle={`Enter your email to get updates and access when HTTP Toolkit ${this.state.selectedPlan} is ready`}
                    hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_32dc875c8b"}
                    submitText={"Sign up now"}
                />
                <p>
                    In the meantime, have you tried <Link to='/view'>HTTP View</Link>, the free & open-source release?
                </p>
            </Modal>
        </PricingContainer>;
    }
}