import React from 'react'

import { styled, media, css } from '../styles';

const Footer = styled(({ className, children }) => {
  return <div className={className}>
    {children}
  </div>
})`
  ${media.mobileOrTablet`
    display: none;
  `}

  background-color: ${p => p.theme.popBackground};
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

  ${media.desktop`
    padding: 19px calc((100vw - ${p => p.theme.pageWidth.desktop}) / 2);
    margin: 0 calc(-1 * (100vw - ${p => p.theme.pageWidth.desktop}) / 2);
  `}

  ${p => p.theme.fontSizeText};
  font-weight: lighter;
  text-align: right;
  color: ${p => p.theme.mainSubtleColor};
`;

export default Footer
