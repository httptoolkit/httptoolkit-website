'use client';

import type { KeyboardEvent } from 'react';
import { Drawer } from 'vaul';

import { styled } from '@linaria/react';

import { useDrawerState } from '../hooks/use-drawer-state';
import { StyledTagText } from '../overview-explorer.styled';

import { ListBullets, XSquare } from '@/components/elements/icon';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';

const StyledDrawerContent = styled(Drawer.Content)`
  &&& {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
    width: 100%;
    max-height: calc(100vh - 30%);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding-bottom: 0;

    box-shadow: 0 0 0 1px var(--button-border);
    background: var(--ink-black);
  }
`;

const StyledMobileTrigger = styled(Drawer.Trigger)`
  &&& {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-dark-grey);
  }
`;

const StyledMobileDrawerHeading = styled.div`
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-dark-grey);
  box-shadow: 0 1px 0 1px var(--button-border);
`;

const StyledMobileNavigationWrapper = styled.ul`
  overflow-y: auto;
  padding: 8px 0 0 24px;
  /* width */
  ::-webkit-scrollbar {
    width: 16px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--ink-grey);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    height: 94px;
    background: var(--light-grey);
    border-radius: 40px;
    border: 2px solid var(--ink-grey);
  }

  & li {
    padding: 12px;

    & a {
      display: block;
    }
  }
`;

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
            <li onClick={handleOnClickTag}>
              <Link href={`/blog`} scroll={false}>
                <StyledTagText>All posts</StyledTagText>
              </Link>
            </li>
            {tags.map(tag => (
              <li key={tag} className="tagItem" onClick={handleOnClickTag}>
                <Link href={`/blog?tags=${tag}`} scroll={false}>
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
