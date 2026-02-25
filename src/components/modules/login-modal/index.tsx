"use client";

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { screens, fontSizes } from '@/styles';

import { asErrorLike } from '@httptoolkit/util';
import { sendAuthCode, loginWithCode } from '@httptoolkit/accounts';

import { accountStore } from '@/lib/store/account-store';
import { observer } from 'mobx-react-lite';
import { Heading } from '@/components/elements/heading';
import { Logo, X, CaretLeft } from '@/components/elements/icon';
import { Button } from '@/components/elements/button';
import { Link } from '@/components/elements/link';

const Modal = styled.dialog`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  margin: 0;

  width: 90%;
  @media (min-width: ${screens.lg}) {
    width: auto;
    max-width: 340px;
  }

  background: white;
  color: black;

  border-radius: 16px;
  padding: 0;
  box-shadow: 0 0 0 1px var(--button-border) inset;

  outline: none;
  border: none;

  background-color: var(--dark-grey);

  &::backdrop {
    opacity: 0.9;
    background: radial-gradient(circle, var(--medium-grey), var(--light-grey));
  }
`;

const CtaButton = styled(Button)`
  margin: 20px;
  width: calc(100% - 40px);
  box-sizing: border-box;
  min-height: 58px;
`;

const CloseDialogButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;

  background: none;
  border: none;
  color: var(--light-grey);
  cursor: pointer;

  &:hover {
    color: var(--white);
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;

  background: none;
  border: none;
  color: var(--light-grey);
  cursor: pointer;

  &:hover {
    color: var(--white);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const HeadingLogo = styled(Logo)`
  margin: 48px 16px 16px;
  width: 30%;
  fill: var(--cinnabar-red);
`;

const Title = styled(Heading)`
  margin: 16px 32px;
  text-align: center;
`;

const Subtitle = styled(Heading)`
  margin: -16px 32px 16px;
  text-align: center;
`;

const Email = styled.span`
  white-space: break-spaces;
  word-break: break-word;
  hyphens: auto;
`;

const Input = styled.input`
  padding: 16px;
  margin: 16px 0 0;
  width: 100%;

  border-style: solid;
  border-color: var(--medium-grey);
  background-color: var(--ink-black);

  border-width: 1px 0 1px 0;
  z-index: 1;

  font-size: ${fontSizes.text.m};

  &:focus {
    border-color: var(--white);
  }
`;

const SmallPrint = styled.p`
  margin: 0;
  padding: 10px 16px 12px;
  width: 100%;

  font-size: ${fontSizes.text.s};
  font-style: italic;

  background-color: var(--darkish-grey);
  color: var(--light-grey);

  a {
    text-decoration: underline;
    color: var(--light-grey);

    &:hover {
      color: var(--white);
    }
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid var(--text-always-white);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  margin: -4px 0;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 16px 20px 0;
`;

export const LoginModal = observer(() => {
  const handleDialogClose = React.useCallback(() => {
    accountStore.endLogin();
  }, []);

  if (!accountStore.loginModalVisible) return null;

  return <Modal
      ref={(dialog) => dialog?.showModal()}
      onClose={handleDialogClose}
    >
      <CloseDialogButton
        onClick={handleDialogClose}
        aria-label="Close dialog"
      >
        <X size="24" />
      </CloseDialogButton>
      <LoginFields />
    </Modal>;
});

const focusInput = (input: HTMLInputElement | null) => {
  requestAnimationFrame(() =>
    input?.focus()
  );
}

const LoginFields = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(false);

    try {
      await sendAuthCode(email, 'website');
      setIsLoading(false);
      setIsEmailSent(true);
    } catch (e) {
      setIsLoading(false);
      setError(asErrorLike(e).message || 'An error occurred');
    }
  };

  const handleBackButton = () => {
    setIsEmailSent(false);
    setError(false);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError(false);

    try {
      await loginWithCode(email, code);
      await accountStore.finalizeLogin();
      // We never unset isLoading - the modal disappears entirely when the
      // account store state is fully updated, and we want to spin till then.
    } catch (e) {
      setIsLoading(false);
      setError(asErrorLike(e).message || 'An error occurred');
    }
  };

  const smallPrint = (
    <SmallPrint>
      By creating an account you accept the <Link
        href="/terms-of-service"
        target="_blank"
      >
        Terms of Service
      </Link> and <Link
        href="/privacy-policy"
        target="_blank"
      >
        Privacy Policy
      </Link>.
    </SmallPrint>
  );

  return !isEmailSent
    ? <Form onSubmit={handleEmailSubmit}>
        <HeadingLogo />
        <Title fontSize='m'>
          Enter your email
        </Title>
        <Input
          name="email"
          type="email"
          required
          placeholder="you@email.example"
          ref={focusInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        {error &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <CtaButton type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Send Code'}
        </CtaButton>

        { smallPrint }
      </Form>
    :
    <Form onSubmit={handleCodeSubmit}>
      <BackButton
        type="button"
        onClick={handleBackButton}
        aria-label="Go back"
      >
        <CaretLeft size='24' />
      </BackButton>
      <HeadingLogo />
      <Title fontSize='m'>
        Enter the code
      </Title>
      <Subtitle fontSize='xs'>
        sent to you at<br/><Email>
          { email }
        </Email>
      </Subtitle>
      <Input
        name="otp"
        type="text"
        inputMode="numeric"
        pattern="\d{6}"
        required
        placeholder="Enter the 6 digit code"
        ref={focusInput}
        value={code}
        onChange={(e) => {
          const input = e.target.value;
          const numberInput = input.replace(/\D/g, '').slice(0, 6);
          setCode(numberInput);
        }}
        disabled={isLoading}
      />

      {error &&
        <ErrorMessage>{error}</ErrorMessage>
      }

      <CtaButton type="submit" disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Login'}
      </CtaButton>

      { smallPrint }
    </Form>
};