import { join } from 'path';

import { extractHeadingsFromMDX } from './extract-titles';
import { groupByLevel } from './group-by-level';
import { formatLinks } from './groups-to-links';

export async function getHeadingLinks(path: string, withParentHref = true) {
  const filePath = join(process.cwd(), path);
  const headings = await extractHeadingsFromMDX(filePath);
  const groups = groupByLevel(headings);
  const links = formatLinks(groups, withParentHref);

  return links;
}
