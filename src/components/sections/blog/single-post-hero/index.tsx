import { styled } from '@linaria/react';

import { Badge } from '@/components/elements/badge';
import { Heading } from '@/components/elements/heading';
import { CaretLeft } from '@/components/elements/icon';
import { Image } from '@/components/elements/image';
import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { screens } from '@/styles/tokens';
import { formatDateLongMonthYear } from '@/lib/utils/formatMonthYearDate';

const StyledSinglePost = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  border-radius: 12px;
  padding: 16px;
  margin-top: 32px;
  background-color: var(--ink-black);
  box-shadow:
    0 0 0 1px var(--button-border),
    0 0 8px 0 var(--shadow-default);
  margin-bottom: 24px;

  @media (min-width: ${screens['lg']}) {
    padding: 32px;
    align-items: normal;
    margin-top: 64px;
    flex-direction: row;
    gap: 64px;
  }
`;

const StyledGoBack = styled.div`
  display: none;

  & a {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &[data-display-on="desktop"] {
    @media (min-width: ${screens['lg']}) {
      display: block;
    }
  }

  &[data-display-on="mobile"] {
    @media (max-width: ${screens['lg']}) {
      display: block;
      margin-top: 16px;
      margin-bottom: 32px;
    }
  }
`;

const StyledPostMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSinglePostImageWrapper = styled.div`
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
    max-width: 607px;
    min-width: 200px;
  }
`;

const StyledSinglePostDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: ${screens['lg']}) {
    word-break: break-word;
  }
`;

const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (min-width: ${screens['lg']}) {
    display: none;
    visibility: hidden;
  }
`;

interface SinglePostHeroProps {
  post: Post;
}

const GoBack = ({ displayOn }: { displayOn: 'desktop' | 'mobile' }) => {
  return (
    <StyledGoBack data-display-on={displayOn}>
      <Link href="/blog">
        <CaretLeft weight="fill" />
        <Text as="label" fontSize="m" fontWeight="bold" color="white">
          GO BACK TO BLOG
        </Text>
      </Link>
    </StyledGoBack>
  );
};

export const SinglePostHero = ({ post }: SinglePostHeroProps) => {
  const formatteDate = formatDateLongMonthYear(post.date);

  return (
    <StyledSinglePost>
      <StyledSinglePostDetails>
        <GoBack displayOn="desktop" />
        <Stack $gap="16px">
          <StyledTags>{post.tags.length && post.tags.map((tag: string) => <Badge>{tag}</Badge>)}</StyledTags>
          <Heading fontSize="l" fontWeight="normal" color="white">
            {post.title}
          </Heading>
        </Stack>
        <StyledPostMeta>
          <Text as="span" fontSize="l" color="darkGrey">
            {formatteDate}
          </Text>
          {post.author && (
            <Link href={post.author.url} target="_blank">
              <Text as="span" fontSize="l" color="darkGrey">
                Author: {post.author.name}
              </Text>
            </Link>
          )}
        </StyledPostMeta>
      </StyledSinglePostDetails>

      <StyledSinglePostImageWrapper>
        <GoBack displayOn="mobile" />
        <Image width={607} height={296} src={`images/${post.coverImage}`} alt="" priority />
      </StyledSinglePostImageWrapper>
    </StyledSinglePost>
  );
};
