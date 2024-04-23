'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';

import { StyledTooltipContent } from './tooltip.styles';
import type { TooltipProps } from './tooltip.types';
import { Text } from '../text';

export const Tooltip = ({ children, text, side = 'right' }: TooltipProps) => {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <StyledTooltipContent side={side} sideOffset={20}>
          <Text fontSize="s" textAlign="center" color="white">
            {text}
          </Text>
        </StyledTooltipContent>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};
