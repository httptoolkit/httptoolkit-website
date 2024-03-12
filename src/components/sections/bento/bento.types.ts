import type { FluidCardProps } from '@/components/modules/fluid-card/fluid-card.types';

export interface BentoProps {
  title: string;
  cards: [FluidCardProps, FluidCardProps, FluidCardProps, FluidCardProps, FluidCardProps, FluidCardProps];
}
