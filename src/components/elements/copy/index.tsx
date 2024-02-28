'use client';

import useClipboard from 'react-use-clipboard';

import { StyledCopy, StyledCopyButton } from './copy.styles';
import type { CopyProps } from './copy.types';
import { CheckCircle, Copy as CopyIcon } from '../icon';

export const Copy = ({ text }: CopyProps) => {
  const [isCopied, setCopied] = useClipboard(text, {
    successDuration: 1000,
  });

  return (
    <StyledCopy>
      {text}
      {!isCopied ? (
        <StyledCopyButton title="Copy command" onClick={setCopied}>
          <CopyIcon size={16} weight="fill" />
        </StyledCopyButton>
      ) : (
        <CheckCircle size={16} weight="fill" />
      )}
    </StyledCopy>
  );
};
