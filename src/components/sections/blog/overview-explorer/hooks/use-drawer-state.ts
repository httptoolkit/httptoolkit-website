import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useDrawerState = (initialState: boolean) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(initialState);
  const router = useRouter();

  // Sync controlled state with drawer menu root state
  const handleOpenChange = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
  };

  // Close the drawer when a tag is clicked
  const handleOnClickTag = (tag?: string) => {
    const url = tag ? `/blog?tags=${tag}` : `/blog`;

    router.push(url, { scroll: false });
    setIsDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    handleOpenChange,
    handleOnClickTag,
  };
};
