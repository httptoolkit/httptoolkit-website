'use client';

import { useMedia } from 'react-use';

import { IconRows } from './components/icon-rows';
import type { IconRowsProps } from './components/icon-rows/icon-rows.types';
import { StyledIntegrationCTAContent, StyledIntegrationCTAWrapper } from './cta.styles';
import type { IntegrationCTAProps } from './cta.types';

import { Button } from '@/components/elements/button';
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
import { screens } from '@/styles';

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
    <StyledIntegrationCTAWrapper $variant={$variant}>
      {!isMobile && <IconRows rows={leftIcons} $orientation="left" $offset={0.9} />}
      <StyledIntegrationCTAContent $variant={$variant}>
        <Heading as={HeadingTag} fontSize="l" color="lightGrey" textAlign="center">
          {title}
        </Heading>
        <Text fontSize="m" color="darkGrey" textAlign="center">
          {text}
        </Text>
        {button && <Button {...button}>{button.children}</Button>}
      </StyledIntegrationCTAContent>
      {isMobile && <IconRows rows={mobileIcons} $orientation="right" $offset={0} />}
      {!isMobile && <IconRows rows={rightIcons} $orientation="right" $offset={0.8} />}
    </StyledIntegrationCTAWrapper>
  );
};
