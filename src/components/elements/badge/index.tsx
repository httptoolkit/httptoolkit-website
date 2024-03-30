import { AdditionalText, BadgeWrapper, StyledBadge } from './badge.styles';
import type { BadgeProps } from './badge.types';

export const Badge = ({
  children,
  variant = 'primary',
  additionalText,
  icon: Icon,
  iconWeight = 'fill',
}: Component<BadgeProps>) => {
  const hasAdditionalText = variant === 'secondary' && additionalText;

  return (
    <BadgeWrapper>
      {hasAdditionalText && <AdditionalText>{additionalText}</AdditionalText>}
      <StyledBadge $variant={variant}>
        {Icon && <Icon size={16} weight={iconWeight} />}
        {children}
      </StyledBadge>
    </BadgeWrapper>
  );
};
