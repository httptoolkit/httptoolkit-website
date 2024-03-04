'use client';

import Prism from 'prismjs';
import { useEffect } from 'react';

import 'prismjs/themes/prism-tomorrow.css';
import type { BlockCodeProps } from '../block-code.types';

export const Code = ({ children, language }: Component<Pick<BlockCodeProps, 'language'>>) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, []);

  return (
    <pre>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
};
