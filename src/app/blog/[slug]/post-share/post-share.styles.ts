'use client';

import { styled } from '@/styles';

export const SocialShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 8px;
  margin-top: 64px;
`;

export const SocialButton = styled.a`
  display: inline-flex;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
`;
