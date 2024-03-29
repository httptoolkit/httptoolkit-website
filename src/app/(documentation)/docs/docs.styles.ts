'use client';

import { styled } from '@/styles';

export const EditOnGithub = styled.em`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.text.darkGrey};

  a {
    color: ${({ theme }) => theme.colors.text.darkGrey};
    text-decoration: underline;
    transition: color ease-in 200ms;

    &:hover {
      color: ${({ theme }) => theme.colors.text.lightGrey};
    }
  }
`;
