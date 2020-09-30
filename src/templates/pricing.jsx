import * as _ from 'lodash';
import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

import { styled, media, css } from '../styles';

import { AccountStore } from '../accounts/account-store';
import { logOut } from '../accounts/auth';

import { Layout } from '../components/layout';
import { FullWidthSection }from '../components/full-width-section';
import { Button, ButtonLink, LinkButton } from '../components/form';
import { ModalWrapper, getVisibilityProps } from '../components/modal';
import { DownloadWidget } from '../components/download-widget';

const PricingContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.containerBackground};
    border-top: 1px solid rgba(0,0,0,0.2);
`;

const PricingHeader = styled.h1`
    ${p => p.theme.fontSizeHeading};
    font-weight: bolder;

    text-align: center;
    margin: 30px 0 10px;

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

    ${p => p.highlighted && !p.lowlighted ? css`
        background-color: ${p => p.theme.popBackground};

        ${media.desktop`
            z-index: 1;
            margin: -15px -5px;

            > ${TierHeader} {
                padding: 37.5px 0 7.5px;
            }
        `}
    ` : css`
        background-color: ${p => p.theme.mainBackground};
    `}

    ${p => p.lowlighted && css`
        opacity: 0.6;
    `}

    ${media.desktop`
        flex: 1 1 100%;

        ${p => p.highlighted && css`
            flex-basis: 104%;
        `}
    `}

    ${media.tablet`
        width: 500px;
    `}

    ${media.mobileOrTablet`
        margin: 20px auto;
    `}

    [data-icon="info-circle"] {
        color: ${p => p.theme.primaryInputBackground};
        height: 19px;
    }
`;

const TierHeader = styled.div`
    width: 100%;
    padding: 30px 0 0;

    color: ${p => p.theme.popColor};

    text-align: center;
    font-weight: bold;
    ${p => p.theme.fontSizeSubheading};
`;

const TierStatus = styled.div`
    width: 100%;
    min-height: 30px;
    padding: 0;
    text-align: center;

    color: ${p => p.theme.mainColor};
    ${p => p.theme.fontSizeText};
    opacity: 0.6;
`;

const TierPriceBlock = styled.div`
    text-align: center;
    font-size: 18pt;
    padding: 15px 0;

    color: ${p => p.theme.mainColor};
    margin: 0 20px;

    border-style: solid;
    border-color: rgba(0,0,0,0.3);
    border-width: 1px 0;
`;

const TierPrice = styled.span`
    font-weight: bold;
`;

const TierPriceCaveats = styled.small`
    display: block;
    font-size: 60%;
    opacity: 0.6;
`;

const TierLicense = styled.div`
    display: block;
    margin-top: 10px;
    ${p => p.theme.fontSizeSubheading};
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

        margin-top: 20px;

        li {
            margin-top: 10px;
        }
    }

    strong {
        font-weight: bold;
        color: ${p => p.theme.popColor};
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

    > * {
        text-align: center;
        width: 100%
    }
`;

const CTAInstructions = styled.div`
    width: 100%;
    text-align: center;
    padding: 0 0 10px;
    color: ${p => p.theme.primaryInputBackground};

    ${media.desktop`
        min-height: 45px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    `};

    ${media.mobileOrTablet`
        padding-top: 20px;
        ${p => p.theme.fontSizeText};
    `}
`;

const LogoutBlock = styled.div`
    width: 100%;
    text-align: center;
    padding: 30px 0 0;
`;

const PricingFooter = styled.div`
    ${p => p.theme.fontSizeSubheading};

    width: 100%;
    text-align: center;

    margin: 70px auto 60px;

    ${media.mobileOrTablet`
        margin: 60px auto;
    `}
`;

export default @observer class PricingPage extends React.Component {

    constructor(props) {
        super(props);
        this.hideFreePlan = props.pageContext.directPurchase || false;
        this.pageTitle = props.pageContext.directPurchase
            ? 'Get Pro'
            : 'Pricing';
    }

    // Set only when jumping here as part of a purchase flow
    hideFreePlan = false;
    pageTitle = 'Pricing';

    account = new AccountStore();

    @observable
    planCycle = this.account.subscription.paidCycle || 'monthly';

    toggleCycle = action(() => {
        this.planCycle = this.planCycle === 'annual' ? 'monthly' : 'annual';
    });

    getPlanMonthlyPrice = (tierCode) => {
        const plan = this.account.getPlan(tierCode, this.planCycle);
        return plan.prices && plan.prices.monthly;
    };

    getPlanStatus = (tierCode) => {
        const { paidTier, paidCycle, status } = this.account.subscription;

        if (paidTier !== tierCode) return;

        const statusDescription = {
            'active': 'Active',
            'trialing': 'Active trial',
            'past_due': 'Past due',
            'deleted': 'Active but cancelled'
        }[status] || 'Unknown';

        return paidCycle === this.planCycle
            ? statusDescription
            : `${statusDescription} (${paidCycle})`;
    }

    getPlanCta = (tierCode) => {
        const { paidTier, paidCycle } = this.account.subscription;

        if (tierCode === 'free') {
            return <DownloadWidget
                small
                sendToEmailText={'On mobile, but want to try it on your computer later?'}
            />;
        } else if (this.account.waitingForPurchase === tierCode) {
            return <Button>
                <FontAwesomeIcon icon={['fal', 'spinner']} spin />
            </Button>;
        } else if (paidTier === tierCode) {
            if (paidCycle === this.planCycle) {
                return <>
                    <CTAInstructions>
                        Download now and log in to<br/>access your {_.upperFirst(tierCode)} subscription
                    </CTAInstructions>
                    <DownloadWidget small sendToEmailText={'On mobile? Send it to your computer:'} />
                </>;
            } else {
                return <>
                    <CTAInstructions>
                        You already have this {paidCycle} plan.
                    </CTAInstructions>
                    <ButtonLink to='/contact/'>
                        Change to {this.planCycle}
                    </ButtonLink>
                </>;
            }
        } else {
            if (tierCode === 'pro') {
                return <Button onClick={() => this.account.buyPlan('pro', this.planCycle)}>
                    Buy Pro
                </Button>;
            } else if (tierCode === 'team') {
                return <ButtonLink
                    to='/contact/'
                    onClick={() => this.account.reportPlanSelected('team')}
                >
                    Get in touch
                </ButtonLink>;
            }
        }
    }

    render() {
        const {
            planCycle,
            toggleCycle,
            getPlanMonthlyPrice,
            getPlanCta,
            getPlanStatus,
            hideFreePlan
        } = this;
        const { user, isPaidUser, modal } = this.account;
        const { paidTier } = this.account.subscription;

        const visibilityProps = getVisibilityProps(!!modal);

        const spinner = <FontAwesomeIcon icon={['fal', 'spinner']} spin />;
        const proPrice = getPlanMonthlyPrice('pro') || spinner;
        const teamPrice = getPlanMonthlyPrice('team') || spinner;

        return <Layout location={this.props.location} modalIsActive={!!modal}>
            <Helmet>
                <title>Pricing | HTTP Toolkit</title>
            </Helmet>
            <PricingContainer {...visibilityProps}>
                <PricingHeader>
                    { this.pageTitle }
                </PricingHeader>

                <PlanCycleToggle onClick={toggleCycle}>
                    <PlanCycle selected={planCycle === 'monthly'}>Monthly</PlanCycle>

                    <FontAwesomeIcon icon={['fas', planCycle === 'annual' ? 'toggle-on' : 'toggle-off']} />

                    <PlanCycle selected={planCycle === 'annual'}>Annual</PlanCycle>
                </PlanCycleToggle>

                <PricingTable>
                    { !hideFreePlan && <PricingTier lowlighted={isPaidUser} mobileOrder={3}>
                        <TierHeader>
                            Hobbyist
                        </TierHeader>
                        <TierStatus/>
                        <TierPriceBlock>
                            <TierPrice>Free</TierPrice>

                            <TierPriceCaveats>&nbsp;</TierPriceCaveats>

                            <TierLicense>Forever</TierLicense>
                        </TierPriceBlock>
                        <TierFeatures>
                            <StyledTooltip
                                html={<TooltipUl>
                                    <li>100% open-source, even Pro</li>
                                    <li>Remix as you like, share with others, and contribute back</li>
                                    <li>
                                        AGPL is a copyleft license, meaning derivative code must remain open-source
                                    </li>
                                    <li>
                                        Standalone libraries like Mockttp are non-copyleft licensed
                                        (MIT / Apache 2) and can be used without this restriction
                                    </li>
                                </TooltipUl>}>
                                <Feature>
                                    100% Open Source (<a href="https://tldrlegal.com/l/agpl3" target="_blank" rel="noopener noreferrer">
                                        AGPL v3
                                    </a>) <FontAwesomeIcon icon={['far', 'info-circle']} />
                                </Feature>
                            </StyledTooltip>
                            <Feature>
                                Cross-platform (Linux/Mac/Windows)
                            </Feature>
                            <Feature>
                                Every interception integration
                            </Feature>
                            <Feature>
                                Essential HTTP debugging features
                            </Feature>
                            <Feature>
                                Manual HTTP mocking & rewriting
                            </Feature>
                        </TierFeatures>
                        <PricingCTA>
                            { getPlanCta('free') }
                        </PricingCTA>
                    </PricingTier> }

                    <PricingTier highlighted={true} lowlighted={isPaidUser && paidTier !== 'pro'}>
                        <TierHeader>
                            Professional
                        </TierHeader>
                        <TierStatus>{ getPlanStatus('pro') }</TierStatus>
                        <TierPriceBlock>
                            <TierPrice>{proPrice} / month</TierPrice>

                            <TierPriceCaveats>
                                plus tax, paid {this.planCycle === 'annual' ? 'annually' : 'monthly'}
                            </TierPriceCaveats>

                            <TierLicense>
                                <StyledTooltip
                                    html={<TooltipUl>
                                        <li>Unlimited devices</li>
                                        <li>Can only be used by one person</li>
                                        <li>Not transferrable between people</li>
                                    </TooltipUl>}>
                                    Personal user account <FontAwesomeIcon icon={['far', 'info-circle']} />
                                </StyledTooltip>
                            </TierLicense>
                        </TierPriceBlock>
                        <TierFeatures>
                            { !hideFreePlan && <Feature>
                                <em>All Hobbyist features, and:</em>
                            </Feature> }
                            <Feature>
                                <strong>In-depth HTTP debugging tools</strong>, including compression
                                & caching analysis
                            </Feature>
                            <Feature>
                                <strong>Validation & documentation for more than 1400 APIs</strong>,
                                from AWS to GitHub to Stripe
                            </Feature>
                            <Feature>
                                <strong>Automated HTTP mocking & rewriting</strong>, from fixed
                                responses to errors & timeouts
                            </Feature>
                            <Feature>
                                <strong>Import/export</strong> mock rules, and code or <a
                                    href="https://en.wikipedia.org/wiki/HAR_(file_format)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    HARs
                                </a> of collected traffic
                            </Feature>
                            <Feature>
                                <strong>Advanced customization</strong>, including port configuration,
                                whitelisted & client certificates, and UI themes
                            </Feature>
                            <Feature>
                                <strong>Support ongoing development!</strong>
                            </Feature>
                        </TierFeatures>
                        <PricingCTA>
                            { getPlanCta('pro') }
                        </PricingCTA>
                    </PricingTier>

                    <PricingTier highlighted={paidTier === 'team'}>
                        <TierHeader>
                            Team
                        </TierHeader>
                        <TierStatus>{ getPlanStatus('team') }</TierStatus>
                        <TierPriceBlock>
                            <TierPrice>{teamPrice} / user / month</TierPrice>

                            <TierPriceCaveats>
                                plus tax, paid {this.planCycle === 'annual' ? 'annually' : 'monthly'}
                            </TierPriceCaveats>

                            <TierLicense>
                                <StyledTooltip
                                    html={<TooltipUl>
                                        <li>One team account, with many linked individual users</li>
                                        <li>Subscription covers a max number of linked team members</li>
                                        <li>Add or remove members from your team as required</li>
                                    </TooltipUl>}>
                                    Team account <FontAwesomeIcon icon={['far', 'info-circle']} />
                                </StyledTooltip>
                            </TierLicense>
                        </TierPriceBlock>
                        <TierFeatures>
                            <Feature><em>All Professional features, and:</em></Feature>
                            <Feature><strong>Centralized billing</strong> to simplify payment for your team</Feature>
                            <Feature>Licensed to your team, rather than individuals</Feature>
                            <Feature>Add or remove team members whenever you need to</Feature>
                            <Feature><strong>Team workspaces</strong> for low-friction collaboration <em>(coming soon)</em></Feature>
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
                            { getPlanCta('team') }
                        </PricingCTA>
                    </PricingTier>
                </PricingTable>

                { user.email && <LogoutBlock>
                    Logged in as { user.email }. <LinkButton onClick={logOut}>Log out</LinkButton>.
                </LogoutBlock> }

                <PricingFooter>
                    Questions? <Link to="/docs/guides/subscription-faq/">Read the FAQ</Link> or <Link to="/contact/">Get in touch</Link>
                </PricingFooter>
            </PricingContainer>
            {
                (modal === 'checkout' && <ModalWrapper opacity={0.5}></ModalWrapper>) ||
                (!!modal && <ModalWrapper />)
            }
        </Layout>;
    }
}