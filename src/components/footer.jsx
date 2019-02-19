import { styled, media } from '../styles';

export const Footer = styled.div`
  background-color: ${p => p.theme.popBackground};
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

  ${media.desktop`
    padding: 10px calc((100vw - ${p => p.theme.pageWidth.desktop}) / 2);
    margin: 0 calc(-1 * (100vw - ${p => p.theme.pageWidth.desktop}) / 2);
  `}

  ${media.tablet`
    padding: 10px 30px;
  `}

  ${media.mobile`
    padding: 20px 10px;
  `}

  ${p => p.theme.fontSizeText};
  font-weight: lighter;
  text-align: right;
  color: ${p => p.theme.mainSubtleColor};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const FooterMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;

  > a {
    color: ${p => p.theme.mainSubtleColor};
  }
`;

export const FooterCopyright = styled.div`
  padding: 20px 0 16px;
`;