import { marked } from 'marked';
import type { Icon } from '@phosphor-icons/react';

import { Button } from '@/components/elements/button';
import { Heading, type HeadingProps } from '@/components/elements/heading';
import { SquareIcon, type SquareIconProps } from '@/components/elements/square-icon';
import { renderer } from '@/lib/marked/link-target-render';
import { styled } from '@linaria/react';
import { fontSizes, fontWeight } from '@/styles/tokens';

export interface FluidCardVariantProps {
  variant?: 'default' | 'highlighted' | 'dark';
}

export interface FluidCardProps extends FluidCardVariantProps {
  icon?: Icon;
  title: string;
  text: string;
  buttonHref?: string;
  buttonText?: string;
}

const StyledFluidCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;
  padding: 24px;
  height: 100%;
  box-shadow:
    0 0 0 1px var(--button-border),
    0px 2px 24px 0px var(--shadow-default);

  &[data-variant="default"] {
    background: var(--ink-grey);
    gap: 32px;
  }

  &[data-variant="dark"] {
    background: var(--ink-black);
  }

  &[data-variant="highlighted"] {
    background-image: var(--background-always-dark-dots),
      var(--blue-gradient);
    background-size: 450px 450px;
    background-repeat: repeat repeat;
    background-position: center;
    box-shadow:
      0px 2.4px 1.2px 0px rgba(201, 212, 251, 0.1) inset,
      0px -1.2px 1.2px 0px rgba(16, 46, 151, 0.1) inset,
      0px 2.4px 1.2px 0px rgba(201, 212, 251, 0.1) inset,
      0px -1.2px 1.2px 0px rgba(16, 46, 151, 0.1) inset;
  }
`;

const StyledFluidCardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  &[data-variant="highlighted"] {
    gap: 16px;
  }
`;

const StyledFluidCardText = styled.div`
  & * {
    font-size: ${fontSizes.text.m};
    color: var(--text-dark-grey);
  }

  &[data-variant="highlighted"] {
    & * {
      color: var(--text-always-light-grey);
    }
  }

  & p:not(:last-child) {
    margin-bottom: 8px;
  }

  & strong {
    color: var(--text-white);
    font-weight: ${fontWeight.bold};
  }

  & a {
    text-decoration: underline;
  }
`;

export const FluidCard = ({ title, icon, text, buttonHref, buttonText, variant = 'default' }: FluidCardProps) => {
  const headingSize: HeadingProps['fontSize'] = variant === 'dark' ? 's' : 'm';
  const headingColor: HeadingProps['color'] = variant === 'highlighted' ? 'alwaysWhite' : 'lightGrey';
  const headingWeight: HeadingProps['fontWeight'] = variant === 'dark' ? 'medium' : 'normal';
  const iconSize: SquareIconProps['size'] = variant === 'dark' ? 'medium' : 'large';

  return (
    <StyledFluidCardWrapper data-variant={variant}>
      {icon && (
        <SquareIcon icon={icon} variant={variant !== 'default' ? 'tertiary' : 'tertiary-bigger'} size={iconSize} />
      )}
      <StyledFluidCardContentWrapper data-variant={variant}>
        <Heading as="h3" color={headingColor} fontSize={headingSize} fontWeight={headingWeight}>
          {title}
        </Heading>
        <StyledFluidCardText
          data-variant={variant}
          dangerouslySetInnerHTML={{ __html: marked.parse(text, { renderer }) as string }}
        />
      </StyledFluidCardContentWrapper>
      {buttonText && buttonHref && (
        <Button as="link" href={buttonHref} target="_blank" variant="secondary" small>
          {buttonText}
        </Button>
      )}
    </StyledFluidCardWrapper>
  );
};
