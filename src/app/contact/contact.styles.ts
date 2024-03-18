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

export const StyledSuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;

  max-width: 300px;
  margin: 0 auto;

  & a {
    max-width: fit-content;
  }

  @media (min-width: ${screens['lg']}) {
    max-width: 624px;
  }
`;

export const StyledFullGradient = styled.div`
  position: absolute;
  width: 100%;
  display: none;
  visibility: hidden;
  z-index: -1;

  @media (min-width: ${screens['lg']}) {
    display: block;
    visibility: visible;
  }
`;

export const StyledGradientMobile = styled.div`
  position: absolute;
  top: -100px;
  width: 100%;
  height: 700px;
  display: block;
  visibility: visible;

  @media (min-width: ${screens['lg']}) {
    display: none;
    visibility: hidden;
  }
`;
