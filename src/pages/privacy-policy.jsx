import React from 'react';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';

import { FullWidthSection }from '../components/full-width-section';

const SplashContainer = styled(FullWidthSection)`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;

    color: ${p => p.theme.mainColor};
    background-color: ${p => p.theme.mainBackground};
`;

const SplashHeader = styled.h1`
    ${p => p.theme.fontSizeUltraHeading};
    font-weight: bolder;

    margin: 60px 0;
`;

const PolicyDisclaimer = styled.div`
    ${p => p.theme.fontSizeSubheading};
    color: ${p => p.theme.mainColor};
    line-height: 1.25;

    ${media.desktop`
        width: 70%;
    `}

    > strong {
        color: ${p => p.theme.popColor};
    }

    margin: 0 0 20px;
`;

const Policy = styled.div`
    ${p => p.theme.fontSizeText};
    color: ${p => p.theme.mainColor};
    line-height: 1.25;

    ${media.desktop`
        width: 70%;
    `}

    h2 {
        ${p => p.theme.fontSizeHeading};
    }

    h2, h3 {
        color: ${p => p.theme.mainColor};
        font-weight: bold;
    }

    h2, h3 {
        margin: 30px 0;
    }

    ul {
        list-style: circle;
    }

    li {
        margin-left: 20px;
    }

    p, li {
        margin-bottom: 20px;
    }

    margin: 30px 0 60px;
`;

export default (props) => (<Layout location={props.location}>
    <SplashContainer>
        <SplashHeader>
            Privacy Policy
        </SplashHeader>
        <PolicyDisclaimer>
            The text below formally defines what data HTTP Toolkit collects, how HTTP Toolkit uses your data, and why.
        </PolicyDisclaimer>
        <PolicyDisclaimer>
            HTTP Toolkit does its best to avoid collecting data about you wherever possible. <strong>The content of your HTTP(S) requests & responses is never collected</strong>, and this is stored only locally on your machine. Users of HTTP Toolkit are typically completely anonymous, except for users who explicitly log into HTTP Toolkit accounts, and HTTP Toolkit takes efforts to preserve the anonymity of collected data wherever possible.
        </PolicyDisclaimer>
        <PolicyDisclaimer>
            If you have suggestions for ways to improve user privacy, let us know at <a href="https://github.com/httptoolkit/httptoolkit/issues/new/choose">github.com/httptoolkit/httptoolkit</a>. If you'd like to see exactly what data HTTP Toolkit collects up close, feel free to take a look at <a href="https://github.com/httptoolkit">the source</a> for yourself.
        </PolicyDisclaimer>
        <Policy>
            <h2>Our privacy policy</h2>

            <p>This privacy policy covers the httptoolkit.com website and related services, operated by Timothy Perry, trading as HTTP Toolkit ("us", "we", or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us using the details below.</p>

            <p>This policy applies to all information collected through use of our website, HTTP Tookit user accounts, the published HTTP Toolkit applications (the "Services"), any related services provided, and any other sales, marketing or events (referred to collectively in this privacy policy as the "Services").</p>

            <p>When you use our Services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy. We seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of the Services.</p>

            <h2>What information do we collect?</h2>

            <h3>Personal information you disclose to us</h3>

            <p>We collect personal information that you voluntarily provide to us when registering at the Services expressing an interest in obtaining information about us or our products and services, when participating in activities on the Services or otherwise contacting us.</p>

            <p>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect can include the following:</p>

            <ul>
                <li>Name and Contact Data. We may collect your first and last name, email address, postal address, phone number, and other similar contact data.</li>
                <li>Credentials. We may collect passwords, password hints, and similar security information used for authentication and account access.</li>
                <li>Payment Data. We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (such as a credit card number), and the security code associated with your payment instrument. All payment data is stored by our payment processor and you should review its privacy policies and contact the payment processor directly to respond to your questions. </li>
            </ul>

            <p>All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.</p>

            <h3>Information automatically collected</h3>

            <p>We automatically collect certain information when you visit, use or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.</p>

            <p>This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes. We will make best efforts to ensure this information is anonymous wherever possible.</p>

            <h2>How do we use your information?</h2>

            <p>In short: we process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>

            <p>We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests ("Business Purposes"), in order to enter into or perform a contract with you ("Contractual"), with your consent ("Consent"), and/or for compliance with our legal obligations ("Legal Reasons"). We indicate the specific processing grounds we rely on next to each purpose listed below.</p>

            <p>We use the information we collect or receive:</p>

            <ul>
                <li>To facilitate account creation and login processes.</li>
                <li>To send you marketing and promotional communications. We and/or our third party marketing partners may use the personal information you send to us for our marketing purposes, where you have consented to this marketing. You can opt-out of our marketing emails at any time.</li>
                <li>To send administrative information to you. We may use your personal information to send you necessary product and service information, and/or information about changes to our terms, conditions, and policies.</li>
                <li>To fulfill and manage your orders. We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>
                <li>To collect & request feedback. We may use your information in automated error reporting, to request feedback, or to contact you about your use of our Services.</li>
                <li>To enable user-to-user communications. We may use your information in order to enable user-to-user communications with each user's consent.</li>
                <li>To enforce our terms, conditions and policies.</li>
                <li>To respond to legal requests and prevent harm. If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.</li>
                <li>For other business purposes. We may use your information for other Business Purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Services and your experience.</li>
            </ul>

            <h2>Will your information be shared with anyone?</h2>

            <p>In short: we only share information with your consent, to comply with laws, to protect your rights, or to fulfill business obligations.</p>

            <h3>When could my data be shared?</h3>

            <p>We may process or share data based on the following legal basis:</p>

            <ul>
                <li>Consent: We may process your data if you have given us specific consent to use your personal information in a specific purpose.</li>
                <li>Legitimate Interests: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                <li>Performance of a Contract: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                <li>Legal Obligations: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                <li>Vital Interests: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
            </ul>

            <p>More specifically, we may need to process your data or share your personal information in the following situations:</p>

            <ul>
                <li>Vendors, Consultants and Other Third-Party Service Providers. We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. Unless described in this Policy, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.</li>
                <li>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </ul>

            <h3>With whom could my data be shared?</h3>

            <p>We only share and disclose your information with the following third parties. We have categorized each party so that you may be easily understand the purpose of our data collection and processing practices. If we have processed your data based on your consent and you wish to revoke your consent, please contact us.</p>

            <ul>
                <li>Mailchimp: for automated communications and marketing, if applicable</li>
                <li>Netlify: as part of our internal infrastructure</li>
                <li>Paddle: for purchases, invoicing and billing</li>
                <li>Auth0: for registration, authentication and storing data associated with your user account</li>
                <li>Google Analytics: for site and service event & error monitoring (anonymized)</li>
                <li>Sentry: for error reporting</li>
            </ul>

            <h2>How long do we keep your information?</h2>

            <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this policy will require us keeping your personal information for longer than 90 days past the termination of the user's account.</p>

            <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>

            <h2>How do we keep your information safe?</h2>

            <p>We have implemented appropriate technical and organisational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the services within a secure environment. </p>

            <h2>Do we collect information from minors?</h2>

            <p>We do not knowingly solicit data from or market to children under 13 years of age. By using the Services, you represent that you are at least 13 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services.</p>

            <p>If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 13, please contact us using the details below. </p>

            <h2>What are my privacy rights?</h2>

            <p>In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.</p>

            <p>If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal.</p>

            <p>If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" target="_blank" rel="noopener noreferrer">http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm</a>.</p>

            <h3>Account Information </h3>

            <p>If you would at any time like to review or change the information in your account or terminate your account, you can contact us using the contact information provided to do so.</p>

            <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.</p>

            <h3>Opting out of email marketing</h3>

            <p>You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list – however, we will still need to send you service-related emails that are necessary for the administration and use of your account.</p>

            <h3>Controls for Do-Not-Track features</h3>

            <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected.</p>

            <p>We will do our best to honor these signals where possible. As no uniform technology standard for recognizing and implementing DNT signals on all platforms has been finalized, we cannot guarantee that these will be honored in 100% of cases. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy. </p>

            <h3>Do California residents have specific privacy rights?</h3>

            <p>California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year.</p>

            <p>If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>

            <h2>Will this policy change in future?</h2>

            <p>We may update this privacy policy from time to time. The updated version will be effective as soon as it is accessible.</p>

            <p>If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>

            <h2>How can you contact us?</h2>

            <p>If you have questions or comments about this policy, you may email us at privacy@httptoolkit.com, or by post to:</p>

            <p>
                Tim Perry<br/>
                Betahaus<br/>
                Carrer de Vilafranca 7<br/>
                Barcelona 08024<br/>
                Spain
            </p>
        </Policy>
    </SplashContainer>
</Layout>);