import { styled } from '@linaria/react';

import { RedditLogo, XLogo, Article } from '@/components/elements/icon';

const StyledAvatar = styled.div`
  min-width: 48px;
  height: 48px;
  border-radius: 100%;
  background: var(--ink-black);
  box-shadow: 0 0 0 1px var(--button-border);
  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    font-size: 1.5rem;
    width: 25px;
    height: 25px;
    fill: var(--electric-light-blue);
  }
`;

const IconResolver = {
  reddit: RedditLogo,
  article: Article,
  twitterX: XLogo,
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
