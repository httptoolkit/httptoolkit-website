import { styled } from '@linaria/react';

import { Link } from '@/components/elements/link';
import { screens, fontSizes, fontWeight } from '@/styles/tokens';

const baseStyles = `
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: fit-content;
  outline: none;
  border: 0;
  font-size: ${fontSizes.button.default};
  font-weight: ${fontWeight.medium};
  text-decoration: none;
  line-height: 1;
  border-radius: 12px;
  gap: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  fill: currentColor;
  padding: 20px 24px;

  @media (min-width: ${screens['lg']}) {
    width: fit-content;
    justify-content: center;
  }

  @media (hover: hover) {
    &:hover {
      transition: all ease-in 0.3s;
    }
  }

  &[data-small="true"] {
    font-size: ${fontSizes.button.small};
    padding: 16px 24px;
  }

  &[data-fluid="true"] {
    @media (min-width: ${screens['lg']}) {
      width: 100%;
    }
  }

  /* PRIMARY VARIANT */
  &[data-variant="primary"] {
    color: var(--text-always-white);
    background: var(--orange-gradient);
    border: 1px solid var(--cinnabar-red);
    padding: 19px 24px;
    box-shadow:
      0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset,
      0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset;

    &[data-small="true"] {
      padding: 16px 24px;
    }

    &[data-with-border="true"] {
      box-shadow: 0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset, 0px 4px 24px 0px rgba(245, 109, 79, 0.15), 0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset;
    }

    @media (min-width: ${screens.md}) {
      @media (hover: hover) {
        &:hover:not([data-with-border="true"]) {
          transition: border ease-in 0.3s;
          border: 1px solid var(--text-white);
        }
      }

      &:focus:not([data-with-border="true"]) {
        box-shadow:
          0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset,
          0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset,
          0px 0px 0px 8px rgba(50, 52, 59, 0.6);
      }

      &:focus[data-with-border="true"] {
        box-shadow: 0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset, 0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset, 0px 0px 0px 8px rgba(50, 52, 59, 0.6);
      }

      &:active {
        background: linear-gradient(345.32deg, #a32d13 10.67%, #dc3814 89.91%);
        box-shadow:
          0px 2px 1px 0px rgba(255, 255, 255, 0.15) inset,
          0px 4px 24px 0px rgba(245, 109, 79, 0.15),
          0px -2px 2px 0px rgba(0, 0, 0, 0.05) inset;
      }
    }
  }

  /* SECONDARY VARIANT */
  &[data-variant="secondary"] {
    color: var(--text-light-grey);
    background-color: var(--button-secondary-default);
    padding: 20px 24px;
    box-shadow:
      0 0 0 1px var(--button-border),
      0px 0px 8px 0px rgba(230, 232, 242, 0.05);

    &[data-small="true"] {
      padding: 16px 24px;
    }

    @media (min-width: ${screens.md}) {
      @media (hover: hover) {
        &:hover:not([data-dropdown="true"]) {
          box-shadow: 0 0 0 1px var(--text-light-grey);
        }
      }

      &:focus:not([data-dropdown="true"]) {
        border: 1px solid var(--text-light-grey);
        box-shadow:
          0px 0px 8px 0px rgba(230, 232, 242, 0.05),
          0px 0px 0px 8px rgba(50, 52, 59, 0.6);
      }

      &:active:not([data-dropdown="true"]) {
        background-color: var(--ink-grey);
        border: 1px solid var(--text-light-grey);
      }
    }
  }
`;

export const StyledLink = styled(Link)`
  ${baseStyles}
`;

export const StyledButton = styled.button`
  ${baseStyles}
`;

export const StyledButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  text-align: center;
  padding: 8px;
  border-radius: 20px;
  justify-content: center;

  @media (min-width: ${screens['lg']}) {
    justify-content: start;
    width: fit-content;
  }
`;
