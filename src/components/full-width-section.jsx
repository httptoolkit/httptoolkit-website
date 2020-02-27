import { styled, media } from '../styles';

export const FullWidthSection = styled.section`
  ${media.desktop`
    padding-right: calc((100vw - ${p => p.width || p.theme.pageWidth.desktop}) / 2);
    padding-left: calc((100vw - ${p => p.width || p.theme.pageWidth.desktop}) / 2);
    margin: 0 calc(-1 * (100vw - ${p => p.theme.pageWidth.desktop}) / 2);
  `}

  ${media.tablet`
    padding-left: 30px;
    padding-right: 30px;
  `}

  ${media.mobile`
    padding-left: 10px;
    padding-right: 10px;
  `}
`;