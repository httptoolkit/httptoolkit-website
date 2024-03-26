import { StyledCTAWrapper, StyledContainer, StyledExcerpt, StyledHeroWrapper } from './cta.styles';
import type { CTAProps } from './cta.types';

import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import type { HeadingProps } from '@/components/elements/heading/heading.types';
import { SquareIcon } from '@/components/elements/square-icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import type { TextProps } from '@/components/elements/text/text.types';
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
  variant = 'cta-hero',
  $bgVariant = 'default',
  className,
  children,
}: CTAProps) => {
  const SubHeadingIcon = subHeading?.icon;
  const isHero = ['cta-hero', 'pricing-hero'].includes(variant);
  const HeadingSize: HeadingProps['fontSize'] = isHero && variant !== 'pricing-hero' ? 'xl' : 'l';
  const asTitle = isHero ? 'h1' : 'h3';
  const isLargeText = textAppearance === 'large';
  const labelSize: TextProps['fontSize'] = variant === 'pricing-hero' ? 'm' : 'xll';
  const excerptSize = variant === 'pricing-hero' ? 'm' : 'l';

  return (
    <StyledHeroWrapper $variant={variant} $bgVariant={$bgVariant} className={className}>
      <StyledContainer>
        {icon && (
          <SquareIcon $size={isHero ? 'xLarge' : 'medium'} $variant={isHero ? 'primary' : 'secondary'} icon={icon} />
        )}
        {subHeading && (
          <Text as="label" color="cinnarbarRed" fontSize={labelSize} fontWeight="bold">
            {subHeading?.text} {SubHeadingIcon && <SubHeadingIcon weight="fill" />}
          </Text>
        )}
        <Stack $gapxl="24px">
          <Heading color="textGradient" as={asTitle} fontSize={HeadingSize}>
            {heading}
          </Heading>
          {excerpt && (
            <StyledExcerpt fontSize={excerptSize} $isLargeText={isLargeText}>
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

        {image && (
          <ThemedImage
            width={1116}
            height={627}
            title={heading || image.title}
            {...image}
            loading={isHero ? 'eager' : 'lazy'}
          />
        )}
      </StyledContainer>
      {children}
    </StyledHeroWrapper>
  );
};
