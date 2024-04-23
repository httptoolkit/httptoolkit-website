/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import matter from 'gray-matter';

function firstFourLines(input) {
  // Remove Markdown syntax and custom components
  const sanitizedContent = input.content
    // remove initial heading so it will take first pharagrap
    .replace(/^(#+\s.*\n?)\n*/m, '')
    // Remove links
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    // Remove images ![alt](src)
    .replace(/!\[[^\]]*]\((.*?)\)/g, '')
    // Remove custom components like <HighlightedParagraphs>
    .replace(/<.*?>/g, '')
    .replace(/`/g, '"')
    .replace(/[_*]+/g, '');

  // Split the sanitized content into lines and join the first four lines
  input.excerpt = sanitizedContent.split('\n').slice(0, 4).join(' ');
}

export const extractExcerpt = (fileContent: any) => {
  return matter([fileContent].join('\n'), { excerpt: firstFourLines })?.excerpt;
};
