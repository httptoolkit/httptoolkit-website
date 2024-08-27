import { CaretLeft } from '@phosphor-icons/react';

import { DrawerContainer, DrawerContent, DrawerHeader } from './drawer.styles';
import type { DrawerProps } from './drawer.types';

import { Button } from '@/components/elements/button';

export const Drawer = ({ $isOpen = false, onClose, children }: Component<DrawerProps>) => {
  return (
    <DrawerContainer $isOpen={$isOpen}>
      <DrawerHeader>
        <Button
          style={{ width: 48, height: 48, padding: 0, marginLeft: 'auto' }}
          $variant="secondary"
          onClick={onClose}
          aria-label="Close mobile menu"
        >
          <CaretLeft aria-hidden="true" size={16} weight="fill" />
        </Button>
      </DrawerHeader>
      <DrawerContent>{children}</DrawerContent>
    </DrawerContainer>
  );
};
