'use client';

import { logOut } from '@httptoolkit/accounts';

import { StyledLoginInfoWrapper } from './login-info.styles';
import type { LoginInfoProps } from './login-info.types';

import { Button } from '@/components/elements/button';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';

export const LoginInfo = ({ isLoggedIn, email }: LoginInfoProps) => {
  if (!isLoggedIn) {
    return (
      <Text fontSize="m" textAlign="center" color="darkGrey">
        Want to manage an existing account? Log into your dashboard at 
        <Link href="https://accounts.httptoolkit.tech">accounts.httptoolkit.tech</Link>.
      </Text>
    );
  }

  return (
    <StyledLoginInfoWrapper>
      <Text fontSize="m" textAlign="center" color="darkGrey">
        Logged in as {email}.
      </Text>
      <Button $variant="secondary" $small onClick={logOut}>
        Log out
      </Button>
    </StyledLoginInfoWrapper>
  );
};
