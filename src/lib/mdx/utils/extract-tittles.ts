import fs from 'fs';

import matter from 'gray-matter';

export interface HeadingGroup {
  text: string;
  level: 2 | 3 | 4 | 5 | 6;
  subItems?: HeadingGroup[];
}

export function getHeadings(source: string): HeadingGroup[] {
  const headingLines = source.split('\n').filter(line => {
    return line.match(/^###*\s/);
  });

  return headingLines.map(raw => {
    const text = raw.replace(/^###*\s/, '');
    const level = raw.slice(0, 3) === '###' ? 3 : 2;

    return { text, level };
  });
}

export async function extractHeadingsFromMDX(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContent);
  const headings = getHeadings(content);

  return headings;
}
