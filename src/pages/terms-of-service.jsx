import React from 'react';

import { styled, media } from '../styles';

import { Layout } from '../components/layout';

import FullWidthSection from '../components/full-width-section';

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
    color: ${p => p.theme.mainSubtleColor};
    line-height: 1.25;

    ${media.desktop`
        width: 70%;
    `}

    h1 {
        ${p => p.theme.fontSizeHeading};
    }

    h1, h2 {
        color: ${p => p.theme.mainColor};
        font-weight: bold;
    }

    h1, h2 {
        margin: 30px 0;
    }

    p {
        margin-bottom: 10px;
    }

    margin: 30px 0 60px;
`;

export default () => (<Layout>
    <SplashContainer>
        <SplashHeader>
            Terms Of Service
        </SplashHeader>
        <TermsDisclaimer>
            There's some legal text below which formally defines how you're allowed to use HTTP Toolkit, this website, and your HTTP Toolkit user account. It looks serious, but it's all fairly standard boilerplate.
        </TermsDisclaimer>
        <TermsDisclaimer>
            It's important to note that these terms don't limit your open-source freedoms, as defined in the relevant project licenses. The below only applies to the hosted service (e.g. <a href="https://httptoolkit.tech">httptoolkit.tech</a> and <a href="https://app.httptoolkit.tech">app.httptoolkit.tech</a>) and user accounts.
        </TermsDisclaimer>
        <TermsDisclaimer>
            If you're building & hosting HTTP Toolkit yourself, without using these services, only the open-source licenses apply.
        </TermsDisclaimer>
        <Terms>
            <h1>Terms of Service ("Terms")</h1>

            <p>Please read these Terms of Service ("Terms", "Terms of Service", "Terms of Use") carefully before using the httptoolkit.tech website, any HTTP Tookit user accounts, or the published HTTP Toolkit applications (the "Services") operated by Timothy Perry, trading as HTTP Toolkit ("us", "we", or "our").</p>

            <p>Your access to and use of the Services is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Services.</p>

            <p>By accessing or using the Services you agree to be bound by these Terms. If you disagree with any part of the terms please do not access the Services.</p>

            <h2>Use License</h2>

            <p>All materials provided through the Services are the copyright of HTTP Toolkit, except where explicitly stated. The name, logos and trademarks of HTTP Toolkit may not be used outside of the terms provided without explicit approval from HTTP Toolkit.</p>

            <p>Other product and company names, brands or logos used within the Services are the property of their respective owners, and are used for identification purposes only. Use of these marks does not imply endorsement.</p>

            <h2>Warranties and Liability</h2>

            <p>The Services are provided on an "as is", "as available" basis, without representations of warranties of any kind, to the fullest extent permitted by law. We specifically dislaim all warranties and conditions, expressed or implied. Furthermore, we do not make any representations concerning the accuracy or reliability of the use of the materials on the Services or otherwise relating to such materials or any sites linked to these Services. HTTP Toolkit shall not have any liability or responsibility for errors or omissions in the Services, errors or omissions caused by your use of the Services, or any other damages you may incur in connection with the Services.</p>

            <p>HTTP Toolkit or our suppliers will not be hold accountable for any damages that will arise with the use or inability to use the Services, even if we or our authorized representative has been notified, orally or written, of the possibility of such damage.</p>

            <p>In some jurisdictions there may be limitations on these limitations, and they may not fully apply. In this case, all other remaining limitations of liability and warranty will continue to apply in full.</p>

            <h2>User Accounts</h2>

            <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Services.</p>

            <p>Access to some tiers of account is contingent on a corresponding active subscription, as shown on <a href="https://httptoolkit.tech/pricing">our pricing page</a>. You agree not to access or attempt to access any account tier at any time when you are not personally included in an active subscription.</p>

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