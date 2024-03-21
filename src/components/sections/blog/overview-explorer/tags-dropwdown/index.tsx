'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { KeyboardEvent } from 'react';

import {
  StyledButtonTrigger,
  StyledDropdownContentWrapper,
  StyledDropdownItem,
  StyledDropdownMenuContent,
} from './tags-dropdow';
import { useDrawerState } from '../hooks/use-drawer-state';

import { CaretDown, CaretUp } from '@/components/elements/icon';

export const TagsDropwdown = ({ tags }: { tags: string[] }) => {
  const { isDrawerOpen, handleOnClickTag, handleOpenChange } = useDrawerState(false);

  const handleOnEnterCapture = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleOpenChange(false);
    }
  };

  return (
    <DropdownMenu.Root modal={false} onOpenChange={handleOpenChange} open={isDrawerOpen}>
      <DropdownMenu.Trigger asChild>
        <StyledButtonTrigger>
          <span>More</span>
          {isDrawerOpen ? <CaretUp weight="fill" /> : <CaretDown weight="fill" />}
        </StyledButtonTrigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <StyledDropdownMenuContent onKeyDownCapture={handleOnEnterCapture} align="start" sideOffset={5}>
          <StyledDropdownContentWrapper>
            {tags.map(tag => (
              <DropdownMenu.Item
                asChild
                key={tag}
                className="tagItem"
                onKeyDownCapture={handleOnEnterCapture}
                onSelect={() => handleOnClickTag(tag)}
              >
                <li tabIndex={-1}>
                  <StyledDropdownItem>{tag}</StyledDropdownItem>
                </li>
              </DropdownMenu.Item>
            ))}
          </StyledDropdownContentWrapper>
        </StyledDropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
