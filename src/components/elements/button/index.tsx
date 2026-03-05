import { StyledButton, StyledButtonWrapper, StyledLink } from './button.styles';
import type { ButtonComponentType, ButtonProps } from './button.types';

import { MovingBorder } from '@/components/elements/moving-border';

export const Button = ({
  as = 'button',
  children,
  href,
  icon: Icon,
  iconWeight = 'fill',
  onClick,
  target,
  type,
  $small = false,
  $variant = 'primary',
  $withBorder = false,
  $isDropdown = false,
  $isFluid = false,
  className,
  ...aria
}: ButtonProps) => {
  const BaseButton = () => {
    const ButtonComponent = (as === 'link' || href ? StyledLink : StyledButton) as unknown as ButtonComponentType;

    return (
      <ButtonComponent
        data-button="true"
        className={className}
        type={type}
        onClick={onClick}
        href={href}
        target={target}
        data-variant={$variant}
        data-small={$small ? 'true' : undefined}
        data-with-border={$withBorder ? 'true' : undefined}
        data-dropdown={$isDropdown ? 'true' : undefined}
        data-fluid={$isFluid ? 'true' : undefined}
        {...aria}
      >
        {children}
        {Icon && <Icon size={16} weight={iconWeight} />}
      </ButtonComponent>
    );
  };

  if ($withBorder) {
    return (
      <MovingBorder>
        <StyledButtonWrapper>
          <BaseButton />
        </StyledButtonWrapper>
      </MovingBorder>
    );
  }

  return <BaseButton />;
};
