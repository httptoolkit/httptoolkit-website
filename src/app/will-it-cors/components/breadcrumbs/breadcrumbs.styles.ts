import { styled } from '@linaria/react';

export const StyledBreadcrumbContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledBreadcrumbItemWrapper = styled.div`
  flex: 1 1 33%;

  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-evenly;

  padding: 5px;
  text-align: center;

  p {
    padding: 0 5px;
  }

  &[data-state="yes"] p {
    opacity: 0.6;
  }

  &[data-state="no"] p,
  &[data-state="maybe"] p {
    font-weight: bold;
  }

  &[data-state="nvm"] p {
    opacity: 0.5;
    text-decoration: line-through;
  }
`;
