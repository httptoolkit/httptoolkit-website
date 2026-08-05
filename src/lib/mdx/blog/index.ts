import fs from 'fs/promises';
import path from 'path';

import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

import { extractExcerpt } from '../utils/extract-excerpt';
import { markdownRegex, isMarkdown } from '../utils/is-markdown';

import { defaultComponents, postComponents } from '@/components/sections/rich-text/components';

const rootDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

const buildPostMeta = (realSlug: string, fileContent: string): PostMeta => {
  const frontmatter = matter(fileContent).data as PostFrontmatter;

  return {
    title: frontmatter?.title ?? '',
    date: frontmatter?.date ?? '',
    coverImage: frontmatter?.cover_image ?? '',
    tags: frontmatter?.tags ? frontmatter?.tags.split(',')?.map(tag => tag?.trim()) : [],
    isFeatured: frontmatter?.isFeatured ?? false,
    isDraft: frontmatter?.draft ?? false,
    excerpt: extractExcerpt(fileContent),
    slug: realSlug,
    author: {
      name: frontmatter.author ?? 'Tim Perry',
      url: frontmatter.authorUrl ?? 'https://tim.fyi/',
    },
    socialLinks: {
      twitterUrl: frontmatter.twitterUrl,
      devToUrl: frontmatter.devToUrl,
      redditUrl: frontmatter.redditUrl,
      hackerNewsUrl: frontmatter.hackerNewsUrl,
      productHuntUrl: frontmatter.productHuntUrl,
    },
  };
};

const readPost = async (slug: string) => {
  const realSlug = slug.replace(markdownRegex, '');
  const fileContent = await fs.readFile(path.join(rootDirectory, `${realSlug}.mdx`), { encoding: 'utf8' });
  return { realSlug, fileContent };
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const { realSlug, fileContent } = await readPost(slug);

  const { content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true, blockJS: false },
    components: { ...defaultComponents, ...postComponents },
  });

  return { ...buildPostMeta(realSlug, fileContent), content };
};

/**
 * Metadata only - deliberately no compiled `content`.
 *
 * Listing pages pass these straight into client components, so anything returned here
 * ends up serialized into the page's RSC payload. Including the compiled body of every
 * post took the blog index to 3.2MB (485KB over the wire), for content that only the
 * individual post pages ever render.
 */
export const getPostMetaBySlug = async (slug: string): Promise<PostMeta> => {
  const { realSlug, fileContent } = await readPost(slug);
  return buildPostMeta(realSlug, fileContent);
};

export const getAllPostsMeta = async (): Promise<PostMeta[]> => {
  const files = await fs.readdir(rootDirectory);
  const posts: PostMeta[] = [];

  for (const file of files) {
    try {
      if (isMarkdown(file)) {
        posts.push(await getPostMetaBySlug(file));
      }
    } catch (error) {
      console.error('*_________START___________*');
      console.error('error in file: ', file);
      console.error('error message', error);
      console.error('*_________END___________*');
    }
  }
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getRelatedPosts = async ({ tags, currentPostSlug }: { tags: string[]; currentPostSlug: string }) => {
  const allPosts = await getAllPostsMeta();

  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPostSlug)
    .filter(post => {
      return tags.some(tag => post.tags.includes(tag));
    })
    .slice(0, 3);

  return relatedPosts;
};

export const getAllCategoryTags = async () => {
  const allPosts = await getAllPostsMeta();

  const tagCounts: { [key: string]: number } = {};

  allPosts.forEach(post => {
    post.tags.forEach((tag: string) => {
      const formattedTag = tag.toLowerCase().trim();
      tagCounts[formattedTag] = (tagCounts[formattedTag] || 0) + 1;
    });
  });

  const allCategoryTagsOrdered = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

  return allCategoryTagsOrdered;
};
