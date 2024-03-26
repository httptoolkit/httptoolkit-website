'use client';

import type { ImageProps } from '.';

import { styled } from '@/styles';

export const StyledImageWrapper = styled.figure<Partial<ImageProps>>`
  position: relative;
  line-height: 0;
  /* width: fit-content; */
  height: 100%;
  object-fit: cover;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
