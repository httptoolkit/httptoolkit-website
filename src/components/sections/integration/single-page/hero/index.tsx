import {
  StyledIntegrationHeroContent,
  StyledIntegrationHeroContentWrapper,
  StyledIntegrationHeroImage,
  StyledIntegrationHeroImageMultiple,
  StyledIntegrationHeroImageWrapper,
  StyledIntegrationHeroWrapper,
} from './hero.styles';
import type { IntegrationSinglePageHeroProps } from './hero.types';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Logo, X } from '@/components/elements/icon';
import Stack from '@/components/elements/stack';
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
  adittionalIcons,
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
          {Icon ? (
            <StyledIntegrationHeroImage>
              <Icon />
              <X />
              <Logo />
            </StyledIntegrationHeroImage>
          ) : (
            <StyledIntegrationHeroImageMultiple>
              <Logo width={109} />
              <Stack $direction="row" $gapxl="32px">
                {adittionalIcons?.map((Icon, idx) => <Icon key={idx} height={64} />)}
              </Stack>
            </StyledIntegrationHeroImageMultiple>
          )}
        </StyledIntegrationHeroImageWrapper>
      </StyledIntegrationHeroWrapper>
    </Container>
  );
};
