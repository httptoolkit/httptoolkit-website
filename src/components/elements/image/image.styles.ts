'use client';

import { styled } from '@/styles';

export const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  line-height: 0;

  & img {
    object-fit: cover;
    width: 100%;
  }
`;
