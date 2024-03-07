export interface GrowingNumbersStat {
  title: string;
  number: number;
  isOver?: boolean;
}

export interface GrowingNumbersProps {
  stats: GrowingNumbersStat[];
}
