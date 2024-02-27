import type { AriaAttributes, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, AriaAttributes {
  as?: 'input' | 'textarea';
  errorMessage?: string;
  $hasError?: boolean;
  onClickSearch?: () => void;
}

export interface InputBorderProps {
  $styledAs: InputProps['as'];
  $hasError: boolean;
}
