'use client';

import { styled } from '@linaria/react';

import { Button } from '@/components/elements/button';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';

interface LoginInfoProps {
  email?: string;
  logOut: () => void;
  isLoggedIn: boolean;
}

const StyledLoginInfoWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 16px;

  *[data-button='true'] {
    margin: 0 auto;
  }
`;

export const LoginInfo = ({
  isLoggedIn,
  logOut,
  email
}: LoginInfoProps) => {
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
        Logged in as {email}.
      </Text>
      <Button $variant="secondary" $small onClick={logOut}>
        Log out
      </Button>
    </StyledLoginInfoWrapper>
  );
};
