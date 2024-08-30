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
    background-position: top -35px center;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image: radial-gradient(ellipse at center, transparent 60%, ${({ theme }) => theme.colors.inkGrey});
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

  background: radial-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3) 40%, transparent 75%);
  text-shadow: var(--ink-grey) 0 0 20px, var(--ink-grey) 1px 1px 1px;

  & a {
    color: ${({ theme }) => theme.colors.electricLightBlue};
    text-decoration: underline;
  }
`;
