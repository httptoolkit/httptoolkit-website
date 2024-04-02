'use client';

import { screens, styled } from '@/styles';

export const StyledSuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 24px;

  max-width: 343px;
  margin: 32px auto;

  & a {
    text-decoration: underline;
    max-width: fit-content;
  }

  @media (min-width: ${screens.md}) {
    max-width: 624px;
    margin: 0 auto;
  }
`;

export const StyledFullGradient = styled.div`
  z-index: -1;
  display: none;

  & div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  @media (min-width: ${screens.md}) {
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
  z-index: -1;

  @media (min-width: ${screens.md}) {
    display: none;
    visibility: hidden;
  }
`;
