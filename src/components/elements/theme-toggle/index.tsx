'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';

import {
  StyledIconsWrapper,
  StyledInput,
  StyledLabel,
  StyledMoon,
  StyledSun,
  StyledSwitch,
} from './theme-toggle.styles';

export const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const html = document.querySelector('html') as HTMLHtmlElement;
    if (isLight) {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
  }, [isLight]);

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsLight(e.target.checked);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter') {
      setIsLight(v => !v);
    }
  };

  return (
    <StyledLabel tabIndex={1} onKeyDown={handleKeyPress}>
      <StyledIconsWrapper>
        <StyledMoon weight="fill" data-is-active={!isLight} />
        <StyledSun weight="fill" data-is-active={isLight} />
      </StyledIconsWrapper>
      <StyledInput checked={isLight} type="checkbox" aria-checked={isLight} onChange={handleThemeChange} />
      <StyledSwitch />
    </StyledLabel>
  );
};
