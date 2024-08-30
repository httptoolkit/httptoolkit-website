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

export const IntegrationCard = ({ title, icon, text, $isPopular, link }: IntegrationCardProps) => {
  return (
    <StyledIntegrationCardBorder aria-label={`Learn more about ${title} integration`} $isPopular={$isPopular} {...link}>
      <StyledIntegrationCardWrapper $isPopular={$isPopular}>
        <StyledIntegrationCardContentWrapper>
          <StyledIntegrationCardTitleWrapper>
            <StyledIntegrationCardTitle>
              <SquareIcon icon={icon} />
              <Heading as="h2" fontSize="xs" fontWeight="medium" color="lightGrey">
                {title}
              </Heading>
            </StyledIntegrationCardTitle>
            {$isPopular && <Badge variant="secondary">MOST POPULAR</Badge>}
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
