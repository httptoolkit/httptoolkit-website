'use client';

import { useTheme } from 'next-themes';
import type { ChangeEvent, KeyboardEvent } from 'react';

import {
  StyledIconsWrapper,
  StyledInput,
  StyledLabel,
  StyledMoon,
  StyledSun,
  StyledSwitch,
} from './theme-toggle.styles';

import { useMounted } from '@/lib/hooks/use-mounted';

export const ThemeToggle = ({ id = 'themetoggle' }: { id?: string }) => {
  const { isMounted } = useMounted();
  const { theme, setTheme } = useTheme();

  if (!isMounted) {
    return null;
  }

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setTheme(isChecked ? 'light' : 'dark');
  };

  const isLightMode = theme === 'light';

  const handleKeyPress = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter') {
      setTheme(isLightMode ? 'dark' : 'light');
    }
  };

  const changeThemeText = isLightMode ? 'dark' : 'light';

  return (
    <StyledLabel htmlFor={id} onKeyDown={handleKeyPress}>
      <span className="visually-hidden">Enable {changeThemeText} mode</span>
      <StyledIconsWrapper>
        <StyledMoon aria-label="Dark theme" weight="fill" data-is-active={!isLightMode} />
        <StyledSun aria-label="Light theme" weight="fill" data-is-active={isLightMode} />
      </StyledIconsWrapper>
      <StyledInput
        id={id}
        role="switch"
        name={id}
        checked={isLightMode}
        type="checkbox"
        aria-checked={isLightMode}
        onChange={handleThemeChange}
      />
      <StyledSwitch data-switch />
    </StyledLabel>
  );
};
