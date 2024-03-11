import fs from 'fs';
import path from 'path';

import { compileMDX } from 'next-mdx-remote/rsc';

import { components } from './components';

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
    components,
  });

  const post: Post = {
    title: frontmatter?.title ?? '',
    date: frontmatter?.date ?? '',
    coverImage: frontmatter?.cover_image ?? '',
    tags: frontmatter?.tags ? frontmatter?.tags.split(',') : [],
    isFeatured: frontmatter?.isFeatured ?? false,
    isDraft: frontmatter?.draft ?? false,
    excerpt: '',
    slug: realSlug,
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
  return posts;
};
