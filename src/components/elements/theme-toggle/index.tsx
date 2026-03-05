'use client';

import { Moon, Sun } from '@phosphor-icons/react';
import { styled } from '@linaria/react';
import { useTheme } from 'next-themes';
import type { ChangeEvent, KeyboardEvent } from 'react';

import { useMounted } from '@/lib/hooks/use-mounted';

const iconStyles = `
  fill: var(--text-dark-grey);

  &[data-is-active='true'] {
    fill: var(--white);
  }
`;

const StyledLabel = styled.label`
  --icon-size: 48px;
  max-width: 98px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  height: fit-content;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 0 8px var(--shadow-default);
`;

const StyledMoon = styled(Moon)`
  &&& {
    ${iconStyles};
  }
`;

const StyledSun = styled(Sun)`
  &&& {
    ${iconStyles};
  }
`;

const StyledSwitch = styled.div`
  position: relative;
  width: 98px;
  height: 50px;
  background: var(--ink-black);
  border-radius: 12px;
  padding: 4px;
  transition: 350ms all ease-in;
  border: 1px solid var(--dark-grey);

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--icon-size);
    height: var(--icon-size);
    border-radius: 11px;
    background: var(--ink-grey);
    transform: translate(0, -50%);
    transition: 300ms transform cubic-bezier(0.25, 0.1, 0.52, 0.95);
  }
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + *[data-switch] {
    background: var(--ink-black);

    &:before {
      transform: translate(var(--icon-size), -50%);
    }
  }

  &:focus-visible + *[data-switch] {
    border: 1px solid var(--ink-grey);
    box-shadow:
      0px 0px 8px 0px rgba(230, 232, 242, 0.05),
      0px 0px 0px 8px rgba(50, 52, 59, 0.6);
  }
`;

const StyledIconsWrapper = styled.span`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 96px;
`;

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
