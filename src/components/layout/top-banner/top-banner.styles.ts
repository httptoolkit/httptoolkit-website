'use client';

import { Container } from '@/components/elements/container';
import { styled } from '@/styles';

export const StyledTopBanner = styled.div`
  background-color: #000;
  color: ${({ theme }) => theme.colors.text.alwayWhite};
  width: 100%;
`;

export const StyledTopBannerContainer = styled(Container)`
  &&& {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
  }
`;
