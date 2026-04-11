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

      if (response.ok) {
        const data = await response.json();
        setResult({ school: data.school, expiry: data.expiry });
        setPageState('success');
      } else if (response.status === 403) {
        setPageState('not_academic');
      } else if (response.status === 409) {
        const data = await response.json().catch(() => ({}));
        setResult({ expiry: data.expiry });
        setPageState('already_active');
      } else {
        setPageState('error');
        setErrorMessage('Something went wrong. Please try again later.');
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
              HTTP Toolkit Pro is free for students and faculty at accredited
              universities and colleges. Log in with your academic email
              address (.edu, .ac.uk, etc.) to get started. Your access lasts
              one year and can be renewed as long as you're still studying.
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
                your HTTP Toolkit Pro subscription is now active
                {result.expiry ? ` until ${formatExpiry(result.expiry)}` : ' for one year'}.
              </Text>
              <Text fontSize="s" color="darkGrey">
                When your access expires, come back to this page to renew it
                for another year. Download HTTP Toolkit and log in with your
                account to get started.
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
          excerpt={
            <Text fontSize="m">
              You already have an active student subscription
              {result.expiry ? ` until ${formatExpiry(result.expiry)}` : ''}.
              You can renew when less than 2 months remain. Download HTTP
              Toolkit and log in with your account to use it.
            </Text>
          }
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
                  We couldn't verify your email ({accountStore.user.email}) as belonging to
                  an academic institution. If you believe this is a mistake,
                  use the form below to contact us and we'll review it manually.
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
