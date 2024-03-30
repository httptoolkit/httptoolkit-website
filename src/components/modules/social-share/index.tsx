import { SocialShareContainer, SocialButton } from './social-share.styles';
import type { SocialShareProps } from './social-share.types';

import { TwitterX, FacebookLogo } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';

export const SocialShare = ({ url = 'https://httptoolkit.com/' }: SocialShareProps) => {
  return (
    <SocialShareContainer>
      <SocialButton
        href={`https://twitter.com/intent/tweet?hashtags=httptoolkit&text=HTTP%20Toolkit%20looks%20awesome!%20New%20open-source%20tool%20to%20intercept%2C%20debug%20%26%20build%20with%20HTTP.%20Download%20it%20now%20at&url=${encodeURIComponent(
          url,
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share HTTP Toolkit on Twitter"
      >
        <SquareIcon $size="mini" icon={TwitterX} />
      </SocialButton>
      <SocialButton
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share HTTP Toolkit on Facebook"
      >
        <SquareIcon $size="mini" icon={FacebookLogo} />
      </SocialButton>
    </SocialShareContainer>
  );
};
