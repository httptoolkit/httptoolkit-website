'use client';

import type { KeyboardEvent } from 'react';
import { Drawer } from 'vaul';

import {
  StyledDrawerContent,
  StyledMobileDrawerHeading,
  StyledMobileNavigationWrapper,
  StyledMobileTrigger,
} from './tags-drawer.styles';
import { useDrawerState } from '../hooks/use-drawer-state';
import { StyledTagText } from '../overview-explorer.styled';

import { ListBullets, XSquare } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';

export const TagsDrawer = ({ tags }: { tags: string[] }) => {
  const { isDrawerOpen, handleOnClickTag, handleOpenChange } = useDrawerState(false);

  const handleOnEnterCapture = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key === 'Enter') {
      handleOpenChange(false);
    }
  };

  return (
    <Drawer.Root onOpenChange={handleOpenChange} open={isDrawerOpen}>
      <StyledMobileTrigger>
        <ListBullets height={20} width={20} weight="fill" />
        <Text fontSize="l" fontWeight="medium">
          Categories
        </Text>
      </StyledMobileTrigger>
      <Drawer.Portal>
        <StyledDrawerContent>
          <StyledMobileDrawerHeading>
            <Text fontSize="l">Categories</Text>
            <XSquare
              tabIndex={0}
              aria-label="Close categories menu"
              height={20}
              width={20}
              weight="fill"
              onKeyDownCapture={e => handleOnEnterCapture(e)}
              onClick={() => handleOpenChange(false)}
            />
          </StyledMobileDrawerHeading>
          <StyledMobileNavigationWrapper>
            <li onClick={() => handleOnClickTag()}>
              <Link href={`/blog`} scroll={false}>
                <StyledTagText>All posts</StyledTagText>
              </Link>
            </li>
            {tags.map(tag => (
              <li key={tag} className="tagItem" onClick={() => handleOnClickTag(tag)}>
                <Link href={`/blog?tags=${tag}`}>
                  <StyledTagText>{tag}</StyledTagText>
                </Link>
              </li>
            ))}
          </StyledMobileNavigationWrapper>
        </StyledDrawerContent>
        <Drawer.Overlay />
      </Drawer.Portal>
    </Drawer.Root>
  );
};
