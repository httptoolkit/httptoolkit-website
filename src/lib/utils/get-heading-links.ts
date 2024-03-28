import { join } from 'path';

import { groupByLevel } from './group-by-level';
import { formatLinks } from './groups-to-links';
import { extractHeadingsFromMDX } from '../mdx/utils/extract-tittles';

export async function getHeadingLinks(path: string, withParentHref = true) {
  const filePath = join(process.cwd(), path);
  const headings = await extractHeadingsFromMDX(filePath);
  const groups = groupByLevel(headings);
  const links = formatLinks(groups, withParentHref);

  return links;
}
