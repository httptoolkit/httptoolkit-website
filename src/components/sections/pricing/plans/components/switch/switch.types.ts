import { Interval } from "@httptoolkit/accounts";

interface Option {
  text: string;
  id: Interval;
}

export interface SwitchProps {
  defaultValue?: Interval;
  options: [Option, Option];
  onChange(id: Interval): void;
}
