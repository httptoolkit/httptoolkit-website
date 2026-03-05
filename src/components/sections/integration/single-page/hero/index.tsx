import type { Icon } from '@phosphor-icons/react';

import {
  StyledIntegrationHeroWrapper,
  StyledIntegrationHeroContentWrapper,
  StyledIntegrationHeroContent,
  StyledIntegrationHeroImageWrapper,
  StyledIntegrationHeroImageMultiple,
  StyledIntegrationHeroImage,
} from './hero.styles';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Logo, X } from '@/components/elements/icon';
import type { CustomIcon } from '@/components/elements/icon/custom/types';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { Breadcrumbs } from '@/components/modules/breadcrumbs';
import { DownloadButton } from '@/components/modules/download-button';

interface IntegrationSinglePageHeroProps {
  title: string;
  text: string;
  icon?: Icon | CustomIcon;
  additionalIcons?: Icon[] | CustomIcon[];
  breadcrumbText: string;
  isMultipleIcons?: boolean;
}

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
  additionalIcons,
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
                {additionalIcons?.map((Icon, idx) => <Icon key={idx} height={64} />)}
              </Stack>
            </StyledIntegrationHeroImageMultiple>
          )}
        </StyledIntegrationHeroImageWrapper>
      </StyledIntegrationHeroWrapper>
    </Container>
  );
};
