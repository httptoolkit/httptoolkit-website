import { styled } from '@/styles';

export const BorderLine = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(${({ theme }) => theme.colors.orangeGradient});
`;

export const BorderWrapper = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 12px;
`;

export const BorderSVG = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
`;
