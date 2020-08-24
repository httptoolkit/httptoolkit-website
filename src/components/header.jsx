import React from 'react'
import { styled, media } from '../styles'

const HeaderPlaceholder = styled.div`
  width: 100%;
  display: block;
  height: ${p => p.theme.headerHeight};
`;

const HeaderBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  height: ${p => p.theme.headerHeight};

  background-color: ${p => p.theme.mainBackground};
  border-top: 2px solid ${p => p.theme.popColor};

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

export const Header = React.forwardRef(({ children }, ref) => (
  <HeaderPlaceholder ref={ref}>
    <HeaderBackground>
      <StyledHeader>
        {children}
      </StyledHeader>
      </HeaderBackground>
  </HeaderPlaceholder>
));