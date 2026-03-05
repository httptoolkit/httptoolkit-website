'use client';

import { useState, type KeyboardEvent } from 'react';

import { styled } from '@linaria/react';

import { Interval } from '@/lib/store/account-store';
import { fontSizes, fontWeight } from '@/styles/tokens';

interface Option {
  text: string;
  id: Interval;
}

export interface SwitchProps {
  defaultValue?: Interval;
  options: [Option, Option];
  onChange(id: Interval): void;
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  gap: 2px;
`;

const StyledOption = styled.span`
  padding: 8px 16px;
  color: var(--text-dark-grey);
  font-size: ${fontSizes.text.s};
  line-height: 1.5;

  &[data-is-active='true'] {
    border-radius: 24px;
    color: var(--text-light-grey);
    font-weight: ${fontWeight.medium};
    background-color: var(--ink-black);
  }
`;

const StyledOptionsWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--dark-grey);
  border-radius: 40px;
  padding: 2px;
  transition: 350ms all ease-in;
  border: none;
  box-shadow:
    0 0 0 1px var(--button-border) inset,
    0 0 8px 0 var(--shadow-default);

  cursor: pointer;
`;

export const Switch = ({ options, defaultValue, onChange }: SwitchProps) => {
  const [activeOption, setActiveOption] = useState(defaultValue || options[0].id);

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
      changeOption();
    }
  };

  const firstChecked = options[0].id === activeOption;
  const checked = options.find(option => option.id === activeOption);
  const unChecked = options.find(option => option.id !== activeOption);

  return (
    <StyledWrapper aria-live="assertive" aria-label={`Now ${checked?.text}: click to switch to ${unChecked?.text}`}>
      <StyledOptionsWrapper type="button" onClick={handleThemeChange} onKeyUp={handleKeyPress}>
        <StyledOption data-is-active={firstChecked}>{options[0].text}</StyledOption>
        <StyledOption data-is-active={!firstChecked}>{options[1].text}</StyledOption>
      </StyledOptionsWrapper>
    </StyledWrapper>
  );
};
