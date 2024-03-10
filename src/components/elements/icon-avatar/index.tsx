import { StyledAvatar } from './icon-avatar.styles';

import { RedditLogo, TwitterX, Article } from '@/components/elements/icon';

const IconResolver = {
  reddit: RedditLogo,
  article: Article,
  twitterX: TwitterX,
};

export type IconAvatar = keyof typeof IconResolver;

interface IconAvatarProps {
  icon: IconAvatar;
}
export const IconAvatar = ({ icon }: IconAvatarProps) => {
  const Icon = IconResolver[icon];

  return (
    <StyledAvatar>
      <Icon />
    </StyledAvatar>
  );
};
