'use client';

import { useMedia } from 'react-use';

import { styled } from '@linaria/react';

import { IconRows } from './components/icon-rows';
import type { IconRowsProps } from './components/icon-rows';

import { Button, type ButtonProps } from '@/components/elements/button';
import { Heading } from '@/components/elements/heading';
import {
  AndroidLogo,
  DockerLogo,
  ElectronLogo,
  JavaLogo,
  PythonLogo,
  RubyLogo,
  SquareJSLogo,
} from '@/components/elements/icon';
import { Text } from '@/components/elements/text';
import { screens } from '@/styles/tokens';

export interface StyledIntegrationCTAProps {
  $variant: 'hero' | 'cta';
}

export interface IntegrationCTAProps extends StyledIntegrationCTAProps {
  title: string;
  text: string[];
  button?: ButtonProps;
}

const StyledIntegrationCTAWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 32px 16px 0;
  gap: 32px;

  &[data-variant="cta"] {
    background-color: var(--ink-black);
    box-shadow: var(--border-gradient);
    gap: 42px;
  }

  &::before {
    content: '';
    background: linear-gradient(0deg, var(--ink-grey) 13%, rgba(30, 32, 40, 0) 93.25%);
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 130px;
  }

  @media (min-width: ${screens.lg}) {
    flex-direction: row;
    padding: 96px 0;
    gap: 35px;

    &[data-variant="cta"] {
      padding: 128px 0;
      gap: 99px;
    }

    &::before, &::after {
      content: '';
      position: absolute;
      background: linear-gradient(90deg, var(--ink-grey) 13%, rgba(30, 32, 40, 0) 93.25%);
      width: 200px;
      height: 100%;
      top: 0;
      bottom: unset;
    }

    &::before {
      left: 0;
      right: unset;
      transform: unset;
    }

    &::after {
      right: 0;
      left: unset;
      transform: rotate(180deg);
    }
  }
`;

const StyledIntegrationCTAContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  > p {
    max-width: 740px;
  }
`;

const leftIcons: IconRowsProps['rows'] = [
  {
    icons: [SquareJSLogo, ElectronLogo, PythonLogo],
    offset: 0.8,
  },
  {
    icons: [AndroidLogo, DockerLogo, RubyLogo, JavaLogo],
    offset: 0,
  },
  {
    icons: [PythonLogo, JavaLogo, SquareJSLogo, AndroidLogo],
    offset: 0.6,
  },
];
const rightIcons: IconRowsProps['rows'] = [
  {
    icons: [DockerLogo, JavaLogo, AndroidLogo],
    offset: 0.8,
  },
  {
    icons: [ElectronLogo, SquareJSLogo, PythonLogo, AndroidLogo],
    offset: 0,
  },
  {
    icons: [RubyLogo, ElectronLogo, DockerLogo],
    offset: 1.6,
  },
];
const mobileIcons: IconRowsProps['rows'] = [
  {
    icons: [PythonLogo, SquareJSLogo, DockerLogo],
    offset: 0,
  },
  {
    icons: [RubyLogo, ElectronLogo, DockerLogo],
    offset: 0.6,
  },
  {
    icons: [JavaLogo, AndroidLogo, DockerLogo],
    offset: 0.2,
  },
  {
    icons: [DockerLogo, JavaLogo, SquareJSLogo],
    offset: 0.7,
  },
];

export const IntegrationCTA = ({ title, text, button, $variant }: IntegrationCTAProps) => {
  const HeadingTag = $variant === 'cta' ? 'h2' : 'h1';
  const isMobile = useMedia(`(max-width: ${screens.lg})`, false);

  return (
    <StyledIntegrationCTAWrapper data-variant={$variant}>
      {!isMobile && <IconRows rows={leftIcons} $orientation="left" $offset={0.9} />}
      <StyledIntegrationCTAContent>
        <Heading as={HeadingTag} fontSize="l" color="lightGrey" textAlign="center">
          {title}
        </Heading>
        { text.map((text, index) => (
          <Text fontSize="m" color="darkGrey" textAlign="center" key={index}>
            {text}
          </Text>
        ))}
        {button && (
          <Button as="link" {...button}>
            {button.children}
          </Button>
        )}
      </StyledIntegrationCTAContent>
      {isMobile && <IconRows rows={mobileIcons} $orientation="right" $offset={0} />}
      {!isMobile && <IconRows rows={rightIcons} $orientation="right" $offset={0.8} />}
    </StyledIntegrationCTAWrapper>
  );
};
