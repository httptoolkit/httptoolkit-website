import {
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
          The HTTP Toolkit Blog
        </Heading>
        {/* TODO(gerald): generate excerpt from body content */}
        <Text fontSize="l">News, updates and advice on how to use your online HTTP Toolkit.</Text>
      </StyledHeadingWrapper>

      {featuredPost && (
        <Link aria-label={`Go to ${featuredPost.title}`} href={`/blog/${featuredPost.slug}`}>
          <StyledFeaturePost>
            <StyledPostImageWrapper>
              <Image
                width={540}
                height={303}
                src={`images/${featuredPost.coverImage}`}
                alt={featuredPost.title}
                priority
              />
            </StyledPostImageWrapper>
            <StyledPostDetails>
              <Stack $gapxl="16px">
                <Stack $direction="row">
                  {featuredPost.tags.length && featuredPost.tags.map((tag: string) => <Badge>{tag}</Badge>)}
                </Stack>
                <Heading fontSize="m" as="h2" fontWeight="normal" color="white">
                  {featuredPost.title}
                </Heading>
                <Text fontSize="l" color="darkGrey">
                  Theres been a lot of concern recently about the Web Environment Integrity proposal, developed by a
                  selection of authors from Google, and apparently being prototyped in Chromium.
                </Text>
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
