import * as _ from 'lodash';
import React from 'react';
import { Link } from 'gatsby';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { flow, action, observable, computed } from 'mobx';
import { observer } from 'mobx-react';

import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

import { styled, media, css } from '../styles';
import { delay } from '../util';

import { showLoginDialog, logOut, getLastUserData, getLatestUserData, loginEvents } from '../accounts/auth';
import { openCheckout, SubscriptionPlans } from '../accounts/subscriptions';

import { Layout } from '../components/layout';
import FullWidthSection from '../components/full-width-section';
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

    > * {
        text-align: center;
        width: 100%
    }
`;

const CTAInstructions = styled.div`
    width: 100%;
    text-align: center;
    padding: 0 0 10px;
    color: ${p => p.theme.primaryColor};

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

        // Update account data automatically on login, logout & every 10 mins
        loginEvents.on('authenticated', async () => {
            await this.updateUser();
            loginEvents.emit('user_data_loaded');
        });
        loginEvents.on('logout', this.updateUser);
        setInterval(this.updateUser, 1000 * 60 * 10);
        this.updateUser();
    }

    @observable
    modal = null;

    @observable
    waitingForPurchase = false;

    @observable
    user = getLastUserData();

    updateUser = flow(function * () {
        this.user = yield getLatestUserData();
    }.bind(this));

    @computed get isLoggedIn() {
        return !!this.user.email;
    }

    @computed get isPaidUser() {
        // Set with the last known active subscription details
        const subscriptionExpiry = _.get(this, 'user.subscription.expiry');

        return !!subscriptionExpiry && subscriptionExpiry.valueOf() > Date.now();
    }

    @computed get subscription() {
        if (!this.isPaidUser) return {};

        const [ paidTier, paidCycle ] = this.user.subscription.plan.split('-');
        return { paidTier, paidCycle };
    }

    buyPlan = flow(function * (tierCode) {
        this.reportPlanSelected(tierCode);
        const planCode = this.getPlanCode(tierCode);

        if (!this.isLoggedIn) {
            this.modal = 'login';
            yield showLoginDialog();
        }

        if (!this.isLoggedIn || this.isPaidUser) {
            // Login cancelled or failed, or they have a plan already
            this.modal = null;
            return;
        }

        this.modal = 'checkout';
        const purchased = yield openCheckout(this.user.email, planCode);
        this.modal = null;

        if (!purchased) return;
        this.waitingForPurchase = tierCode;

        yield this.updateUser();
        while (!this.isPaidUser) {
            yield delay(1000);
            yield this.updateUser();
        }

        this.waitingForPurchase = false;
    }.bind(this));

    reportPlanSelected(planName) {
        if (window.ga) {
            window.ga('send', 'event', {
                eventCategory: 'plan',
                eventAction: 'select',
                eventLabel: _.upperFirst(planName), // For historical reasons
            });
        }
    }

    @observable
    planCycle = this.subscription.paidCycle || 'annual';

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

    getPlanStatus = (tierCode) => {
        const { paidTier, paidCycle } = this.subscription;

        if (paidTier !== tierCode) return;

        return paidCycle === this.planCycle ? 'Active' : `Active (${paidCycle})`;
    }

    getPlanCta = (tierCode) => {
        const { paidTier, paidCycle } = this.subscription;

        if (tierCode === 'free') {
            return <DownloadWidget small sendToEmailText={'On mobile, but want to try it on your computer later?'} />;
        } else if (this.waitingForPurchase === tierCode) {
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
                    <ButtonLink to='/contact'>
                        Change to {this.planCycle}
                    </ButtonLink>
                </>;
            }
        } else {
            if (tierCode === 'pro') {
                return <Button onClick={() => this.buyPlan('pro')}>
                    Buy Pro
                </Button>;
            } else if (tierCode === 'team') {
                return <ButtonLink to='/contact' onClick={() => this.reportPlanSelected('team')}>
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
            modal,
            getPlanCta,
            user,
            isPaidUser,
            getPlanStatus
        } = this;

        const visibilityProps = getVisibilityProps(!!modal);

        const spinner = <FontAwesomeIcon icon={['fal', 'spinner']} spin />;
        const proPrice = getPlanMonthlyPrice('pro') || spinner;
        const teamPrice = getPlanMonthlyPrice('team') || spinner;

        const { paidTier } = this.subscription;

        return <Layout modalIsActive={!!modal}>
            <PricingContainer {...visibilityProps}>
                <PricingHeader>
                    Pricing
                </PricingHeader>

                <PlanCycleToggle onClick={toggleCycle}>
                    <PlanCycle selected={planCycle === 'monthly'}>Monthly</PlanCycle>

                    <FontAwesomeIcon icon={['fas', planCycle === 'annual' ? 'toggle-on' : 'toggle-off']} />

                    <PlanCycle selected={planCycle === 'annual'}>Annual</PlanCycle>
                </PlanCycleToggle>

                <PricingTable>
                    <PricingTier lowlighted={isPaidUser} mobileOrder={3}>
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
                            <Feature>
                                All essential HTTP interception and debugging features
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
                            { getPlanCta('free') }
                        </PricingCTA>
                    </PricingTier>

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
                            <Feature>
                                <em>All Hobbyist features, and:</em>
                            </Feature>
                            <Feature>
                                In-depth debugging integrations for 1400+ APIs,
                                including AWS, Github and Stripe
                            </Feature>
                            <Feature>
                                Detailed performance, caching & compression analysis & warnings
                            </Feature>
                            <Feature>
                                Light, dark & high-contrast UI themes
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
                                        <li>One team account, with many linked individual accounts</li>
                                        <li>Subscription covers a max number of concurrent team members</li>
                                        <li>Add or remove user accounts from the team as required</li>
                                    </TooltipUl>}>
                                    Team account <FontAwesomeIcon icon={['far', 'info-circle']} />
                                </StyledTooltip>
                            </TierLicense>
                        </TierPriceBlock>
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
                            { getPlanCta('team') }
                        </PricingCTA>
                    </PricingTier>
                </PricingTable>

                { user.email && <LogoutBlock>
                    Logged in as { user.email }. <LinkButton onClick={logOut}>Log out</LinkButton>.
                </LogoutBlock> }

                <PricingFooter>
                    Questions? <Link to="/contact">Get in touch</Link>
                </PricingFooter>
            </PricingContainer>
            {
                (modal === 'checkout' && <ModalWrapper opacity={0.5}></ModalWrapper>) ||
                (!!modal && <ModalWrapper />)
            }
        </Layout>;
    }
}