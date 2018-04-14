import React from 'react'
import styled from 'styled-components'

const HeaderPlaceholder = styled.div`
  width: 100%;
  display: block;
  height: 80px;
`;

const HeaderBase = styled.div`
  position: fixed;
  top: 0;

  height: 80px;
`;

const HeaderBackground = HeaderBase.extend`
  left: 0;
  right: 0;
  width: 100vw;

  background-color: ${p => p.theme.popBackground};
  border-top: 2px solid ${p => p.theme.popColor};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);
`;

const StyledHeader = HeaderBase.extend`
  width: 100%;
  padding: 10px 0;

  display: flex;
  flex-direction: row;
  align-items: stretch;
`

const Header = ({ children }) => {
  return (<HeaderPlaceholder>
    <HeaderBackground />
    <StyledHeader>
      {children}
    </StyledHeader>
  </HeaderPlaceholder>)
}

export default Header
