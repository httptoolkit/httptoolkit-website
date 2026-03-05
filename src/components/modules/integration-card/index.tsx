import type { Icon } from '@phosphor-icons/react';

import { Badge } from '@/components/elements/badge';
import { Heading } from '@/components/elements/heading';
import { ArrowRight } from '@/components/elements/icon';
import { Link, type LinkProps } from '@/components/elements/link';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';
import { styled } from '@linaria/react';
import { screens, fontSizes, fontWeight } from '@/styles/tokens';

export interface IntegrationCardProps {
  icon: Icon;
  badgeText?: string;
  title: string;
  text: string;
  link: LinkProps;
  isPopular?: boolean;
}

const StyledIntegrationCardBorder = styled(Link)`
  &&& {
    display: block;
    background: var(--button-border);
    padding: 1px;
    border-radius: 12px;
    box-shadow: 0px 0px 8px 0px var(--shadow-default);

    @media (hover: hover) {
      &:hover {
        background: var(--blue-gradient);
        box-shadow: none;
      }
    }
  }
`;

const StyledIntegrationCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  padding: 15px 15px 23px;
  background-color: var(--ink-black);

  @media (min-width: ${screens.lg}) {
    padding: 31px;
  }
`;

const StyledIntegrationCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledIntegrationCardTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  & *:nth-child(2) {
    flex-shrink: 0;
  }
`;

const StyledIntegrationCardTitle = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const StyledIntegrationCardLink = styled.p`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: ${fontSizes.button.small};
  font-weight: ${fontWeight.medium};
  color: var(--light-grey);
`;

export const IntegrationCard = ({ title, icon, text, isPopular, link }: IntegrationCardProps) => {
  return (
    <StyledIntegrationCardBorder aria-label={`Learn more about ${title} integration`} {...link}>
      <StyledIntegrationCardWrapper>
        <StyledIntegrationCardContentWrapper>
          <StyledIntegrationCardTitleWrapper>
            <StyledIntegrationCardTitle>
              <SquareIcon icon={icon} />
              <Heading as="h2" fontSize="xs" fontWeight="medium" color="lightGrey">
                {title}
              </Heading>
            </StyledIntegrationCardTitle>
            {isPopular && <Badge variant="secondary">MOST POPULAR</Badge>}
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
