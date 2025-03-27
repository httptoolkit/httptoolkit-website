'use client';

import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import {
  DropdownOptionButton,
  DropdownOptionsWrapper,
  DropdownWrapper,
  DropdownOptionLink,
  DropdownHr,
  DropdownOptionSubtext
} from './dropdown.styles';
import type {
  DropdownDownloadOption,
  DropdownOption,
  DropdownProps,
  OptionComponentType
} from './dropdown.types';

import { Button } from '@/components/elements/button';
import type { StyledButtonProps } from '@/components/elements/button/button.types';

const renderOptions = (items: DropdownOption[], $variant: StyledButtonProps['$variant']) => {
  return items.map((item, index) => {
    if ('type' in item && item.type === 'hr') {
      return <DropdownHr key={`hr-${index}`} />;
    }

    const { text, subtext, as, href, ...aria } = item as DropdownDownloadOption;
    const OptionComponent: OptionComponentType = as === 'link' || href
      ? DropdownOptionLink
      : DropdownOptionButton;

    return (
      <OptionComponent role="menuitem" key={`${text}-${subtext}`} href={href} $variant={$variant} {...aria}>
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
  $variant = 'secondary',
  $direction = 'bottom',
  ...buttonProps
}: Component<DropdownProps>) => {
  return (
    <DropdownWrapper data-dropdown-wrapper="true" $variant={$variant}>
      <Button
        className="dropdown"
        data-dropdown="true"
        icon={icon}
        iconWeight={iconWeight}
        $variant={$variant}
        $isDropdown
        {...buttonProps}
      >
        {children}
      </Button>
      <DropdownOptionsWrapper $direction={$direction} role="menu">
        {Array.isArray(items) && renderOptions(items, $variant)}
      </DropdownOptionsWrapper>
    </DropdownWrapper>
  );
};
