'use client';

import { styled } from '@linaria/react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { TooltipContentProps } from '@radix-ui/react-tooltip';

import { Text } from '../text';

interface TooltipProps extends Component {
  text: string;
  side?: TooltipContentProps['side'];
}

const StyledTooltipContent = styled(RadixTooltip.Content)`
  &&& {
    background-color: var(--ink-black);
    border-radius: 8px;
    padding: 8px 12px;
    z-index: 1;
    margin-top: -12px;

    box-shadow: var(--shadow-box);
  }
`;

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
