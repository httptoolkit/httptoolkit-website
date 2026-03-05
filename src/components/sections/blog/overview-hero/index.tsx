import { styled } from '@linaria/react';

import { Badge } from '@/components/elements/badge';
import { Heading } from '@/components/elements/heading';
import { Image } from '@/components/elements/image';
import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { formatDateLongMonthYear } from '@/lib/utils/formatMonthYearDate';
import { screens } from '@/styles/tokens';

const StyledHeadingWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;

  @media (min-width: ${screens['lg']}) {
    text-align: start;
    margin-top: 64px;
    margin-bottom: 48px;
  }
`;

const StyledFeaturePost = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  border-radius: 12px;
  padding: 16px;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border),
    0 0 8px 0 var(--shadow-default);
  margin-bottom: 24px;

  @media (min-width: ${screens['lg']}) {
    padding: 32px;
    flex-direction: row;
  }
`;

const StyledPostImageWrapper = styled.div`
  width: 100%;

  & img {
    border-radius: 8px;
    overflow: hidden;
    max-height: 174px;
    min-height: 174px;

    @media (min-width: ${screens['lg']}) {
      max-height: fit-content;
      min-height: 100%;
    }
  }

  @media (min-width: ${screens['lg']}) {
    max-width: 540px;
    min-width: 540px;
    min-height: 271px;
  }
`;

const StyledPostDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;

const StyledExcerpt = styled(Text)`
  &&& {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    padding: 3px 0;
    text-overflow: ellipsis;

    display: -webkit-box;
  }
`;

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
