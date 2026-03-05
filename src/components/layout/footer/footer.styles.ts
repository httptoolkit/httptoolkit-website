import { Container } from '@/components/elements/container';

import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

export const StyledFooter = styled.footer`
  margin-top: 32px;

  @media (min-width: ${screens.lg}) {
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
      gap: 57px;
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

export const StyledMenuWrapper = styled.div`
  flex-direction: column;
  gap: 22px;

  @media (max-width: ${screens.lg}) {
    display: none;

    &[data-display-on-mobile="true"] {
      display: flex;
    }
  }

  @media (min-width: ${screens.lg}) {
    display: none;
    gap: var(--menu-gapxl, 21px);

    &[data-display-on-desktop="true"] {
      display: flex;
    }
  }
`;

export const StyledMenuItems = styled.ul`
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${screens.lg}) {
    display: none;

    &[data-display-on-mobile="true"] {
      display: flex;
    }
  }

  @media (min-width: ${screens.lg}) {
    display: none;
    gap: 24px;

    &[data-display-on-desktop="true"] {
      display: flex;
    }
  }

  @media (min-width: ${screens.md}) {
    & a:focus {
      transition: color ease-in 200ms;
      color: var(--cinnabar-red);
    }

    @media (hover: hover) {
      & a:hover {
        transition: color ease-in 200ms;
        color: var(--cinnabar-red);
      }
    }
  }
`;

export const StyledSeparator = styled.hr`
  border-color: var(--dark-grey);
  margin: 24px 0;

  @media (min-width: ${screens.xl}) {
    margin: 48px 0;
  }

  &[data-is-simple="true"] {
    margin: 16px 0;

    @media (min-width: ${screens.xl}) {
      margin: 32px 0;
    }
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
  flex-wrap: wrap;
  align-items: end;
  gap: 25px;

  @media (min-width: ${screens.md}) {
    flex-direction: column;
    align-items: start;
    gap: 57px;
  }
`;
