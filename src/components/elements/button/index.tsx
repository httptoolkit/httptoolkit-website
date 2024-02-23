import { StyledButton, StyledButtonWrapper, StyledLink } from './button.styles';
import type { ButtonComponentType, ButtonProps } from './button.types';
import { MovingBorder } from '../moving-border';

export const Button = <T extends 'button' | 'link'>({
  variant = 'primary',
  small = false,
  type,
  withBorder = false,
  children,
  as,
  icon: Icon,
  iconWeight = 'fill',
  onClick,
  href,
  target,
  isDropdown = false,
  ...aria
}: ButtonProps<T>) => {
  const BaseButton = () => {
    const ButtonComponent: ButtonComponentType<T> = as === 'link' ? StyledLink : StyledButton;
    const isAnchor = (href?.startsWith('http://') || href?.startsWith('https://')) && as === 'link';

    return (
      // @ts-expected-error
      <ButtonComponent
        as={isAnchor ? 'a' : as}
        variant={variant}
        small={small}
        type={type}
        onClick={onClick}
        href={href}
        target={target}
        withBorder={withBorder}
        isDropdown={isDropdown}
        {...aria}
      >
        {children}
        {Icon && <Icon size={16} weight={iconWeight} />}
      </ButtonComponent>
    );
  };

  if (withBorder) {
    return (
      <StyledButtonWrapper>
        <MovingBorder rx="30%" ry="30%" />
        <BaseButton />
      </StyledButtonWrapper>
    );
  }

  return <BaseButton />;
};
