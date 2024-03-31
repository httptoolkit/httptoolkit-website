export interface SocialShareProps extends Pick<Post, 'socialLinks'> {
  postTitle?: string;
  postUrl?: string;
}
