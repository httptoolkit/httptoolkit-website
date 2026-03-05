import type { Icon } from '@phosphor-icons/react';

import { styled } from '@linaria/react';

import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Logo, X } from '@/components/elements/icon';
import type { CustomIcon } from '@/components/elements/icon/custom/types';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { Breadcrumbs } from '@/components/modules/breadcrumbs';
import { DownloadButton } from '@/components/modules/download-button';
import { screens } from '@/styles/tokens';

interface IntegrationSinglePageHeroProps {
  title: string;
  text: string;
  icon?: Icon | CustomIcon;
  additionalIcons?: Icon[] | CustomIcon[];
  breadcrumbText: string;
  isMultipleIcons?: boolean;
}

const StyledIntegrationHeroWrapper = styled.div`
  padding-top: 32px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    padding-top: 64px;
    padding-bottom: 64px;
    gap: 96px;

    & > * {
      width: 50%;
    }
  }
`;

const StyledIntegrationHeroContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const StyledIntegrationHeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${screens.lg}) {
    & > * {
      text-align: center;
    }
  }
`;

const StyledIntegrationHeroImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 190px;
  border-radius: 16px;
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0 0 24px 0 var(--shadow-inner-box);
  background-color: var(--ink-black);
  background-image: var(--background-gradient),
    var(--background-func-gradient),
    var(--background-dots);
  background-position:
    center -250px,
    center,
    center;
  background-size:
    602px 384.19px,
    100% 100%,
    524px 248px;
  background-repeat: no-repeat, no-repeat, repeat;
`;

const StyledIntegrationHeroImageMultiple = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 37px;
  align-items: center;
  padding: 80px 0;

  @media (min-width: ${screens.lg}) {
    padding: 0;
  }

  & svg:first-child {
    color: var(--cinnabar-red);
  }
`;

const StyledIntegrationHeroImage = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  @media (min-width: ${screens.lg}) {
    gap: 64px;
  }

  & > * {
    flex-shrink: 0;
    width: 64px;
    height: 64px;

    @media (min-width: ${screens.lg}) {
      width: 116px;
      height: 116px;
    }
  }

  & > *:nth-child(1) {
    color: var(--electric-blue);
  }

  & > *:nth-child(2) {
    width: 26px;
    height: 26px;
    color: var(--light-grey);

    @media (min-width: ${screens.lg}) {
      width: 48px;
      height: 48px;
    }
  }

  & > *:nth-child(3) {
    color: var(--cinnabar-red);
  }
`;

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
