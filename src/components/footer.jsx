import React from 'react'
import styled from 'styled-components'

const Footer = styled(({ className, children }) => {
  return <div className={className}>
    {children}
  </div>
})`
  background-color: ${p => p.theme.popBackground};
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

  padding: 19px calc((100vw - ${p => p.theme.pageWidth}) / 2);
  margin: 0 calc(-1 * (100vw - ${p => p.theme.pageWidth}) / 2);

  font-size: ${p => p.theme.textSize};  
  font-weight: light;
  text-align: right;
  color: ${p => p.theme.mainSubtleColor};
`;

export default Footer
