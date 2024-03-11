import { StyledCTAWrapper, StyledContainer, StyledExcerpt, StyledHeroWrapper } from './cta.styles';
import type { CTAProps } from './cta.types';

import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import { SquareIcon } from '@/components/elements/square-icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { DownloadButton } from '@/components/modules/download-button';

export const CTA = ({
  icon,
  heading,
  subHeading,
  excerpt,
  cta,
  withDownload = true,
  textAppearance = 'large',
  image,
  $variant = 'cta-hero',
  $bgVariant = 'default',
}: CTAProps) => {
  const SubHeadingIcon = subHeading?.icon;
  const isHero = $variant === 'cta-hero';
  const asTitle = isHero ? 'h1' : 'h3';
  const isLargeText = textAppearance === 'large';

  return (
    <StyledHeroWrapper $variant={$variant} $bgVariant={$bgVariant}>
      <StyledContainer>
        {icon && (
          <SquareIcon $size={isHero ? 'xLarge' : 'medium'} $variant={isHero ? 'primary' : 'secondary'} icon={icon} />
        )}
        {subHeading && (
          <Text as="label" color="cinnarbarRed" fontSize="xll" fontWeight="bold">
            {subHeading?.text} {SubHeadingIcon && <SubHeadingIcon weight="fill" />}
          </Text>
        )}
        <Stack $gapxl="24px">
          <Heading color="textGradient" as={asTitle} fontSize={isHero ? 'xl' : 'l'}>
            {heading}
          </Heading>
          {excerpt && (
            <StyledExcerpt fontSize="l" $isLargeText={isLargeText}>
              {excerpt}
            </StyledExcerpt>
          )}
        </Stack>
        {(withDownload || cta) && (
          <StyledCTAWrapper $isLargeText={isLargeText}>
            {withDownload ? (
              <DownloadButton $variant="primary" $withBorder={isHero} aria-label="Download Items" />
            ) : null}

            {cta && (
              <Button as="link" $variant={cta.$variant || 'secondary'} href={cta.href} icon={cta.icon}>
                {cta.title}
              </Button>
            )}
          </StyledCTAWrapper>
        )}

        {image && <ThemedImage title={heading || image.title} {...image} loading={isHero ? 'eager' : 'lazy'} />}
      </StyledContainer>
    </StyledHeroWrapper>
  );
};
