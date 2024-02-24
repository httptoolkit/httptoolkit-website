/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { StyledButton, StyledButtonWrapper, StyledLink } from './button.styles';
import type { ButtonComponentType, ButtonProps } from './button.types';

import { MovingBorder } from '@/components/elements/moving-border';
import { isExternalUrl } from '@/lib/utils';

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
    const isAnchor = isExternalUrl(href) && as === 'link';
    const newAs = as === 'link' ? undefined : as;

    return (
      <ButtonComponent
        as={isAnchor ? 'a' : newAs}
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
      <MovingBorder>
        <StyledButtonWrapper>
          <BaseButton />
        </StyledButtonWrapper>
      </MovingBorder>
    );
  }

  return <BaseButton />;
};
