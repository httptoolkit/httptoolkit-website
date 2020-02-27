import { styled, media } from '../styles';

import { DownloadWidget } from './download-widget';
import { ButtonLink } from './form';

export const DownloadCTA = styled(DownloadWidget)`
    ${media.desktop`
        width: 38%;
    `}
    ${media.mobileOrTablet`
        min-width: 80%;
    `}

    > button {
        &:first-child {
            border-right: none;
        }
        &:not(:first-child) {
            border-left: none;
        }
    }
`;

export const StandaloneDownloadCTA = styled(DownloadCTA).attrs({
    outsideContainer: true
})`
    ${media.desktop`
        width: 50%;
        margin: 0 auto 120px;
    `}

    ${media.mobileOrTablet`
        margin: 0 10px 120px;
    `};
`;


export const BuyProCTA = styled(ButtonLink).attrs({
    to: '/get-pro',
    children: 'Get Pro'
})`
    ${p => p.theme.fontSizeNearlyHeading};
    font-weight: bold;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 38%;
    ${media.mobileOrTablet`
        display: none;
    `}
`;