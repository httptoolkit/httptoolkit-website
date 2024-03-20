'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

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

  return (
    <DropdownMenu.Root modal={false} onOpenChange={handleOpenChange} open={isDrawerOpen}>
      <DropdownMenu.Trigger asChild>
        <StyledButtonTrigger>
          <span>More</span>
          {isDrawerOpen ? <CaretUp weight="fill" /> : <CaretDown weight="fill" />}
        </StyledButtonTrigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <StyledDropdownMenuContent align="start" sideOffset={5}>
          <StyledDropdownContentWrapper>
            {tags.map(tag => (
              <DropdownMenu.Item key={tag} className="tagItem" onSelect={() => handleOnClickTag(tag)}>
                <StyledDropdownItem>{tag}</StyledDropdownItem>
              </DropdownMenu.Item>
            ))}
          </StyledDropdownContentWrapper>
        </StyledDropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
