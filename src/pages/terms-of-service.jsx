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

const TermsDisclaimer = styled.div`
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

const Terms = styled.div`
    ${p => p.theme.fontSizeText};
    color: ${p => p.theme.mainColor};
    line-height: 1.25;

    ${media.desktop`
        width: 70%;
    `}

    h1 {
        ${p => p.theme.fontSizeHeading};
    }

    h1, h2 {
        font-weight: bold;
    }

    h1, h2 {
        margin: 30px 0;
    }

    p {
        margin-bottom: 20px;
    }

    margin: 30px 0 60px;
`;

export default (props) => (<Layout location={props.location}>
    <SplashContainer>
        <SplashHeader>
            Terms Of Service
        </SplashHeader>
        <TermsDisclaimer>
            There's some legal text below which formally defines how you're allowed to use HTTP Toolkit, this website, and your HTTP Toolkit user account. It looks serious, but it's all fairly standard boilerplate.
        </TermsDisclaimer>
        <TermsDisclaimer>
            The rules here apply if you're using the hosted services (e.g. httptoolkit.com and app.httptoolkit.tech) and user accounts, or the published application binaries. This does not limit your open-source freedoms, and if you're building HTTP Toolkit yourself on your own infrastructure then only the open-source licenses apply.
        </TermsDisclaimer>
        <TermsDisclaimer>
            Note that the binaries specifically are dual-licensed: they're available under either the <a href="https://github.com/httptoolkit/httptoolkit-desktop/blob/master/LICENSE">AGPL v3</a>, guaranteeing open-source freedoms within the constraints of AGPL, or under the <a href="https://creativecommons.org/licenses/by-nd/4.0/">Creative Commons BY-ND license</a>, allowing unencumbered licensing for simple unmodified use.
        </TermsDisclaimer>
        <Terms>
            <h1>Terms of Service ("Terms")</h1>

            <p>Please read these Terms of Service ("Terms", "Terms of Service", "Terms of Use") carefully before using the httptoolkit.com website, any HTTP Tookit user accounts, or the published HTTP Toolkit applications (the "Services") operated by Timothy Perry, trading as HTTP Toolkit ("us", "we", or "our").</p>

            <p>Your access to and use of the Services is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Services.</p>

            <p>By accessing or using the Services you agree to be bound by these Terms. If you disagree with any part of the terms please do not access the Services.</p>

            <h2>Use License</h2>

            <p>All materials provided through the Services are the copyright of HTTP Toolkit, except where explicitly stated. The name, logos and trademarks of HTTP Toolkit may not be used outside of the terms provided without explicit approval from HTTP Toolkit.</p>

            <p>The licenses for the source code of open-source software distributed and referenced within the Services is documented primarily by the source code of that software, and the terms here do not limit or otherwise affect those licenses.</p>

            <p>The HTTP Toolkit application downloadable from httptoolkit.com may be used under the terms of one of two possible licenses: the GNU Affero General Public License v3.0 (AGPL-3.0) or the Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) license, according to your needs.</p>

            <p>Other product and company names, brands or logos used within the Services are the property of their respective owners, and are used for identification purposes only. Use of these marks does not imply endorsement. Unless you inform us otherwise, you allow HTTP Toolkit to use your company name and logo, exclusively to identify your organization as a user of HTTP Toolkit, without implying any further endorsement or relationship. To opt out of this, please contact us and we'll ensure your name and logo is never used in any future HTTP Toolkit materials, and is removed from any in which they currently appear.</p>

            <h2>Warranties and Liability</h2>

            <p>The Services are provided on an "as is", "as available" basis, without representations of warranties of any kind, to the fullest extent permitted by law. We specifically dislaim all warranties and conditions, expressed or implied. Furthermore, we do not make any representations concerning the accuracy or reliability of the use of the materials on the Services or otherwise relating to such materials or any sites linked to these Services. HTTP Toolkit shall not have any liability or responsibility for errors or omissions in the Services, errors or omissions caused by your use of the Services, or any other damages you may incur in connection with the Services.</p>

            <p>HTTP Toolkit or our suppliers will not be hold accountable for any damages that will arise with the use or inability to use the Services, even if we or our authorized representative has been notified, orally or written, of the possibility of such damage.</p>

            <p>In some jurisdictions there may be limitations on these limitations, and they may not fully apply. In this case, all other remaining limitations of liability and warranty will continue to apply in full.</p>

            <h2>Purchases</h2>

            <p>Our order process is conducted by our online reseller <a href="http://paddle.com">Paddle.com</a>. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.</p>

            <h2>User Accounts</h2>

            <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Services.</p>

            <p>'Professional' accounts are licensed to a individual person (the main owner of the email address used). They may only be used by that individual, and must not be shared. We reserve the right to terminate accounts where there is clear evidence that they're being shared between multiple individuals, although we will make best efforts to make contact with the account owner before doing so.</p>

            <p>'Team' accounts include many licenses. These licenses can each be linked to individual team members, and may transferred between team members. Only the individuals currently linked to the team account may use the features of the account. Each license may only be transferred once every 48 hours.</p>

            <p>Both Professional and Team accounts grant the individuals included in the license access to advanced features of HTTP Toolkit, as described on <a href="https://httptoolkit.com/pricing/">our pricing page</a>. Access to these features is contingent on a corresponding active subscription. You agree not to access or attempt to access any such features at any time when you are not personally included in an active subscription.</p>

            <p>Account subscriptions may be cancelled at any time, either from the Settings page within the tool (for Professional accounts), from the <a href="https://accounts.httptoolkit.tech/">team management dashboard</a> (for Team accounts), or by contacting us or Paddle.com directly. Once cancelled, the subscription will remain active until the end of the previously purchased period, and will then expire without further renewal.</p>

            <p>Customer support in using HTTP Toolkit may be provided at our discretion, but neither license guarantees such support or any specific level or response time of customer service, unless agreed separately.</p>

            <p>You are responsible for safeguarding your HTTP Toolkit user account, and for any activities or actions taken using that account.</p>

            <p>You agree not to share your user account with any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

            <h2>Links To Other Web Sites</h2>

            <p>Our Services may contain links to third-party web sites or services that are not owned or controlled by HTTP Toolkit.</p>

            <p>HTTP Toolkit has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that HTTP Toolkit shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

            <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>

            <h2>Termination</h2>

            <p>We may terminate or suspend access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>

            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

            <p>Upon termination, your right to use the Services will immediately cease. If you wish to terminate your account, you may simply discontinue using the Services.</p>

            <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>

            <h2>Governing Law</h2>

            <p>These Terms shall be governed and construed in accordance with the laws of Spain, without regard to its conflict of law provisions.</p>

            <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Services, and supersede and replace any prior agreements we might have between us regarding the Services.</p>

            <h2>Changes</h2>

            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 15 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

            <p>By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Services.</p>

            <h2>Contact Us</h2>

            <p>If you have any questions about these Terms, please contact us.</p>
        </Terms>
    </SplashContainer>
</Layout>);