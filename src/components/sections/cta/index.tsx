import { styled } from '@linaria/react';

import type { ThemeImageProps } from '@/components/elements/themed-image';
import type { DownloadButtonProps } from '@/components/modules/download-button';
import type { VideoKey } from '@/content/data/video-dictionary';

import { Button, type ButtonProps } from '@/components/elements/button';
import { Container } from '@/components/elements/container';
import { Heading, type HeadingProps } from '@/components/elements/heading';
import { SquareIcon, type IconType } from '@/components/elements/square-icon';
import Stack from '@/components/elements/stack';
import { Text, type TextProps } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { DownloadButton } from '@/components/modules/download-button';
import { PhoneAppVideoPair } from '@/components/modules/phone-app-video-pair';
import { screens } from '@/styles/tokens';

export type CTAAction = Pick<ButtonProps, 'icon' | 'href' | 'onClick' | '$withBorder' | '$small' | '$variant' | 'as'> & {
  title: string;
};

export type CTAVariant = 'cta-hero' | 'cta-square' | 'cta-fluid' | 'cta-narrow';
export type TextAppearance = 'small' | 'large';
export type bgVariant =
  | 'default'
  | 'left-bottom-to-top-right'
  | 'right-bottom-to-top-left'
  | 'left-top-to-bottom-right';

export interface CTAProps extends Component {
  variant?: CTAVariant;
  $bgVariant?: bgVariant;
  $isFooterClose?: boolean;
  heading: React.ReactNode;
  textAppearance?: TextAppearance;
  subHeading?: {
    text: string;
    icon?: IconType;
  };
  excerpt?: React.ReactNode;
  withDownload?: boolean;
  cta?: CTAAction;
  icon?: IconType;
  image?: ThemeImageProps;
  video?: {
    id: VideoKey;
  };
  downloadButtonDefaultOsValue?: DownloadButtonProps['fixedOS'];
}

const StyledHeroWrapper = styled.section`
  position: relative;
  padding-top: 32px;
  padding-bottom: 64px;
  text-align: center;

  @media (min-width: ${screens['lg']}) {
    padding-top: 96px;
    padding-bottom: 64px;
  }

  &[data-footer-close="true"] {
    @media (min-width: ${screens['lg']}) {
      padding-bottom: 128px;
      margin-bottom: -64px;
    }
  }

  /* CTA SQUARE VARIANT */
  &[data-variant="cta-square"] {
    max-width: 1344px;
    margin: 32px 16px;
    padding-top: 64px;
    padding-bottom: 0;
    box-shadow: 0px 0px 24px 0px rgba(189, 195, 218, 0.1) inset;
    border-radius: 16px;
    background:
      no-repeat url('/images/backgrounds/hero-lines.svg'),
      var(--background-dots);
    background-position: top -400px center;
    border: 1px solid var(--border-dark);

    @media (min-width: ${screens['lg']}) {
      border: 0;
      padding-top: 128px;
      padding-bottom: 128px;
      margin: 96px auto;
      background-position: top -80px center;

      &::before {
        content: '';
        border: 1px solid var(--border-dark);
        border-radius: 16px;
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: radial-gradient(ellipse at center, transparent 30%, var(--ink-grey));
      }
    }
  }

  /* Shared hero/narrow styles */
  &[data-variant="cta-hero"],
  &[data-variant="cta-narrow"] {
    box-shadow: var(--hero-box-shadow);

    @media (min-width: ${screens['md']}) {
      /* Default background */
      background:
        no-repeat url('/images/backgrounds/hero-lines.svg'),
        var(--background-dots);
      background-position: top -35px center;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-image: radial-gradient(ellipse at center, transparent 60%, var(--ink-grey));
      }
    }
  }

  /* Background variant overrides for hero/narrow */
  &[data-variant="cta-hero"][data-bg-variant="left-bottom-to-top-right"],
  &[data-variant="cta-narrow"][data-bg-variant="left-bottom-to-top-right"] {
    @media (min-width: ${screens['md']}) {
      background:
        no-repeat url(/images/backgrounds/hero-lines-2.svg),
        var(--background-dots);
      background-position: center top -388px;
    }
  }

  &[data-variant="cta-hero"][data-bg-variant="right-bottom-to-top-left"],
  &[data-variant="cta-narrow"][data-bg-variant="right-bottom-to-top-left"] {
    @media (min-width: ${screens['md']}) {
      background:
        no-repeat url(/images/backgrounds/hero-lines-4.svg),
        var(--background-dots);
      background-position: center top -340px;
    }
  }

  &[data-variant="cta-hero"][data-bg-variant="left-top-to-bottom-right"],
  &[data-variant="cta-narrow"][data-bg-variant="left-top-to-bottom-right"] {
    @media (min-width: ${screens['md']}) {
      background:
        no-repeat url(/images/backgrounds/hero-lines-3.svg),
        var(--background-dots);
      background-position: center top -310px;
    }
  }

  /* Narrow-specific: constrain container */
  &[data-variant="cta-narrow"] {
    &&& div[data-container="true"] {
      max-width: 657px;
    }
  }

  /* CTA FLUID VARIANT */
  &[data-variant="cta-fluid"] {
    background: no-repeat url('/images/backgrounds/hero-lines.svg');
    background-position: top -360px center;

    @media (min-width: ${screens['lg']}) {
      background-position: top -45px center;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0px 11px 16px 0px var(--ink-grey);
    }
  }
`;

const StyledContainer = styled(Container)`
  &&& {
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: ${screens['xl']}) {
      padding-left: 0;
      padding-right: 0;
    }

    & [data-heading="true"] {
      max-width: 360px;
      line-height: 115%;
      padding-top: 11px;

      @media (min-width: ${screens['md']}) {
        max-width: 1115px;
      }
    }

    & [data-text="true"] {
      margin: 0 auto;
    }

    & [data-stack] {
      align-items: center;
    }
  }
`;

const StyledExcerpt = styled(Text)`
  &&& {
    &[data-large-text="true"] {
      max-width: 343px;

      @media (min-width: ${screens['lg']}) {
        max-width: 659px;
        text-shadow: var(--ink-grey) 0 0 20px, var(--ink-grey) 1px 1px 1px;
      }
    }
  }
`;

const StyledCTAWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
  margin-bottom: 32px;

  @media (min-width: ${screens['lg']}) {
    flex-direction: row;
    margin-bottom: 64px;
    width: fit-content;
  }
`;

export const CTA = ({
  icon,
  heading,
  subHeading,
  excerpt,
  cta,
  withDownload = true,
  textAppearance = 'large',
  image,
  video,
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
      data-footer-close={$isFooterClose ? 'true' : undefined}
      data-variant={variant}
      data-bg-variant={$bgVariant !== 'default' ? $bgVariant : undefined}
      className={className}
    >
      <StyledContainer data-container="true">
        {icon && (
          <SquareIcon $size={isHero ? 'xLarge' : 'medium'} $variant={isHero ? 'primary' : 'secondary'} icon={icon} />
        )}
        {subHeading && (
          <Text as="label" color="cinnabarRed" fontSize={labelSize} fontWeight="bold">
            {subHeading?.text} {SubHeadingIcon && <SubHeadingIcon weight="fill" />}
          </Text>
        )}
        <Stack $gapxl="24px">
          <Heading color="textGradient" as={asTitle} fontSize={HeadingSize}>
            {heading}
          </Heading>
          {excerpt &&
            (typeof excerpt === 'string' ? (
              <StyledExcerpt fontSize={excerptSize} data-large-text={isLargeText ? 'true' : undefined}>
                {excerpt}
              </StyledExcerpt>
            ) : (
              <>{excerpt}</>
            ))}
        </Stack>
        {(withDownload || cta) && (
          <StyledCTAWrapper>
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
            title={image.title}
            sizes="(max-width: 600px) 50vw, 75vw"
            {...image}
            loading={isHero ? 'eager' : 'lazy'}
          />
        )}

        {video && (
          <PhoneAppVideoPair
            videoId={video.id}
          />
        )}
      </StyledContainer>
      {children}
    </StyledHeroWrapper>
  );
};
