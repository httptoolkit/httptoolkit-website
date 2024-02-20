import fs from 'fs';
import path from 'path';

import { compileMDX } from 'next-mdx-remote/rsc';

const rootDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

const markdowRegex = /\.(md|mdx)$/;

function isMarkdown(str: string) {
  return markdowRegex.test(str);
}

export const getPostBySlug = async (slug: string) => {
  const realSlug = slug.replace(markdowRegex, '');
  const filePath = path.join(rootDirectory, `${realSlug}.md`);

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
  });

  return { meta: { ...frontmatter, slug: realSlug }, content };
};

export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(rootDirectory);
  const posts = [];

  for (const file of files) {
    try {
      if (isMarkdown(file)) {
        const { meta } = await getPostBySlug(file);
        posts.push(meta);
      }
    } catch (error) {
      console.error('*_________START___________*');
      console.error('error in file: ', file);
      console.error('error message', error);
      console.error('*_________END___________*');
    }
  }
  return posts;
};
