export interface StyledDrawerProps {
  $isOpen?: boolean;
}

export interface DrawerProps extends StyledDrawerProps {
  onClose: () => void;
}
