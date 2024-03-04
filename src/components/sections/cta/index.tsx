import { StyledCTAWrapper, StyledContainer, StyledExcerpt, StyledHeroWrapper } from './cta.styles';

import { Button } from '@/components/elements/button';
import type { ButtonProps } from '@/components/elements/button/button.types';
import { Heading } from '@/components/elements/heading';
import { SquareIcon } from '@/components/elements/square-icon';
import type { IconType } from '@/components/elements/square-icon/square-icon.types';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemedImage, type ThemeImageProps } from '@/components/elements/themed-image';
import { dropdownItems } from '@/components/layout/header';
import { Dropdown } from '@/components/modules/dropdown';

export type CTA = Pick<ButtonProps, 'icon' | 'href' | 'onClick' | '$withBorder' | '$small' | '$variant'> & {
  title: string;
};

export interface CTAProps {
  isHero?: boolean;
  heading: string;
  textAppearance?: 'small' | 'large';
  subHeading?: {
    text: string;
    icon?: IconType;
  };
  excerpt?: string;
  withDownload?: boolean;
  cta?: CTA;
  icon?: IconType;
  image?: ThemeImageProps;
}

export const CTA = ({
  icon,
  heading,
  subHeading,
  excerpt,
  cta,
  withDownload = true,
  isHero = true,
  textAppearance = 'large',
  image,
}: CTAProps) => {
  const SubHeadingIcon = subHeading?.icon;
  const asTitle = isHero ? 'h1' : 'h3';
  const isLargeText = textAppearance === 'large';

  return (
    <StyledHeroWrapper $isHero={isHero} $isLargeText={isLargeText}>
      <StyledContainer>
        {icon && (
          <SquareIcon $size={isHero ? 'xLarge' : 'large'} $variant={isHero ? 'primary' : 'secondary'} icon={icon} />
        )}
        {subHeading && (
          <Text as="label" color="cinnarbarRed" fontSize={isLargeText ? 'xll' : 'm'} fontWeight="bold">
            {subHeading?.text} {SubHeadingIcon && <SubHeadingIcon weight="fill" />}
          </Text>
        )}
        <Stack $gapxl={isLargeText ? '32px' : '16px'}>
          <Heading color="textGradient" as={asTitle} fontSize={isLargeText ? 'xl' : 'l'}>
            {heading}
          </Heading>
          {excerpt && <StyledExcerpt fontSize="l">{excerpt}</StyledExcerpt>}

          {/* TODO: Use the download feature instead when is ready */}
          {(withDownload || cta) && (
            <StyledCTAWrapper $isLargeText={isLargeText}>
              {withDownload ? (
                <Dropdown $variant="primary" $withBorder items={dropdownItems} aria-label="Download Items">
                  Download for macOS
                </Dropdown>
              ) : null}

              {cta && (
                <Button as="link" $variant={cta.$variant || 'secondary'} href={cta.href} icon={cta.icon}>
                  {cta.title}
                </Button>
              )}
            </StyledCTAWrapper>
          )}
        </Stack>
        {image && <ThemedImage title={heading || image.title} {...image} />}
      </StyledContainer>
    </StyledHeroWrapper>
  );
};
