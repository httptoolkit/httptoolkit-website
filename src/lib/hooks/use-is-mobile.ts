import { useMedia } from './use-media';

import { screens } from '@/styles/tokens';

export const useIsMobile = () => {
  const isMobile = useMedia(`(max-width: ${screens.lg})`, false);

  return isMobile;
};
