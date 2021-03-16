import { styled, media } from '../../styles';

export const GettingStartedSteps = styled.ol`
    counter-reset: item;
    ${p => p.theme.fontSizeSubheading};
    line-height: 1.3;

    margin: 0 auto 60px;

    ${media.mobileOrTablet`
        padding: 0 10px;
    `}

    > li {
        counter-increment: item;

        &:not(:last-child) {
            margin-bottom: 20px;
        }

        display: flex;
        align-items: flex-start;

        &:before {
            content: counter(item);
            flex-grow: 0;
            flex-shrink: 0;

            ${p => p.theme.fontSizeText};
            font-weight: bold;
            box-sizing: border-box;

            ${media.desktop`
                flex-basis: 42px;
                padding: 8px 8px 9px 7px;
                margin: -4px 20px 0 0;
            `}
            ${media.tablet`
                flex-basis: 36px;
                padding: 8px 8px 8px 7px;
                margin: 0 20px 0 0;
            `}
            ${media.mobile`
                flex-basis: 36px;
                padding: 6px 10px 7px 9px;
                margin: 0 10px 0 0;
            `}

            text-align: center;

            border-radius: 50%;
            background: ${p => p.theme.primaryInputBackground};
            color: ${p => p.theme.mainBackground};
        }
    }
`;