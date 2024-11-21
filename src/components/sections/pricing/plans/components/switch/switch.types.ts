import { Interval } from "@/lib/store/account-store";

interface Option {
  text: string;
  id: Interval;
}

export interface SwitchProps {
  defaultValue?: Interval;
  options: [Option, Option];
  onChange(id: Interval): void;
}
