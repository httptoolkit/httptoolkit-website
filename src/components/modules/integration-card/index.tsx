import {
  StyledIntegrationCardBorder,
  StyledIntegrationCardContentWrapper,
  StyledIntegrationCardLink,
  StyledIntegrationCardTitle,
  StyledIntegrationCardTitleWrapper,
  StyledIntegrationCardWrapper,
} from './integration-card.styles';
import type { IntegrationCardProps } from './integration-card.types';

import { Badge } from '@/components/elements/badge';
import { Heading } from '@/components/elements/heading';
import { ArrowRight } from '@/components/elements/icon';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';

export const IntegrationCard = ({
  title,
  icon,
  text,
  $showBadge,
  link,
  badgeText = 'MOST POPULAR',
}: IntegrationCardProps) => {
  return (
    <StyledIntegrationCardBorder aria-label={title} {...link} $showBadge={$showBadge}>
      <StyledIntegrationCardWrapper $showBadge={$showBadge}>
        <StyledIntegrationCardContentWrapper>
          <StyledIntegrationCardTitleWrapper>
            <StyledIntegrationCardTitle>
              <SquareIcon icon={icon} />
              <Heading as="h2" fontSize="xs" fontWeight="medium" color="lightGrey">
                {title}
              </Heading>
            </StyledIntegrationCardTitle>
            {$showBadge && <Badge variant="secondary">{badgeText}</Badge>}
          </StyledIntegrationCardTitleWrapper>
          <Text fontSize="l" color="darkGrey">
            {text}
          </Text>
        </StyledIntegrationCardContentWrapper>
        <StyledIntegrationCardLink>
          Learn more <ArrowRight size={16} weight="fill" />
        </StyledIntegrationCardLink>
      </StyledIntegrationCardWrapper>
    </StyledIntegrationCardBorder>
  );
};
