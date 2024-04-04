'use client';

import { screens, styled } from '@/styles';

export const StyledWillItCorsWrapper = styled.section`
  box-shadow: ${({ theme }) => theme.shadow.hero};
  padding: 32px 20px;

  @media (min-width: ${screens['md']}) {
    position: relative;
    padding-top: 32px;
    padding-bottom: 64px;
    text-align: center;
    justify-content: center;

    background:
      no-repeat url('/images/backgrounds/hero-lines.svg'),
      var(--background-dots);
    background-position: top -80px center;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: radial-gradient(ellipse at center, transparent 60%, ${({ theme }) => theme.colors.darkGrey});
    }
  }
`;

export const StyledWillItCorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 770px;
  text-align: center;

  & a {
    color: ${({ theme }) => theme.colors.electricLightBlue};
    text-decoration: underline;
  }
`;
