'use client';

import { CaretDown } from '@phosphor-icons/react/dist/ssr';

import { DropdownOption, DropdownOptionsWrapper, DropdownWrapper, LinkDropdownOption } from './dropdown.styles';
import type { DropdownOptionProps, DropdownProps, OptionComponentType } from './dropdown.types';

import { Button } from '@/components/elements/button';

const renderOptions = (items: DropdownOptionProps[]) => {
  return items.map(({ content, as, href, onClick, ...aria }) => {
    const OptionComponent: OptionComponentType = as === 'Link' ? LinkDropdownOption : DropdownOption;
    const newAs = as === 'Link' ? undefined : as;

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
      <Button isDropdown icon={icon} iconWeight={iconWeight} {...buttonProps}>
        {children}
      </Button>
      <DropdownOptionsWrapper>{Array.isArray(items) && renderOptions(items)}</DropdownOptionsWrapper>
    </DropdownWrapper>
  );
};
