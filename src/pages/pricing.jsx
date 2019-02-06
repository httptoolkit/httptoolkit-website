import React from 'react';
import { Link } from 'gatsby';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

import { styled, media, css } from '../styles';

import { SubscriptionPlans } from '../accounts/subscriptions';

import { Layout } from '../components/layout';
import FullWidthSection from '../components/full-width-section';
import { Button, ButtonLink } from '../components/form';
import MailchimpSignupForm from '../components/mailchimp-signup-form';
import { Modal } from '../components/modal';
import { DownloadWidget } from '../components/download-widget';

const PricingContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.containerBackground};
`;

const PricingHeader = styled.h1`
    ${p => p.theme.fontSizeHeading};
    font-weight: bolder;

    text-align: center;
    margin: 60px 0 10px;

    ${media.mobileOrTablet`
        margin: 30px auto 25px;
    `}
`;

const PlanCycleToggle = styled.button`
    background: none;
    border: none;

    margin: 0 auto 30px;

    ${media.mobileOrTablet`
        margin: 0 auto 10px;
    `}

    padding: 10px 10px;

    font-family: Lato, Arial, sans-serif;
    ${p => p.theme.fontSizeSubheading};
    color: ${p => p.theme.mainColor};

    display: flex;
    align-items: center;
    flex-direction: row;

    cursor: pointer;

    > svg {
        margin: 0 10px;
    }
`;

const PlanCycle = styled.span`
    ${p => p.selected && css`
        text-decoration: underline;
    `}
    ${p => !p.selected && css`
        opacity: 0.7;
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

    ${media.mobileOrTablet`
        order: ${p => p.mobileOrder || 'unset'};
    `}

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
    ${p => p.theme.fontSizeSubheading};

    width: 100%;
    text-align: center;

    margin 70px auto 60px;

    ${media.mobileOrTablet`
        margin: 60px auto;
    `}
`;

export default @observer class PricingPage extends React.Component {
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

    @observable
    planCycle = 'annual';

    toggleCycle = action(() => {
        this.planCycle = this.planCycle === 'annual' ? 'monthly' : 'annual';
    });

    getPlanMonthlyPrice = (tierCode) => {
        const planCode = this.getPlanCode(tierCode);
        const plan = SubscriptionPlans[planCode];
        return plan.prices && plan.prices.monthly;
    };

    getPlanCode = (tierCode) => {
        return `${tierCode}-${this.planCycle}`;
    }

    render() {
        const { planCycle, toggleCycle, getPlanMonthlyPrice } = this;

        const spinner = <FontAwesomeIcon icon={['fal', 'spinner']} spin />;
        const proPrice = getPlanMonthlyPrice('pro') || spinner;
        const teamPrice = getPlanMonthlyPrice('team') || spinner;

        return <Layout>
            <PricingContainer>
                <PricingHeader>
                    Pricing
                </PricingHeader>

                <PlanCycleToggle onClick={toggleCycle}>
                    <PlanCycle selected={planCycle === 'monthly'}>Monthly</PlanCycle>

                    <FontAwesomeIcon icon={['fas', planCycle === 'annual' ? 'toggle-on' : 'toggle-off']} />

                    <PlanCycle selected={planCycle === 'annual'}>Annual</PlanCycle>
                </PlanCycleToggle>

                <PricingTable>
                    <PricingTier mobileOrder={3}>
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
                                Open Source (<a href="https://tldrlegal.com/l/agpl3" target="_blank" rel="noopener noreferrer">
                                    AGPL v3
                                </a>)
                            </Feature>
                            <Feature>
                                Cross-platform support (Linux/Mac/Windows)
                            </Feature>
                        </TierFeatures>
                        <PricingCTA>
                            <DownloadWidget small />
                        </PricingCTA>
                    </PricingTier>

                    <PricingTier highlighted={true}>
                        <TierHeader>
                            Professional
                        </TierHeader>
                        <TierPrice>
                            <Price>{proPrice} / month</Price>
                            <small>
                                <StyledTooltip
                                    html={<TooltipUl>
                                        <li>Unlimited devices</li>
                                        <li>Account linked to one named user</li>
                                    </TooltipUl>}>
                                    Personal user account <FontAwesomeIcon icon={['far', 'info-circle']} />
                                </StyledTooltip>
                            </small>
                        </TierPrice>
                        <TierFeatures>
                            <Feature>
                                <em>All Hobbyist features, and:</em>
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
                            <Price>{teamPrice} / user / month</Price>

                            <small>
                                <StyledTooltip
                                    html={<TooltipUl>
                                        <li>One team account, with many named user accounts</li>
                                        <li>Subscription covers a max number of concurrent team members</li>
                                        <li>Add or remove user accounts from the team as required</li>
                                    </TooltipUl>}>
                                    Team account <FontAwesomeIcon icon={['far', 'info-circle']} />
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
            </PricingContainer>
        </Layout>;
    }
}