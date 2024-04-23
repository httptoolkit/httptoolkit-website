import 'server-only';

import fs from 'fs';

import { compileMDX } from 'next-mdx-remote/rsc';

import { getHeadingLinks } from '../utils/get-heading-links';

import { defaultComponents } from '@/components/sections/rich-text/components';

export const getPageContent = async (fileContentPath: string) => {
  const fileContent = fs.readFileSync(fileContentPath, { encoding: 'utf8' });

  const { content } = await compileMDX<PostFrontmatter>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: { ...defaultComponents },
  });

  const pageTocLinks = await getHeadingLinks(fileContentPath);

  return {
    content,
    pageTocLinks,
  };
};
