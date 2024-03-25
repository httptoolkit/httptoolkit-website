import fs from 'fs';
import path from 'path';

import { compileMDX } from 'next-mdx-remote/rsc';

import { defaultComponents } from '@/components/sections/rich-text/components';

const rootDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

const markdowRegex = /\.(md|mdx)$/;

function isMarkdown(str: string) {
  return markdowRegex.test(str);
}

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const realSlug = slug.replace(markdowRegex, '');
  const filePath = path.join(rootDirectory, `${realSlug}.md`);

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { frontmatter, content } = await compileMDX<PostFrontmatter>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: defaultComponents,
  });

  const post: Post = {
    title: frontmatter?.title ?? '',
    date: frontmatter?.date ?? '',
    coverImage: frontmatter?.cover_image ?? '',
    tags: frontmatter?.tags ? frontmatter?.tags.split(',')?.map(tag => tag?.trim()) : [],
    isFeatured: frontmatter?.isFeatured ?? false,
    isDraft: frontmatter?.draft ?? false,
    excerpt: '',
    slug: realSlug,
    author: frontmatter?.author
      ? {
          name: frontmatter.author,
          url: frontmatter.authorUrl ?? '',
        }
      : undefined,
    content,
  };

  return post;
};

export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(rootDirectory);
  const posts = [];

  for (const file of files) {
    try {
      if (isMarkdown(file)) {
        const post = await getPostBySlug(file);
        posts.push(post);
      }
    } catch (error) {
      // console.error('*_________START___________*');
      // console.error('error in file: ', file);
      // console.error('error message', error);
      // console.error('*_________END___________*');
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

  const tags: string[] = [];

  allPosts.map(post => {
    const formattedTags = post.tags.map(tag => tag.toLowerCase().trim());
    tags.push(...formattedTags);
  });

  const allCategoryTagsOrdered = [...new Set(tags)].sort((a, b) => a.localeCompare(b));

  return allCategoryTagsOrdered;
};
