import type { AriaAttributes, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, AriaAttributes {
  id?: string;
  as?: 'input' | 'textarea';
  errorMessage?: string;
  hasError?: boolean;
  onClickSearch?: () => void;
  label?: string;
}
