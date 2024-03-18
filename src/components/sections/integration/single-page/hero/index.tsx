import {
  StyledIntegrationHeroContent,
  StyledIntegrationHeroContentWrapper,
  StyledIntegrationHeroImage,
  StyledIntegrationHeroImageWrapper,
  StyledIntegrationHeroWrapper,
} from './hero.styles';
import type { IntegrationSinglePageHeroProps } from './hero.types';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Logo, X } from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { Breadcrumbs } from '@/components/modules/breadcrumbs';
import { DownloadButton } from '@/components/modules/download-button';

const breadcrumbs = [
  {
    href: '/',
    text: 'Main page',
  },
  {
    href: '/all-integrations',
    text: 'integrations',
  },
];

export const IntegrationSinglePageHero = ({
  title,
  text,
  icon: Icon,
  breadcrumbText,
}: IntegrationSinglePageHeroProps) => {
  return (
    <Container as="section">
      <StyledIntegrationHeroWrapper>
        <StyledIntegrationHeroContentWrapper>
          <Breadcrumbs links={[...breadcrumbs, { text: breadcrumbText }]} />
          <StyledIntegrationHeroContent>
            <Heading fontSize="l" color="textGradient">
              {title}
            </Heading>
            <Text fontSize="m" color="darkGrey">
              {text}
            </Text>
            <DownloadButton $variant="primary" />
          </StyledIntegrationHeroContent>
        </StyledIntegrationHeroContentWrapper>
        <StyledIntegrationHeroImageWrapper>
          <StyledIntegrationHeroImage>
            <Icon />
            <X />
            <Logo />
          </StyledIntegrationHeroImage>
        </StyledIntegrationHeroImageWrapper>
      </StyledIntegrationHeroWrapper>
    </Container>
  );
};
