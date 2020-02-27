import { styled, media } from '../../styles';

export const TargetIconContainer = styled.div`
    ${media.desktop`
        margin-top: -60px;
    `}
    margin-bottom: 50px;

    > * {
        ${media.desktopOrTablet`
            margin: 0 20px;
            height: 120px;
        `}
        ${media.mobile`
            margin: 0 10px;
            height: 60px;
        `}
    }

    > :first-child {
        margin-left: 0;
    }

    > :last-child {
        margin-right: 0;
    }
`;