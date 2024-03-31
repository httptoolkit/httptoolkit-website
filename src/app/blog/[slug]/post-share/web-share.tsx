'use client';

import { SocialButton } from './post-share.styles';
import type { SocialShareProps } from './post-share.types';

import { ShareNetwork } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import { isSSR } from '@/lib/utils';

export const WebShare = ({ postTitle, postUrl }: SocialShareProps) => {
  if (isSSR || !navigator || !navigator.share) {
    return null;
  }

  return (
    <SocialButton
      title="Share this post"
      aria-label="Share this post"
      onClick={() => {
        navigator.share({
          text: postTitle,
          url: postUrl,
        });
      }}
    >
      <SquareIcon $size="mini" icon={ShareNetwork} />
    </SocialButton>
  );
};
