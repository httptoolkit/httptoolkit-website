'use client';

import { ThemedImage } from '@/components/elements/themed-image';
import { styled } from '@/styles';

export const StyledCardWrapper = styled.div`
  max-width: 656px;
  width: 100%;
  background-color: var(--ink-black);
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0px 2px 24px 0px rgba(230, 232, 242, 0.05),
    0 0 0 1px var(--button-border);
`;

export const StyledCardImageWrapper = styled.div`
  padding-top: 28px;
  display: flex;
  justify-content: center;
  background-image:
    var(--background-gradient),
    /* var(--background-func-gradient), */
      var(--background-dots-card);
  background-position:
    center 140%,
    center,
    center;
  background-size:
    602px 384.19px,
    524px 248px,
    524px 248px;
  background-repeat: no-repeat;
  position: relative;

  /* faded look effect */
  &::before {
    content: '';
    width: 80%;
    margin: 0 auto;
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: radial-gradient(ellipse at top, transparent 10%, var(--ink-black));
  }
`;

export const StyledCardImage = styled(ThemedImage)`
  &&& {
    width: 100%;
    height: 216px !important;
    position: relative !important;
    padding: 0 16px;
  }
`;

export const StyledCardTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  padding: 56px 48px 28px;
`;