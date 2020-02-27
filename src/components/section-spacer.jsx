import { styled, media } from '../styles';

export const SectionSpacer = styled.div`
    width: 100%;
    visibility: hidden;

    ${media.desktop`
        height: 120px;
    `}

    ${media.mobileOrTablet`
        height: 60px;
    `}
`;