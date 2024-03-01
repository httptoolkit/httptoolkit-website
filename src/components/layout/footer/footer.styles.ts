'use client';

import { Container } from '@/components/elements/container';
import { screens, styled } from '@/styles';

export const StyledFooter = styled.footer`
  margin-top: 64px;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column-reverse;
  gap: 64px;

  @media (min-width: ${screens.md}) {
    flex-direction: row;
    gap: 40px;
  }

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    gap: 128px;
  }
`;

export const StyledColumn = styled.div`
  &:first-child {
    display: flex;
    flex-direction: column;
    min-width: min-content;
    gap: 16px;

    @media (min-width: ${screens.xl}) {
      flex-direction: column;
      min-width: 398px;
      gap: 76px;
    }
  }

  &:last-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 54px;

    @media (min-width: ${screens.md}) {
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }

    @media (min-width: ${screens.lg}) {
      grid-template-columns: repeat(4, 1fr);
      gap: 50px;
    }

    @media (min-width: ${screens['2xl']}) {
      grid-template-columns: repeat(4, 1fr);
      gap: 91px;
    }

    & div {
      @media (min-width: ${screens.md}) {
        min-width: max-content;
      }

      &:nth-of-type(1) {
        order: 2;

        @media (min-width: ${screens['2xl']}) {
          order: 1;
        }
      }

      &:nth-of-type(2) {
        order: 3;

        @media (min-width: ${screens['2xl']}) {
          order: 2;
        }
      }

      &:nth-of-type(3) {
        order: 2;

        @media (min-width: ${screens['2xl']}) {
          order: 3;
        }
      }

      &:nth-of-type(4) {
        order: 1;

        @media (min-width: ${screens['2xl']}) {
          order: 4;
        }
      }
    }
  }
`;

export const StyledMenuItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 23px;

  & a:hover,
  & a:focus {
    transition: color ease-in 200ms;
    color: ${({ theme }) => theme.colors.cinnarbarRed};
  }
`;

export const StyledSeparator = styled.hr`
  border-color: ${({ theme }) => theme.colors.mediumGrey};
  margin: 24px 0;

  @media (min-width: ${screens.xl}) {
    margin: 48px 0;
  }
`;

export const StyledFooterCopySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;

  @media (min-width: ${screens.xl}) {
    flex-direction: row;
  }
`;

export const StyledSimpleFooterWrapper = styled(StyledFooterCopySection)`
  gap: 32px;
`;

export const StyledIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  gap: 76px;

  @media (min-width: ${screens.md}) {
    flex-direction: column;
    align-items: start;
  }
`;
