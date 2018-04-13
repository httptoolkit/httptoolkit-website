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
  box-sizing: border-box;
`;

const HeaderBackground = HeaderBase.extend`
  left: 0;
  right: 0;
  width: 100vw;

  background-color: #fafafa;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 50px -25px #000;
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
