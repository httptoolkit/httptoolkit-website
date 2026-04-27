'use client';

import { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';
import { Button } from '@/components/elements/button';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { Spinner } from '@/components/elements/icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ContactForm } from '@/components/sections/contact-form';
import { SuccessHero } from '@/components/sections/success-hero';
import { accountStore } from '@/lib/store/account-store';

const ACCOUNTS_API_BASE = process.env.NEXT_PUBLIC_ACCOUNTS_API
  ?? 'https://accounts.httptoolkit.tech/api';

type PageState =
  | 'initial'
  | 'verifying'
  | 'success'
  | 'not_academic'
  | 'already_active'
  | 'paid_account'
  | 'error';

interface VerificationResult {
  school?: string;
  expiry?: number;
}

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
  max-width: 620px;
  margin: 0 auto;
`;

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 48px;
    height: 48px;
    animation: student-spin 1s linear infinite;
  }

  @keyframes student-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const StyledGradientLeft = styled.div`
  position: absolute;
  max-width: 100%;
  top: -180px;
  left: 0;
  height: 780px;
  pointer-events: none;

  @media (min-width: ${screens['lg']}) {
    top: -7px;
  }
`;

const StyledFallbackWrapper = styled.div`
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
`;

function getAccessToken(): string | undefined {
  // Read directly from localStorage because @httptoolkit/accounts does not
  // export its internal getToken() helper. This mirrors how the package
  // itself stores and reads tokens (see auth.js line 34).
  try {
    const raw = localStorage.getItem('tokens');
    if (!raw) return undefined;
    return JSON.parse(raw)?.accessToken;
  } catch {
    return undefined;
  }
}

function formatExpiry(timestamp?: number): string {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const StudentAccountContent = observer(() => {
  const [pageState, setPageState] = useState<PageState>('initial');
  const [result, setResult] = useState<VerificationResult>({});
  const [errorMessage, setErrorMessage] = useState('');

  const requestStudentAccount = useCallback(async () => {
    setPageState('verifying');

    const accessToken = getAccessToken();
    if (!accessToken) {
      setPageState('error');
      setErrorMessage('No authentication token found. Please try logging in again.');
      return;
    }

    try {
      const response = await fetch(`${ACCOUNTS_API_BASE}/request-student-account`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setResult({ school: data.school, expiry: data.expiry });
        setPageState('success');
      } else if (data?.error === 'not_academic') {
        setPageState('not_academic');
      } else if (data?.error === 'already_active') {
        setResult({ expiry: data.expiry });
        setPageState('already_active');
      } else if (data?.error === 'paid_account') {
        setResult({ expiry: data.expiry });
        setPageState('paid_account');
      } else {
        setPageState('error');
        setErrorMessage('Something went wrong. Please try again later or contact help@httptoolkit.com for support.');
      }
    } catch {
      setPageState('error');
      setErrorMessage('Could not reach the server. Please check your connection and try again.');
    }
  }, []);

  useEffect(() => {
    if (accountStore.isLoggedIn && pageState === 'initial') {
      requestStudentAccount();
    }
  }, [accountStore.isLoggedIn, pageState, requestStudentAccount]);

  const handleLoginClick = useCallback(() => {
    accountStore.login();
  }, []);

  return (
    <>
      <StyledGradientLeft>
        <Gradient />
      </StyledGradientLeft>

      {pageState === 'initial' && (
        <StyledPageWrapper>
          <Stack gap="24px">
            <Heading fontSize="l" color="textGradient">
              Student Discount
            </Heading>
            <Text fontSize="m">
              HTTP Toolkit Pro is free for any students or faculty at accredited universities and
              colleges who can't afford a paid subscription. Log in with your academic email
              address (.edu, .ac.uk, etc.) to get started. Your access lasts one year and
              can be renewed for as long as you're still studying.
            </Text>
          </Stack>
          <Button onClick={handleLoginClick} variant="primary">
            Log in with your academic email
          </Button>
        </StyledPageWrapper>
      )}

      {pageState === 'verifying' && (
        <StyledPageWrapper>
          <Stack gap="24px">
            <Heading fontSize="l" color="textGradient">
              Verifying your email...
            </Heading>
            <Text fontSize="m">
              Checking whether your email is associated with an academic institution.
            </Text>
          </Stack>
          <StyledSpinner>
            <Spinner />
          </StyledSpinner>
        </StyledPageWrapper>
      )}

      {pageState === 'success' && (
        <SuccessHero
          heading="You're all set!"
          excerpt={
            <Stack gap="16px">
              <Text fontSize="m">
                Your academic email has been verified
                {result.school ? ` (${result.school})` : ''} and
                your HTTP Toolkit Pro account is now active
                {result.expiry ? ` until ${formatExpiry(result.expiry)}` : ' for one year'}.
                When your access expires, come back to this page to renew it for another year.
              </Text>
              <Text fontSize="m">
                Download HTTP Toolkit, and click 'Get Pro' then 'Log into existing account'
                to get started with your student account.
              </Text>
            </Stack>
          }
          callToAction={
            <Button href="/download/" variant="primary">
              Download HTTP Toolkit
            </Button>
          }
        />
      )}

      {pageState === 'already_active' && (
        <SuccessHero
          heading="Already active"
          excerpt={<>
            <Text fontSize="m">
              You already have an student account{
                result.expiry
                ? `, active until ${formatExpiry(result.expiry)}`
                : ` that's currently active`
              }.
            </Text>
            <Text fontSize="m">
              You can renew when less than 2 months remain. To use your existing account, download HTTP
              Toolkit, and click 'Get Pro' then 'Log into existing account'.
            </Text>
          </>}
          callToAction={
            <Button href="/download/" variant="primary">
              Download HTTP Toolkit
            </Button>
          }
        />
      )}

      {pageState === 'paid_account' && (
        <SuccessHero
          heading="Already active"
          excerpt={<>
            <Text fontSize="m">
              You already have a paid account{
                result.expiry
                ? `, active until ${formatExpiry(result.expiry)}`
                : ` that's currently active`
              }.
            </Text>
            <Text fontSize="m">
              To use your existing account and manage your subscription, download HTTP Toolkit,
              and click 'Get Pro' then 'Log into existing account'. To request a
              student account, please cancel your existing subscription and try again.
            </Text>
          </>}
          callToAction={
            <Button href="/download/" variant="primary">
              Download HTTP Toolkit
            </Button>
          }
        />
      )}

      {pageState === 'not_academic' && (
        <StyledFallbackWrapper>
          <Stack gap="32px">
            <StyledPageWrapper>
              <Stack gap="24px">
                <Heading fontSize="l" color="textGradient">
                  Email not recognized
                </Heading>
                <Text fontSize="m">
                  We couldn't match your email ({accountStore.user.email}) to any known
                  academic institution. If you believe this is a mistake, use the form below to
                  contact us and we'll review it manually. Please include verifiable details about
                  your academic situation in your message for verification.
                </Text>
              </Stack>
            </StyledPageWrapper>

            <ContactForm
              action={`${ACCOUNTS_API_BASE}/contact-form`}
              submitLabel="Submit request"
              placeholders={{
                email: 'e.g. holly.smith@university.edu',
                message: "Tell us about your institution and why you'd like a student account...",
              }}
              defaultValues={{
                email: accountStore.user.email,
                message: `I'd like to request a student account. My academic email (${accountStore.user.email || ''}) was not automatically recognized.`,
              }}
            />
          </Stack>
        </StyledFallbackWrapper>
      )}

      {pageState === 'error' && (
        <StyledPageWrapper>
          <Stack gap="24px">
            <Heading fontSize="l" color="textGradient">
              Something went wrong
            </Heading>
            <Text fontSize="m">
              {errorMessage}
            </Text>
          </Stack>
          <Button onClick={() => setPageState('initial')} variant="secondary">
            Try again
          </Button>
        </StyledPageWrapper>
      )}
    </>
  );
});
