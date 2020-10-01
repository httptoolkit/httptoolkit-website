import { styled, media } from '../styles';

import headshot from '../images/tim-small.png';

export const Footer = styled.div`
  background-color: ${p => p.theme.popBackground};
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);

  ${media.desktop`
    padding: 10px calc((100vw - ${p => p.theme.pageWidth.desktop}) / 2) 20px;
    margin: 0 calc(-1 * (100vw - ${p => p.theme.pageWidth.desktop}) / 2);
  `}

  ${media.tablet`
    padding: 10px 30px 20px;
  `}

  ${media.mobile`
    padding: 20px 10px 30px;
  `}

  ${p => p.theme.fontSizeText};
  font-weight: lighter;
  text-align: right;
  color: ${p => p.theme.mainColor};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  > * {
    ${media.desktopOrTablet`
      flex: 1 1 0;
    `}
    ${media.mobile`
      flex: 0 0 100%;
    `}
  }
`;

export const FooterSocialIcons = styled.div`
  text-align: center;
  flex: 1 0 100%;
  margin: 10px 0 20px;

  > a {
    margin: 0 20px;
    &:hover {
      color: ${p => p.theme.popColor};
    }
  }
`;

export const FooterMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;

  > a {
    color: ${p => p.theme.mainColor};
  }
`;

export const FooterCreator = styled.div`
  ${media.mobileOrTablet`
    display: none;
  `}
`;

export const FooterOpenSource = styled.div`
  text-align: center;

  ${media.tablet`
    text-align: right;
  `}

  ${media.mobile`
    margin-top: 20px;
    text-align: left;
  `}
`;

export const Headshot = styled.img.attrs({
  src: headshot,
  alt: "Picture of Tim Perry"
})`
  float: right;
  margin: -5px 0 -10px 10px;
  height: 52px;
  vertical-align: middle;
`;