import { styled } from '@linaria/react';

import { screens } from '@/styles/tokens';

const ShowCaseWrapper = styled.fieldset`
  border: 1px dashed var(--cinnabar-red);
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 5px;

  &[data-flex-direction="row"] {
    flex-direction: row;
  }

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
    <ShowCaseWrapper data-flex-direction={$flexDirection}>
      <legend>{title}</legend>
      {children}
    </ShowCaseWrapper>
  );
};

export default ShowCase;
