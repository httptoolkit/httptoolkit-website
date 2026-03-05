import { CaretLeft } from '@phosphor-icons/react';

import { Button } from '@/components/elements/button';
import { styled } from '@linaria/react';

interface StyledDrawerProps {
  $isOpen?: boolean;
}

export interface DrawerProps extends StyledDrawerProps {
  onClose: () => void;
}

const DrawerContainer = styled.div<StyledDrawerProps>`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
  width: 100%;
  height: 100dvh;
  background-color: var(--ink-grey);
  transition: left 0.3s ease-in-out;
  box-shadow: ${({ $isOpen }) => ($isOpen ? ' 0 0 10px rgba(0, 0, 0, 0.1)' : 'initial')};
  z-index: 1000;
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
