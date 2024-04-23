export const markdowRegex = /\.(md|mdx)$/;

export function isMarkdown(str: string) {
  return markdowRegex.test(str);
}
