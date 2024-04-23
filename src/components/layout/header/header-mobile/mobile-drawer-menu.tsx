'use client';

import { List } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/elements/button';
import { Drawer } from '@/components/modules/drawer';
import { usePathnameChange } from '@/lib/hooks/use-path-change';
import { isSSR } from '@/lib/utils';

export const MobileDrawerMenu = ({ children }: Component) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPathnameChanged } = usePathnameChange();
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const links = drawerRef.current?.querySelectorAll('a');
    links?.forEach(link => link.addEventListener('click', closeDrawer));

    return () => links?.forEach(link => link.removeEventListener('click', closeDrawer));
  }, []);

  useEffect(() => {
    if (!isSSR && window.document) {
      const overflow = isOpen ? 'hidden' : 'initial';
      document.body.style.overflow = overflow;
      document.documentElement.style.overflow = overflow;
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
        aria-label="Open mobile menu"
        $variant="secondary"
        onClick={toggleDrawer}
      >
        <List aria-hidden="true" size={16} color="currenColor" />
      </Button>
      <div ref={drawerRef}>
        <Drawer $isOpen={isOpen} onClose={toggleDrawer}>
          {children}
        </Drawer>
      </div>
    </>
  );
};
