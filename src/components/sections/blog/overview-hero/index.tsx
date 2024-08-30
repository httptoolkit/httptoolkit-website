import {
  StyledExcerpt,
  StyledFeaturePost,
  StyledHeadingWrapper,
  StyledPostDetails,
  StyledPostImageWrapper,
} from './overview-hero.styles';

import { Badge } from '@/components/elements/badge';
import { Heading } from '@/components/elements/heading';
import { Image } from '@/components/elements/image';
import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { formatDateLongMonthYear } from '@/lib/utils/formatMonthYearDate';

interface OverviewHeroProps {
  featuredPost: Post;
}

export const OverviewHero = ({ featuredPost }: OverviewHeroProps) => {
  const formatteDate = formatDateLongMonthYear(featuredPost.date);
  return (
    <>
      <StyledHeadingWrapper>
        <Heading fontSize="l" color="textGradient">
          Read the HTTP Toolkit Blog
        </Heading>
        <Text fontSize="l">Dig into HTTP in depth, hear about new HTTP Toolkit features & development, and explore a world of debugging & reverse engineering topics.</Text>
      </StyledHeadingWrapper>

      {featuredPost && (
        <Link
          aria-label={`Go to ${featuredPost.title}`}
          title={`Go to ${featuredPost.title}`}
          href={`/blog/${featuredPost.slug}`}
        >
          <StyledFeaturePost>
            <StyledPostImageWrapper>
              <Image width={540} height={303} src={`images/${featuredPost.coverImage}`} alt="" priority />
            </StyledPostImageWrapper>
            <StyledPostDetails>
              <Stack $gapxl="16px">
                <Stack $direction="row">
                  {featuredPost.tags.length && featuredPost.tags.map((tag: string) => <Badge>{tag}</Badge>)}
                </Stack>
                <Heading fontSize="m" as="h2" fontWeight="normal" color="white">
                  {featuredPost.title}
                </Heading>
                <StyledExcerpt fontSize="l" color="darkGrey">
                  {featuredPost.excerpt}
                </StyledExcerpt>
              </Stack>
              <Text as="span" fontSize="m" color="darkGrey">
                {formatteDate}
              </Text>
            </StyledPostDetails>
          </StyledFeaturePost>
        </Link>
      )}
    </>
  );
};
