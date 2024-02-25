'use client';

import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import { DropdownOption, DropdownOptionsWrapper, DropdownWrapper, LinkDropdownOption } from './dropdown.styles';
import type { DropdownOptionProps, DropdownProps, OptionComponentType } from './dropdown.types';

import { Button } from '@/components/elements/button';

const renderOptions = (items: DropdownOptionProps[]) => {
  return items.map(({ content, as, href, onClick, ...aria }) => {
    const OptionComponent: OptionComponentType = as === 'link' ? LinkDropdownOption : DropdownOption;
    const newAs = as === 'link' ? undefined : as;

    return (
      <OptionComponent key={content} as={newAs} href={href} onClick={onClick} {...aria}>
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
  ...buttonProps
}: Component<DropdownProps>) => {
  return (
    <DropdownWrapper>
      <Button icon={icon} iconWeight={iconWeight} $isDropdown {...buttonProps}>
        {children}
      </Button>
      <DropdownOptionsWrapper>{Array.isArray(items) && renderOptions(items)}</DropdownOptionsWrapper>
    </DropdownWrapper>
  );
};
