import { SocialShareContainer, SocialButton } from './post-share.styles';
import type { SocialShareProps } from './post-share.types';
import { WebShare } from './web-share';

import { TwitterX, RedditLogo, DevToLogo, YCombinator, ProductHuntLogo } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';

export const SocialPostShare = ({ postTitle, postUrl, socialLinks }: SocialShareProps) => {
  return (
    <SocialShareContainer>
      <Text fontSize="m">Share this post:</Text>
      <Stack $direction="row" $gap="8px" $gapxl="8px">
        <SocialButton
          href={socialLinks?.twitterUrl || `https://twitter.com/intent/tweet?text=${postTitle}&url=${postUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${postTitle} on Twitter`}
        >
          <SquareIcon $size="mini" icon={TwitterX} />
        </SocialButton>

        <SocialButton
          href={socialLinks?.redditUrl || `http://www.reddit.com//submit?url=${postUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share this post on Reddit"
        >
          <SquareIcon $size="mini" icon={RedditLogo} />
        </SocialButton>

        <SocialButton
          href={socialLinks?.hackerNewsUrl || `https://news.ycombinator.com/submitlink?u=${postUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share this post on Hacker News"
        >
          <SquareIcon $size="mini" icon={YCombinator} />
        </SocialButton>

        {socialLinks?.devToUrl && (
          <SocialButton
            href={socialLinks.devToUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share this post on Dev.to"
          >
            <SquareIcon $size="mini" icon={DevToLogo} />
          </SocialButton>
        )}

        {socialLinks?.productHuntUrl && (
          <SocialButton
            href={socialLinks.productHuntUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share this post on Product Hunt"
          >
            <SquareIcon $size="mini" icon={ProductHuntLogo} />
          </SocialButton>
        )}

        <WebShare postTitle={postTitle} postUrl={postUrl} />
      </Stack>
    </SocialShareContainer>
  );
};
