'use client';

import { SocialButton } from './social-share.styles';
import type { WebShareProps } from './social-share.types';

import { ShareNetwork } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import { useMounted } from '@/lib/hooks/use-mounted';
import { isSSR } from '@/lib/utils';

const WebShare = ({ title, url }: WebShareProps) => {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }

  if (isSSR || !navigator || !navigator.share) {
    return null;
  }

  return (
    <SocialButton
      title="Share this post"
      aria-label="Share this post"
      onClick={() => {
        navigator.share({
          text: title,
          url: url,
        });
      }}
    >
      <SquareIcon $size="mini" icon={ShareNetwork} />
    </SocialButton>
  );
};

export default WebShare;
