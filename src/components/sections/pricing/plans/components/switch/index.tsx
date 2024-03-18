'use client';

import { useState, type KeyboardEvent } from 'react';

import { StyledWrapper, StyledOption, StyledOptionsWrapper } from './switch.styles';
import type { SwitchProps } from './switch.types';

import { useMounted } from '@/lib/hooks/use-mounted';

export const Switch = ({ options, defaultValue, accessibilityTitle, onChange }: SwitchProps) => {
  const { isMounted } = useMounted();
  const [activeOption, setActiveOption] = useState(defaultValue || options[0].id);

  if (!isMounted) {
    return null;
  }

  const changeOption = () => {
    const newActiveOptionId = options.find(option => option.id !== activeOption)?.id || options[0].id;
    setActiveOption(newActiveOptionId);
    onChange(newActiveOptionId);
  };

  const handleThemeChange = () => {
    changeOption();
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.code === 'Enter') {
      console.log(event.code);
      changeOption();
    }
  };

  const firstChecked = options[0].id === activeOption;

  return (
    <StyledWrapper>
      <span className="visually-hidden">{accessibilityTitle}</span>
      <StyledOptionsWrapper type="button" onClick={handleThemeChange} onKeyUp={handleKeyPress}>
        <StyledOption data-is-active={firstChecked}>{options[0].text}</StyledOption>
        <StyledOption data-is-active={!firstChecked}>{options[1].text}</StyledOption>
      </StyledOptionsWrapper>
    </StyledWrapper>
  );
};
