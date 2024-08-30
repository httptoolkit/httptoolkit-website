import { useState } from 'react';

export const useDrawerState = (initialState: boolean) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(initialState);

  // Sync controlled state with drawer menu root state
  const handleOpenChange = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
  };

  // Close the drawer when a tag is clicked
  const handleOnClickTag = () => {
    setIsDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    handleOpenChange,
    handleOnClickTag,
  };
};
