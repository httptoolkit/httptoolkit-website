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
  className,
  ...aria
}: ButtonProps) => {
  const BaseButton = () => {
    const ButtonComponent: ButtonComponentType = as === 'link' ? StyledLink : StyledButton;

    return (
      <ButtonComponent
        className={className}
        type={type}
        onClick={onClick}
        href={href}
        target={target}
        $variant={$variant}
        $small={$small}
        $withBorder={$withBorder}
        $isDropdown={$isDropdown}
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
