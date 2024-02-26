'use client';

import { List } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/elements/button';
import { Drawer } from '@/components/modules/drawer';
import { usePathnameChange } from '@/lib/hooks/use-path-change';
import { isSSR } from '@/lib/utils';

export const MobileDrawerMenu = ({ children }: Component) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPathnameChanged } = usePathnameChange();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isSSR && window.document) {
      const overflow = isOpen ? 'hidden' : 'auto';
      document.body.style.overflow = overflow;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isPathnameChanged) {
      setIsOpen(false);
    }
  }, [isPathnameChanged]);

  return (
    <>
      <Button
        style={{ width: 48, height: 48, padding: 0 }}
        aria-label="openmobilemenu"
        $variant="secondary"
        onClick={toggleDrawer}
      >
        <List aria-hidden="true" size={16} color="currenColor" />
      </Button>
      <Drawer $isOpen={isOpen} onClose={toggleDrawer}>
        {children}
      </Drawer>
    </>
  );
};
