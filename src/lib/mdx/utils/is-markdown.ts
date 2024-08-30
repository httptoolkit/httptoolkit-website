export const markdownRegex = /\.(md|mdx)$/;

export function isMarkdown(str: string) {
  return markdownRegex.test(str);
}
