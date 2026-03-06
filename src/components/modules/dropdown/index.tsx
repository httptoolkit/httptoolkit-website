'use client';

import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import type { Icon, IconWeight } from '@phosphor-icons/react';
import type { AriaAttributes } from 'react';

import { Link } from '@/components/elements/link';
import {
  Button,
  type ButtonType,
  type ButtonWithoutHrefProps,
  type LinkWithHrefProps,
  type ButtonVariantProps,
} from '@/components/elements/button';
import { styled } from '@linaria/react';
import { screens, fontSizes } from '@/styles/tokens';

export type OptionComponentType = (props: Component<Omit<DropdownOptionProps, 'text'>>) => JSX.Element;

export type DropdownOption =
  | DropdownDownloadOption
  | { type: 'hr' };

export type DropdownDownloadOption = {
  as?: ButtonType;
  href?: string;
  text: string;
  subtext?: string;
};

export type DropdownOptionProps = {
  as?: ButtonType;
  href?: string;
  variant?: ButtonVariantProps['variant'];
} & (ButtonWithoutHrefProps | LinkWithHrefProps);

export interface DropdownProps extends ButtonVariantProps, AriaAttributes {
  icon?: Icon;
  iconWeight?: IconWeight;
  href?: string;
  items: DropdownOption[];
  direction?: 'top' | 'bottom';
}

const openDropdown = `
  padding: 4px;
  max-height: fit-content;
  box-shadow: 0 0 0 1px var(--button-border);
  opacity: 1;
  visibility: visible;
`;

const DropdownOptionsWrapper = styled.div`
  display: grid;
  position: absolute;
  top: auto;
  bottom: auto;
  border-radius: 12px;
  background: var(--ink-black);
  padding: 4px;
  gap: 4px;
  min-width: 100%;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
  overflow: hidden;
  z-index: 33;
  box-shadow: '0px 0px 8px 0px rgba(230, 232, 242, 0.05)';

  &[data-direction="bottom"] {
    top: calc(100% + 4px);
    bottom: auto;
  }

  &[data-direction="top"] {
    top: auto;
    bottom: calc(100% + 4px);
  }

  @media (hover: hover) {
    &:hover {
      ${openDropdown}
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: -5px;
    background: transparent;
    width: 100%;
    height: 5px;
  }
`;

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  justify-content: center;

  &:focus-within ${DropdownOptionsWrapper} {
    ${openDropdown}
  }

  @media (hover: hover) {
    &:hover ${DropdownOptionsWrapper} {
      ${openDropdown}
    }
  }

  @media (min-width: ${screens['lg']}) {
    justify-content: start;
    width: fit-content;
  }
`;

const DropdownHr = styled.hr`
  width: 80%;
  opacity: 0.5;
`;

const baseOption = `
  background-color: transparent;
  border: none;
  border-radius: 10px;
  padding: 14px;
  color: var(--text-light-grey);
  font-size: ${fontSizes.text.m};
  line-height: 1;
  text-align: center;
  text-decoration: none;
  outline: none;

  @media (min-width: ${screens['lg']}) {
    text-align: left;
  }

  &:focus {
    background: var(--ink-grey);
  }

  @media (hover: hover) {
    &:hover {
      background: var(--ink-grey);
    }
  }
`;

const DropdownOptionLink = styled(Link)`
  ${baseOption}
`;

const DropdownOptionButton = styled.button`
  ${baseOption}
`;

const DropdownOptionSubtext = styled.div`
  font-size: ${fontSizes.text.xs};
  margin-top: 5px;
`;

const renderOptions = (items: DropdownOption[]) => {
  return items.map((item, index) => {
    if ('type' in item && item.type === 'hr') {
      return <DropdownHr key={`hr-${index}`} />;
    }

    const { text, subtext, as, href, ...aria } = item as DropdownDownloadOption;
    const OptionComponent = (as === 'link' || href
      ? DropdownOptionLink
      : DropdownOptionButton) as OptionComponentType;

    return (
      <OptionComponent role="menuitem" key={`${text}-${subtext}`} href={href} {...aria}>
        { text }
        { subtext &&
          <DropdownOptionSubtext>{subtext}</DropdownOptionSubtext>
        }
      </OptionComponent>
    );
  });
};

export const Dropdown = ({
  children,
  items,
  icon = CaretDown,
  iconWeight = 'fill',
  variant = 'secondary',
  direction = 'bottom',
  ...buttonProps
}: Component<DropdownProps>) => {
  return (
    <DropdownWrapper data-dropdown-wrapper="true">
      <Button
        className="dropdown"
        data-dropdown="true"
        icon={icon}
        iconWeight={iconWeight}
        variant={variant}
        isDropdown
        {...buttonProps}
      >
        {children}
      </Button>
      <DropdownOptionsWrapper data-direction={direction} role="menu">
        {Array.isArray(items) && renderOptions(items)}
      </DropdownOptionsWrapper>
    </DropdownWrapper>
  );
};
