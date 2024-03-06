'use client';

import Prism from 'prismjs';
import { useEffect } from 'react';

import 'prismjs/themes/prism-tomorrow.css';
import type { BlockCodeProps } from '../block-code.types';

export const Code = ({ children, language, title }: Component<Pick<BlockCodeProps, 'language' | 'title'>>) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, []);

  return (
    <pre aria-labelledby="code-label">
      <span id="code-label" className="visually-hidden">
        {title}
      </span>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
};
