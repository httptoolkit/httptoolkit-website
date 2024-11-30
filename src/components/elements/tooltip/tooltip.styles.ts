"use client";
import * as RadixTooltip from "@radix-ui/react-tooltip";

import { styled } from "@/styles";

export const StyledTooltipContent = styled(RadixTooltip.Content)`
  &&& {
    background-color: ${({ theme }) => theme.colors.inkBlack};
    border-radius: 8px;
    padding: 8px 12px;
    z-index: 1;
    margin-top: -12px;

    box-shadow: ${({ theme }) => theme.shadow.box};
  }
`;
