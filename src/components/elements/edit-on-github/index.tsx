'use client';

import { styled } from '@/styles';

import { PencilSimple } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';

const EditText = styled.p`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 5px;
  color: var(--text-dark-grey);

  opacity: 0.8;

  a {
    color: var(--text-dark-grey);
    text-decoration: underline;
    transition: color ease-in 200ms;

    @media (hover: hover) {
      &:hover {
        color: var(--text-light-grey);
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