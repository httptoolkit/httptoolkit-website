'use client';

import { Container } from '@/components/elements/container';
import { screens, styled } from '@/styles';

export const StyledFooter = styled.footer`
  margin-top: 32px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    margin-top: 96px;
  }
`;

export const StyledSimpleFooter = styled.footer`
  margin-top: 0;
`;

export const StyledContainer = styled(Container)`
  &&& {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    gap: 24px;

    @media (min-width: ${screens.md}) {
      flex-direction: row;
      gap: 40px;
    }

    @media (min-width: ${screens.lg}) {
      flex-direction: row;
      gap: 128px;
    }
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

    & *:first-child > svg {
      width: 170px;
      height: 26px;
    }
  }

  &:last-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

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

        @media (min-width: ${screens.lg}) {
          order: 1;
        }
      }

      &:nth-of-type(2) {
        order: 3;

        @media (min-width: ${screens.lg}) {
          order: 2;
        }
      }

      &:nth-of-type(3) {
        order: 2;

        @media (min-width: ${screens.lg}) {
          order: 3;
        }
      }

      &:nth-of-type(4) {
        order: 1;

        @media (min-width: ${screens.lg}) {
          order: 4;
        }
      }
    }
  }
`;

export const StyledMenuWrapper = styled.div<{ $displayOnMobile: boolean; $displayOnDesktop: boolean; $gapxl?: string }>`
  flex-direction: column;
  gap: 22px;

  @media (max-width: ${screens.lg}) {
    display: ${({ $displayOnMobile }) => ($displayOnMobile ? 'flex' : 'none')};
  }

  @media (min-width: ${screens.lg}) {
    display: ${({ $displayOnDesktop }) => ($displayOnDesktop ? 'flex' : 'none')};
    gap: ${props => props.$gapxl || '21px'};
  }
`;

export const StyledMenuItems = styled.ul<{ $displayOnMobile: boolean; $displayOnDesktop: boolean }>`
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${screens.lg}) {
    display: ${({ $displayOnMobile }) => ($displayOnMobile ? 'flex' : 'none')};
  }

  @media (min-width: ${screens.lg}) {
    display: ${({ $displayOnDesktop }) => ($displayOnDesktop ? 'flex' : 'none')};
    gap: 24px;
  }

  @media (min-width: ${screens.md}) {
    & a:hover,
    & a:focus {
      transition: color ease-in 200ms;
      color: ${({ theme }) => theme.colors.cinnarbarRed};
    }
  }
`;

export const StyledSeparator = styled.hr<{ $isSimple?: boolean }>`
  border-color: ${({ theme }) => theme.colors.mediumGrey};
  margin: ${({ $isSimple }) => ($isSimple ? '16px 0' : '24px 0')};

  @media (min-width: ${screens.xl}) {
    margin: ${({ $isSimple }) => ($isSimple ? '32px 0' : '48px 0')};
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
  &&& {
    gap: 32px;
    position: relative;

    & svg[data-logo='true'] {
      width: fit-content;
      height: 26px;
    }
  }
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
