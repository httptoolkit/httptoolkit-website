type Component<T = unknown> = T & {
  children?: React.ReactNode;
  className?: string;
};

interface Image {
  src: string;
  alt?: string;
}

interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  cover_image: string;
  tags: string;
  isFeatured?: boolean;
  draft?: boolean;
  twitterUrl?: string;
  redditUrl?: string;
  hackerNewsUrl?: string;
  devToUrl?: string;
  author?: string;
  authorUrl?: string;
}

interface Post {
  title: string;
  slug: string;
  date: string;
  coverImage: string;
  tags: string[];
  isFeatured: boolean;
  isDraft: boolean;
  excerpt?: string;
  content: any;
  author?: {
    name: string;
    url: string;
  };
  socialLinks?: {
    twitterUrl?: string;
    redditUrl?: string;
    hackerNewsUrl?: string;
    devToUrl?: string;
  };
}
