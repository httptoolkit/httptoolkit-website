import { StyledTagsMobileWrapper } from './overview-explorer.styled';
import { TagsDrawer } from './tags-drawer';

import { getAllCategoryTags } from '@/lib/mdx/blog';

export const TagsMobileNavigation = async () => {
  const tags = await getAllCategoryTags();

  return (
    <StyledTagsMobileWrapper aria-label="Blog mobile post tags">
      <TagsDrawer tags={tags} />
    </StyledTagsMobileWrapper>
  );
};
