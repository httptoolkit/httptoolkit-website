'use client';

import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import { DropdownOption, DropdownOptionsWrapper, DropdownWrapper, LinkDropdownOption } from './dropdown.styles';
import type { DropdownOptionProps, DropdownProps, OptionComponentType } from './dropdown.types';

import { Button } from '@/components/elements/button';
import type { StyledButtonProps } from '@/components/elements/button/button.types';

const renderOptions = (items: DropdownOptionProps[], $variant: StyledButtonProps['$variant']) => {
  return items.map(({ content, as, href, onClick, ...aria }) => {
    const OptionComponent: OptionComponentType = as === 'link' || href ? LinkDropdownOption : DropdownOption;

    return (
      <OptionComponent role="menuitem" key={content} href={href} $variant={$variant} onClick={onClick} {...aria}>
        {content}
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
    <DropdownWrapper $variant={$variant}>
      <Button data-dropdown="true" icon={icon} iconWeight={iconWeight} $variant={$variant} $isDropdown {...buttonProps}>
        {children}
      </Button>
      <DropdownOptionsWrapper $direction={$direction} role="menu">
        {Array.isArray(items) && renderOptions(items, $variant)}
      </DropdownOptionsWrapper>
    </DropdownWrapper>
  );
};
