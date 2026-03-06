import { CaretLeft } from '@phosphor-icons/react';

import { Button } from '@/components/elements/button';
import { styled } from '@linaria/react';

export interface DrawerProps {
  isOpen?: boolean;
  onClose: () => void;
}

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100dvh;
  background-color: var(--ink-grey);
  transition: left 0.3s ease-in-out;
  box-shadow: initial;
  z-index: 1000;

  &[data-open='true'] {
    left: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const DrawerHeader = styled.div`
  padding: 11px 16px;
  max-height: 70px;
  background-color: var(--ink-grey);
  border-bottom: 1px solid var(--button-border);
`;

const DrawerContent = styled.div`
  padding: 16px;
  height: calc(100dvh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

export const Drawer = ({ isOpen = false, onClose, children }: Component<DrawerProps>) => {
  return (
    <DrawerContainer data-open={isOpen}>
      <DrawerHeader>
        <Button
          style={{ width: 48, height: 48, padding: 0, marginLeft: 'auto' }}
          variant="secondary"
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
