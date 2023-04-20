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
import { SubscriptionPlans } from '../accounts/subscriptions';

import { Layout } from '../components/layout';
import { FullWidthSection } from '../components/full-width-section';
import { Button, ButtonLink } from '../components/form';
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

    padding-bottom: 90px;
`;

const PricingHeader = styled.h1`
    ${p => p.theme.fontSizeHeading};
    font-weight: bolder;
    line-height: 1.2;

    text-align: center;
    margin: 60px 0 20px;

    ${media.mobileOrTablet`
        margin: 30px auto 25px;
    `}
`;

const PricingIntroText = styled.p`
    ${p => p.theme.fontSizeSubheading};

    width: 100%;
    max-width: 584px;
    text-align: center;
    margin: 40px auto 0;

    line-height: 1.3;

    ${media.mobileOrTablet`
        margin: 30px auto 0;
    `}

    > strong {
        font-weight: bold;
        color: ${p => p.theme.mainColor};
    }

    [data-icon=bolt] {
        color: #f1971f;
    }
`;

const PlanCycleToggle = styled.button`
    background: none;
    border: none;

    margin: 40px auto 50px;

    ${media.mobileOrTablet`
        margin: 30px auto 10px;
    `}

    font-family: Lato, Arial, sans-serif;
    ${p => p.theme.fontSizeSubheading};
    color: ${p => p.theme.mainColor};

    display: flex;
    align-items: center;
    flex-direction: row;

    cursor: pointer;

    @supports selector(:focus-visible) {
        &:focus:not(:focus-visible) {
            outline: none;
        }
    }

    > svg {
        margin: 0 10px;
        z-index: 1;
    }
`;

const PlanCycle = styled.span`
    padding: 10px;
    border-radius: 8px;

    &:first-child {
        padding-right: 40px;
        margin-right: -40px;
    }

    &:last-child {
        padding-left: 40px;
        margin-left: -40px;
    }

    ${p => p.selected && css`
        background-color: ${p => p.theme.mainBackground};
        border-bottom: 3px solid ${p => p.theme.containerBorder};
        box-shadow: 0 4px 10px 0 rgba(0,0,0,0.1);
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

    ${media.desktop`
        flex: 1 1 100%;

        ${p => p.highlighted && css`
            flex-basis: 104%;
        `}

        ${p => p.lowlighted && css`
            align-self: flex-start;
            flex-basis: 93%;
            margin-right: 25px;
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

    ${p => p.lowlight
        ? css`
            color: ${p => p.theme.mainColor};
        `
        : css`
            color: ${p => p.theme.popColor};
        `
    }

    text-align: center;
    font-weight: bold;
    ${p => p.theme.fontSizeNearlyHeading};
`;

const TierStatus = styled.div`
    width: 100%;
    min-height: 30px;
    padding: 0;
    text-align: center;

    color: ${p => p.theme.mainColor};
    ${p => p.theme.fontSizeText};
    opacity: 0.6;

    &:empty {
        display: none;
    }
`;

const TierPriceBlock = styled.div`
    text-align: center;
    font-size: 18pt;
    padding: 15px 0;

    color: ${p => p.theme.mainColor};
    margin: 0 20px;

    &:empty {
        padding: 0 0 10px;
    }
`;

const TierPrice = styled.span`
    font-weight: bold;
`;

const TierPriceCaveats = styled.small`
    display: block;
    font-size: 60%;
    opacity: 0.7;
    margin-top: 3px;
`;

const TierLicense = styled.div`
    display: block;
    margin-top: 10px;
    text-align: center;
    ${p => p.theme.fontSizeSubheading};
`;

const TierFeatures = styled.ul`
    padding: 0 20px 20px 20px;
    ${p => p.theme.fontSizeText};
`;

const Feature = styled.li`
    margin-top: 20px;
    line-height: 1.2;

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

const FeatureCont = styled(Feature)`
    font-style: italic;
    text-align: center;
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
    margin-bottom: 10px;

    > * {
        font-weight: bold;
        text-align: center;
        width: 100%
    }
`;

const CTAInstructions = styled.div`
    width: 100%;
    text-align: center;
    padding: 0 0 10px;

    ${media.desktop`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    `};

    ${media.mobileOrTablet`
        padding-top: 20px;
        ${p => p.theme.fontSizeText};
    `}
`;

const ExistingAccountBlock = styled.div`
    margin-top: 30px;
    width: 100%;
    text-align: center;
    padding: 10px 0 0;

    ${p => p.theme.fontSizeTinyText};

    p {
        margin-bottom: 10px;
    }

    button {
        ${p => p.theme.fontSizeTinyText};
        margin: 0 5px;
        padding: 5px 10px;
    }
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
        const sku = this.account.getSKU(tierCode, this.planCycle);
        const plan = SubscriptionPlans[sku];
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

        if (this.account.waitingForPurchase === tierCode) {
            return <Button>
                <FontAwesomeIcon icon={['fas', 'spinner']} spin />
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
        const { user, isPaidUser, modal, login } = this.account;
        const { paidTier } = this.account.subscription;

        const visibilityProps = getVisibilityProps(!!modal);

        const spinner = <FontAwesomeIcon icon={['fas', 'spinner']} spin />;
        const proPrice = getPlanMonthlyPrice('pro') || spinner;
        const teamPrice = getPlanMonthlyPrice('team') || spinner;

        return <Layout location={this.props.location} modalIsActive={!!modal}>
            <Helmet>
                <title>Pricing | HTTP Toolkit</title>
            </Helmet>
            <PricingContainer {...visibilityProps}>
                <PricingHeader>
                    Developer tools<br/>built for professionals
                </PricingHeader>

                <PricingIntroText>
                    <strong>Your time is valuable</strong>. HTTP Toolkit gives you instant insight
                    and access into every request & response, with zero hassle. Test clients, debug
                    APIs and catch bugs, all at lightning speed.
                </PricingIntroText>

                <PricingIntroText>
                    <strong>
                        Have questions? <a
                            href='/docs/guides/subscription-faq/'
                            target="_blank"
                            rel='noopener noreferrer'
                        >Read the FAQ</a> or <Link to="/contact/">get in touch</Link>.
                    </strong>
                </PricingIntroText>

                <PlanCycleToggle onClick={toggleCycle}>
                    <PlanCycle selected={planCycle === 'monthly'}>Monthly</PlanCycle>

                    <FontAwesomeIcon icon={['fas', planCycle === 'annual' ? 'toggle-on' : 'toggle-off']} />

                    <PlanCycle selected={planCycle === 'annual'}>Annual</PlanCycle>
                </PlanCycleToggle>

                <PricingTable>
                    { !hideFreePlan && <PricingTier lowlighted={true} mobileOrder={3}>
                        <TierHeader lowlight={true}>
                            Hobbyist
                        </TierHeader>
                        <TierStatus/>
                        <TierLicense>Free</TierLicense>
                        <TierPriceBlock />
                        <TierFeatures>
                            <FeatureCont>
                                Includes all the basic features you need to start viewing &
                                rewriting your HTTP traffic:
                            </FeatureCont>
                            <Feature>
                                Automatically intercept all supported clients
                            </Feature>
                            <Feature>
                                Inspect and debug raw HTTP data
                            </Feature>
                            <Feature>
                                Filter, delete & pin requests
                            </Feature>
                            <Feature>
                                Manually rewrite HTTP with request & response breakpoints
                            </Feature>
                        </TierFeatures>
                    </PricingTier> }

                    <PricingTier highlighted={true} lowlighted={isPaidUser && paidTier !== 'pro'}>
                        <TierHeader>
                            Professional
                        </TierHeader>
                        <TierStatus>{ getPlanStatus('pro') }</TierStatus>
                        <TierLicense>
                            <StyledTooltip
                                html={<TooltipUl>
                                    <li>Unlimited devices</li>
                                    <li>Can only be used by one person</li>
                                    <li>Not transferrable between people</li>
                                </TooltipUl>}>
                                Personal user account <FontAwesomeIcon icon={['fas', 'info-circle']} />
                            </StyledTooltip>
                        </TierLicense>
                        <TierPriceBlock>
                            <TierPrice>{proPrice} / month</TierPrice>

                            <TierPriceCaveats>
                                plus local tax, paid {this.planCycle === 'annual' ? 'annually' : 'monthly'}
                            </TierPriceCaveats>
                        </TierPriceBlock>
                        <PricingCTA>
                            { getPlanCta('pro') }
                        </PricingCTA>
                        <TierFeatures>
                            { !hideFreePlan && <FeatureCont>
                                All Hobbyist features, plus...
                            </FeatureCont> }
                            <Feature>
                                <strong>Automated HTTP mocking & rewriting</strong> including traffic redirection,
                                mock responses, and errors & timeouts.
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
                                <strong>Advanced HTTP debugging and inspection</strong> including compression
                                & caching analysis
                            </Feature>
                            <Feature>
                                <strong>Validation &amp; API documentation for 2600+ built-in APIs</strong>,
                                from AWS to GitHub to Stripe, plus your own custom <a
                                    href="https://swagger.io/docs/specification/about/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >OpenAPI</a> specs.
                            </Feature>
                            <Feature>
                                <strong>Advanced customization</strong> including UI themes,
                                whitelisted & client certificates, ports, and upstream proxies.
                            </Feature>
                            <Feature>
                                <strong>Support ongoing development!</strong>
                            </Feature>
                        </TierFeatures>
                    </PricingTier>

                    <PricingTier highlighted={paidTier === 'team'}>
                        <TierHeader>
                            Team
                        </TierHeader>
                        <TierStatus>{ getPlanStatus('team') }</TierStatus>
                        <TierLicense>
                            <StyledTooltip
                                html={<TooltipUl>
                                    <li>One team account, with many linked individual users</li>
                                    <li>Subscription covers a max number of linked team members</li>
                                    <li>Add or remove members from your team as required</li>
                                </TooltipUl>}>
                                Team account <FontAwesomeIcon icon={['fas', 'info-circle']} />
                            </StyledTooltip>
                        </TierLicense>
                        <TierPriceBlock>
                            <TierPrice>{teamPrice} / user / month</TierPrice>

                            <TierPriceCaveats>
                                plus local tax, paid {this.planCycle === 'annual' ? 'annually' : 'monthly'}
                            </TierPriceCaveats>
                        </TierPriceBlock>
                        <PricingCTA>
                            { getPlanCta('team') }
                        </PricingCTA>
                        <TierFeatures>
                            <FeatureCont>All Professional features, plus...</FeatureCont>
                            <Feature><strong>Centralized billing</strong> to simplify payment for your team</Feature>
                            <Feature>Licensed to your team, not permanently linked to individuals</Feature>
                            <Feature><strong>Centralized control</strong> to easily manage your team members and subscription</Feature>
                            <Feature><strong>Team workspaces</strong> for low-friction collaboration <em>(coming soon)</em></Feature>
                            <Feature>
                                Options available on request:
                                <ul>
                                    <li>Fixed-term bespoke licensing</li>
                                    <li>Private support</li>
                                    <li>Self-hosted infrastructure</li>
                                    <li>Training & consultancy</li>
                                    <li>Bulk discounts</li>
                                </ul>
                            </Feature>
                        </TierFeatures>
                    </PricingTier>
                </PricingTable>

                { user.email && user.subscription ?
                    <ExistingAccountBlock>
                        <p>Logged in as { user.email }.</p>
                        <p>
                            To manage your account please visit log into your dashboard at <a
                                href="https://accounts.httptoolkit.tech/"
                            >accounts.httptoolkit.tech</a>.
                        </p>
                        <Button onClick={logOut}>Log out</Button>
                    </ExistingAccountBlock>
                    : <ExistingAccountBlock>
                        Want to manage an existing account? Log into your dashboard at <a
                            href="https://accounts.httptoolkit.tech/"
                        >accounts.httptoolkit.tech</a>.
                    </ExistingAccountBlock>
                }
            </PricingContainer>
            {
                (modal === 'checkout' && <ModalWrapper opacity={0.5}></ModalWrapper>) ||
                (!!modal && <ModalWrapper />)
            }
        </Layout>;
    }
}