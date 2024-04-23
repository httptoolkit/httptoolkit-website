interface Option {
  text: string;
  id: string;
}

export interface SwitchProps {
  defaultValue?: string;
  options: [Option, Option];
  onChange(id: string): void;
}
