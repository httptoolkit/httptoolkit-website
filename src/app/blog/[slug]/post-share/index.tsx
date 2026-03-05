import dynamic from 'next/dynamic';

import { styled } from '@linaria/react';

import { TwitterX, RedditLogo, DevToLogo, YCombinator, ProductHuntLogo, Butterfly } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { siteMetadata } from '@/lib/site-metadata';

const WebShare = dynamic(() => import('@/components/modules/social-share/web-share'), { ssr: false });

interface SocialShareProps extends Pick<Post, 'socialLinks'> {
  postTitle?: string;
  postUrl?: string;
}

const SocialShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 8px;
  margin-top: 64px;
`;

const SocialButton = styled.a`
  display: inline-flex;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const SocialPostShare = ({ postTitle, postUrl, socialLinks }: SocialShareProps) => {
  const fullPostUrl = `${siteMetadata.siteUrl}/blog/${postUrl}/`;

  return (
    <SocialShareContainer>
      <Text fontSize="m">Share this post:</Text>
      <Stack $direction="row" $gap="8px" $gapxl="8px">
        <SocialButton
          href={socialLinks?.blueskyUrl || `https://bsky.app/intent/compose?text=${postTitle}%3Cbr%3E%3Cbr%3E${fullPostUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${postTitle} on BlueSky`}
        >
          <SquareIcon $size="mini" icon={Butterfly} />
        </SocialButton>

        <SocialButton
          href={socialLinks?.twitterUrl || `https://twitter.com/intent/tweet?text=${postTitle}&url=${fullPostUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${postTitle} on Twitter`}
        >
          <SquareIcon $size="mini" icon={TwitterX} />
        </SocialButton>

        <SocialButton
          href={socialLinks?.redditUrl || `http://www.reddit.com//submit?url=${fullPostUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share this post on Reddit"
        >
          <SquareIcon $size="mini" icon={RedditLogo} />
        </SocialButton>

        <SocialButton
          href={socialLinks?.hackerNewsUrl || `https://news.ycombinator.com/submitlink?u=${fullPostUrl}`}
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

        <WebShare title={postTitle} url={fullPostUrl} />
      </Stack>
    </SocialShareContainer>
  );
};
