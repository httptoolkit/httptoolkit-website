'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
  StyledButtonTrigger,
  StyledDropdownContentWrapper,
  StyledDropdownItem,
  StyledDropdownMenuContent,
} from './tags-dropdow';

import { CaretDown, CaretUp } from '@/components/elements/icon';

export const TagsDropwdown = ({ tags }: { tags: string[] }) => {
  const [isDropdownOpen, setIsDropdowOpen] = useState(false);
  const router = useRouter();

  // Sync controlled state with dropdown menu root state
  const handleOpenChange = (isOpen: boolean) => {
    setIsDropdowOpen(isOpen);
  };

  // Close the dropdown when a tag is clicked
  const handleOnClickTag = (tag: string) => {
    router.push(`/blog?tags=${tag}`, { scroll: false });
    setIsDropdowOpen(false);
  };

  return (
    <DropdownMenu.Root modal={false} onOpenChange={handleOpenChange} open={isDropdownOpen}>
      <DropdownMenu.Trigger asChild>
        <StyledButtonTrigger>
          <span>More</span>
          {isDropdownOpen ? <CaretUp weight="fill" /> : <CaretDown weight="fill" />}
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
