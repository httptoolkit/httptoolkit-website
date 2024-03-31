import { StyledTagText, StyledTagsWrapper } from './overview-explorer.styled';
import { TagsDropwdown } from './tags-dropwdown';

import { Link } from '@/components/elements/link';
import { getAllCategoryTags } from '@/lib/mdx/blog';

const FEATURED_TAGS_COUNT = 5;

export const TagsNavigation = async () => {
  const tags = await getAllCategoryTags();
  const featuredTags = tags.slice(0, FEATURED_TAGS_COUNT);
  const ramainingTags = tags.slice(FEATURED_TAGS_COUNT, tags.length);

  return (
    <StyledTagsWrapper aria-label="Blog post tags">
      <ul>
        <li>
          <Link href={`/blog`}>
            <StyledTagText>All posts</StyledTagText>
          </Link>
        </li>
        {featuredTags.map(tag => (
          <li key={tag}>
            <Link href={`/blog?tags=${tag}`}>
              <StyledTagText>{tag}</StyledTagText>
            </Link>
          </li>
        ))}
        <li>
          <TagsDropwdown tags={ramainingTags} />
        </li>
      </ul>
    </StyledTagsWrapper>
  );
};
