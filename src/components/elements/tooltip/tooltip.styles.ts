'use client';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import { styled } from '@/styles';

export const StyledTooltipContent = styled(RadixTooltip.Content)`
  &&& {
    background-color: var(--ink-black);
    border-radius: 8px;
    padding: 8px 12px;
    z-index: 1;
    margin-top: -12px;

    box-shadow: var(--shadow-box);
  }
`;