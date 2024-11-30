"use client";

import { Container } from "@/components/elements/container";
import { screens, styled } from "@/styles";
import { DefaultTheme } from 'styled-components';

interface ThemeProps {
  theme: DefaultTheme;
}

export const StyledFooter = styled.footer`
  margin-top: 32px;

  @media (min-width: ${({ theme }: ThemeProps) => theme.screens.lg}) {
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

    @media (min-width: ${screens["2xl"]}) {
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

interface MenuWrapperProps {
  $displayOnMobile: boolean;
  $displayOnDesktop: boolean;
  $gapxl?: string;
  theme?: DefaultTheme;
}

export const StyledMenuWrapper = styled.div<MenuWrapperProps>`
  flex-direction: column;
  gap: 22px;

  @media (max-width: ${screens.lg}) {
    display: ${({ $displayOnMobile }: MenuWrapperProps) => ($displayOnMobile ? "flex" : "none")};
  }

  @media (min-width: ${screens.lg}) {
    display: ${({ $displayOnDesktop }: MenuWrapperProps) =>
      $displayOnDesktop ? "flex" : "none"};
    gap: ${({ $gapxl }: MenuWrapperProps) => $gapxl || "21px"};
  }
`;

interface MenuItemsProps {
  $displayOnMobile: boolean;
  $displayOnDesktop: boolean;
  theme?: DefaultTheme;
}

export const StyledMenuItems = styled.ul<MenuItemsProps>`
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${screens.lg}) {
    display: ${({ $displayOnMobile }: MenuItemsProps) => ($displayOnMobile ? "flex" : "none")};
  }

  @media (min-width: ${screens.lg}) {
    display: ${({ $displayOnDesktop }: MenuItemsProps) =>
      $displayOnDesktop ? "flex" : "none"};
    gap: 24px;
  }

  @media (min-width: ${screens.md}) {
    & a:focus {
      transition: color ease-in 200ms;
      color: ${({ theme }: ThemeProps) => theme.colors.cinnarbarRed};
    }

    @media (hover: hover) {
      & a:hover {
        transition: color ease-in 200ms;
        color: ${({ theme }: ThemeProps) => theme.colors.cinnarbarRed};
      }
    }
  }
`;

interface SeparatorProps {
  $isSimple?: boolean;
  theme?: DefaultTheme;
}

export const StyledSeparator = styled.hr<SeparatorProps>`
  border-color: ${({ theme }: ThemeProps) => theme.colors.darkGrey};
  margin: ${({ $isSimple }: SeparatorProps) => ($isSimple ? "16px 0" : "24px 0")};

  @media (min-width: ${screens.xl}) {
    margin: ${({ $isSimple }: SeparatorProps) => ($isSimple ? "32px 0" : "48px 0")};
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

    & svg[data-logo="true"] {
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
