import type { TooltipContentProps } from '@radix-ui/react-tooltip';

export interface TooltipProps extends Component {
  text: string;
  side?: TooltipContentProps['side'];
}
