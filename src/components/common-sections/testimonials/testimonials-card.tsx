import { marked } from 'marked';

import { StyledAuthorDetails, StyledAuthorWrapper, StyledQuote, StyledTestimonialCard } from './testimonials.styles';

import { IconAvatar } from '@/components/elements/icon-avatar';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { renderer } from '@/lib/marked/link-target-render';

export interface TestimonialsCardProps {
  quote: string;
  sourceName: string;
  sourceLink: string;
  sourceLinkText: string;
  type?: IconAvatar;
}

export const TestimonialsCard = ({
  quote,
  type = 'article',
  sourceName,
  sourceLink,
  sourceLinkText,
}: TestimonialsCardProps) => {
  if (!quote) {
    return null;
  }

  return (
    <StyledTestimonialCard cite={sourceLink}>
      <StyledQuote dangerouslySetInnerHTML={{ __html: marked.parse(quote, { renderer }) }} />
      <StyledAuthorWrapper>
        <IconAvatar icon={type} />
        <StyledAuthorDetails>
          <Text fontSize="l" fontWeight="medium">
            {sourceName}
          </Text>
          <Link href={sourceLink}>
            <Text fontSize="m">{sourceLinkText}</Text>
          </Link>
        </StyledAuthorDetails>
      </StyledAuthorWrapper>
    </StyledTestimonialCard>
  );
};
