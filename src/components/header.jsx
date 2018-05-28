import React from 'react'
import { styled, media } from '../styles'

const HeaderPlaceholder = styled.div`
  width: 100%;
  display: block;
  height: ${p => p.theme.headerHeight};
`;

const HeaderBase = styled.div`
  position: fixed;
  top: 0;

  height: ${p => p.theme.headerHeight};

  /* Fixed header can twitch a little with page updates. This fixes that:  */
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
`;

const HeaderBackground = HeaderBase.extend`
  left: 0;
  right: 0;

  background-color: ${p => p.theme.popBackground};
  border-top: 2px solid ${p => p.theme.popColor};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

  z-index: 2;
`;

const StyledHeader = styled.div`
  ${media.desktop`
    width: ${p => p.theme.pageWidth.desktop};
  `}
  height: ${p => p.theme.headerHeight};

  margin: 0 auto;

  padding: 10px 0;

  ${media.tablet`
    padding: 10px 30px;
  `}

  ${media.mobile`
    padding: 10px;
  `}

  display: flex;
  flex-direction: row;
  align-items: stretch;

  z-index: 2;
`

const Header = ({ children }) => {
  return (<HeaderPlaceholder>
    <HeaderBackground><StyledHeader>
      {children}
    </StyledHeader></HeaderBackground>
  </HeaderPlaceholder>)
}

export default Header
