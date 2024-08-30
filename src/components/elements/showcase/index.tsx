'use client';

import { screens, styled } from '@/styles';

const ShowCaseWrapper = styled.fieldset<Pick<ShowCaseProps, '$flexDirection'>>`
  border: 1px dashed ${({ theme }) => theme.colors.cinnarbarRed};
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: ${({ $flexDirection }) => $flexDirection || 'column'};
  gap: 8px;
  border-radius: 5px;

  @media (max-width: ${screens['lg']}) {
    flex-direction: column;
  }
`;

interface ShowCaseProps {
  title: string;
  $flexDirection?: 'row' | 'column';
}

const ShowCase = ({ children, title, $flexDirection }: Component<ShowCaseProps>) => {
  return (
    <ShowCaseWrapper $flexDirection={$flexDirection}>
      <legend>{title}</legend>
      {children}
    </ShowCaseWrapper>
  );
};

export default ShowCase;
