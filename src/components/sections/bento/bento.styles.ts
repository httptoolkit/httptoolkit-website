'use client';

import { Heading } from '@/components/elements/heading';
import { styled, screens } from '@/styles';

export const StyledBentoWrapper = styled.section`
  padding-top: 64px;
  padding-bottom: 64px;
  position: relative;
  overflow: hidden;

  @media (min-width: ${screens.lg}) {
    padding-top: 96px;
    padding-bottom: 96px;
  }
`;

export const StyledBentoGradientWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  height: 579px;
`;

export const StyledBentoTitle = styled(Heading)`
  &&& {
    max-width: 548px;
    margin: 0 auto 32px;

    @media (min-width: ${screens.lg}) {
      margin: 0 auto 64px;
    }
  }
`;

export const StyledBentoContent = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

export const StyledBentoColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${screens.lg}) {
    gap: 20px;
  }
`;