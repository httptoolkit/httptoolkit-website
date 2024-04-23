import { useMedia } from 'react-use';

import { screens } from '@/styles';

export const useIsMobile = () => {
  const isMobile = useMedia(`(max-width: ${screens.lg})`, false);

  return isMobile;
};
