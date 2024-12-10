'use client';

import { styled } from '@/styles';

import { PencilSimple } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';

const EditText = styled.em`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.text.darkGrey};

  a {
    color: ${({ theme }) => theme.colors.text.darkGrey};
    text-decoration: underline;
    transition: color ease-in 200ms;

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.text.lightGrey};
      }
    }
  }
`;

export const EditOnGithub = (props: { url: string }) => <EditText>
    <PencilSimple /> Suggest changes to this page
    <Link href={props.url} target="_blank">
        on GitHub
    </Link>
</EditText>