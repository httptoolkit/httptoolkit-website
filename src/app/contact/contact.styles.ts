'use client';

import { screens, styled } from '@/styles';

export const StyledContactPageColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 64px;

  @media (min-width: ${screens['lg']}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 96px;
  }
`;

export const StyledContactColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;

  @media (min-width: ${screens['lg']}) {
    gap: 64px;
  }
`;

export const StyledGradientLeft = styled.div`
  position: absolute;
  max-width: 100%;
  top: -180px;
  left: 0;
  height: 780px;

  @media (min-width: ${screens['lg']}) {
    top: -7px;
  }
`;
