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
  $isFooterClose = false,
  className,
  children,
  downloadButtonDefaultOsValue,
}: CTAProps) => {
  const SubHeadingIcon = subHeading?.icon;
  const isHero = ['cta-hero', 'cta-narrow'].includes(variant);
  const HeadingSize: HeadingProps['fontSize'] = isHero && variant !== 'cta-narrow' ? 'xl' : 'l';
  const asTitle = isHero ? 'h1' : 'h2';
  const isLargeText = textAppearance === 'large';
  const labelSize: TextProps['fontSize'] = variant === 'cta-narrow' ? 'm' : 'xll';
  const excerptSize = variant === 'cta-narrow' ? 'm' : 'l';

  return (
    <StyledHeroWrapper
      data-cta="true"
      $footerClose={$isFooterClose}
      $variant={variant}
      $bgVariant={$bgVariant}
      className={className}
    >
      <StyledContainer data-container>
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
          {excerpt &&
            (typeof excerpt === 'string' ? (
              <StyledExcerpt fontSize={excerptSize} $isLargeText={isLargeText}>
                {excerpt}
              </StyledExcerpt>
            ) : (
              <>{excerpt}</>
            ))}
        </Stack>
        {(withDownload || cta) && (
          <StyledCTAWrapper $isLargeText={isLargeText}>
            {withDownload ? (
              <DownloadButton
                $variant="primary"
                $withBorder={isHero}
                aria-label="Download Items"
                fixedOS={downloadButtonDefaultOsValue}
              />
            ) : null}

            {cta && (
              <Button
                as={cta.as}
                $variant={cta.$variant || 'secondary'}
                href={cta.href}
                icon={cta.icon}
                $withBorder={cta.$withBorder}
              >
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
            sizes="(max-width: 600px) 50vw, 75vw"
            {...image}
            loading={isHero ? 'eager' : 'lazy'}
          />
        )}
      </StyledContainer>
      {children}
    </StyledHeroWrapper>
  );
};
