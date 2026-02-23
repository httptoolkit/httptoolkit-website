'use client';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-yaml';
import React, { useEffect } from 'react';

import type { BlockCodeProps } from '../block-code.types';

export const Code = ({ children, language, title }: Component<Pick<BlockCodeProps, 'language' | 'title'>>) => {
  const codeRef = React.createRef<HTMLPreElement>();

  useEffect(() => {
    async function highlight() {
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current as Element);
      }
    }
    highlight();
  }, []);

  return (
    <pre aria-labelledby="code-label" className={language ?? 'language-js'} tabIndex={0}>
      <span id="code-label" className="visually-hidden">
        {title}
      </span>
      <code ref={codeRef} className={language ?? 'language-js'}>
        {children}
      </code>
    </pre>
  );
};