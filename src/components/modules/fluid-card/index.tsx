import { marked } from 'marked';

import type { FluidCardProps } from './fluid-card.types';
import { StyledFluidCardContentWrapper, StyledFluidCardText, StyledFluidCardWrapper } from './fuild-card.styles';

import { Button } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import type { HeadingProps } from '@/components/elements/heading/heading.types';
import { SquareIcon } from '@/components/elements/square-icon';
import type { SquareIconProps } from '@/components/elements/square-icon/square-icon.types';
import { renderer } from '@/lib/marked/link-target-render';

export const FluidCard = ({ title, icon, text, buttonHref, buttonText, $variant = 'default' }: FluidCardProps) => {
  const headingSize: HeadingProps['fontSize'] = $variant === 'dark' ? 's' : 'm';
  const headingColor: HeadingProps['color'] = $variant === 'highlighted' ? 'alwayWhite' : 'lightGrey';
  const headingWeight: HeadingProps['fontWeight'] = $variant === 'dark' ? 'medium' : 'normal';
  const iconSize: SquareIconProps['$size'] = $variant === 'dark' ? 'medium' : 'large';

  return (
    <StyledFluidCardWrapper $variant={$variant}>
      {icon && (
        <SquareIcon icon={icon} $variant={$variant !== 'default' ? 'tertiary' : 'tertiary-bigger'} $size={iconSize} />
      )}
      <StyledFluidCardContentWrapper $variant={$variant}>
        <Heading as="h3" color={headingColor} fontSize={headingSize} fontWeight={headingWeight}>
          {title}
        </Heading>
        <StyledFluidCardText
          $variant={$variant}
          dangerouslySetInnerHTML={{ __html: marked.parse(text, { renderer }) }}
        />
      </StyledFluidCardContentWrapper>
      {buttonText && buttonHref && (
        <Button as="link" href={buttonHref} target="_blank" $variant="secondary" $small>
          {buttonText}
        </Button>
      )}
    </StyledFluidCardWrapper>
  );
};
