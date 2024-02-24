'use client';

import { styled } from '@/styles';

const ShowCaseWrapper = styled.fieldset`
  border: 1px dashed ${({ theme }) => theme.colors.cinnarbarRed};
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 5px;
`;

interface ShowCaseProps {
  title: string;
}

const ShowCase = ({ children, title }: Component<ShowCaseProps>) => {
  return (
    <ShowCaseWrapper>
      <legend>{title}</legend>
      {children}
    </ShowCaseWrapper>
  );
};

export default ShowCase;
