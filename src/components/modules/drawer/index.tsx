import { CaretLeft } from '@phosphor-icons/react';

import { DrawerContainer, DrawerHeader, DrawerContent } from './drawer.styles';
import type { DrawerProps } from './drawer.types';

import { Button } from '@/components/elements/button';

export const Drawer = ({ $isOpen = false, onClose, children }: Component<DrawerProps>) => {
  return (
    <DrawerContainer $isOpen={$isOpen}>
      <DrawerHeader>
        <Button
          style={{ width: 48, height: 48, padding: 0 }}
          $variant="secondary"
          onClick={onClose}
          aria-label="closemobilemenu"
        >
          <CaretLeft aria-hidden="true" size={16} color="#fff" weight="fill" />
        </Button>
      </DrawerHeader>
      <DrawerContent>{children}</DrawerContent>
    </DrawerContainer>
  );
};
