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

        &:before {
            content: counter(item);

            ${p => p.theme.fontSizeText};
            font-weight: bold;
            box-sizing: border-box;

            ${media.desktop`
                width: 42px;
                padding: 8px 9px 9px 8px;
                margin: 0 20px 0 0;
            `}
            ${media.tablet`
                width: 36px;
                padding: 8px 9px 8px 8px;
                margin: 0 20px 0 0;
            `}
            ${media.mobile`
                width: 36px;
                padding: 4px 5px 4px 4px;
                margin: 0 10px -4px 0;
                float: left;
            `}

            text-align: center;

            display: inline-block;
            border-radius: 50%;
            background: #1f83e0;
            color: ${p => p.theme.mainBackground};
        }
    }
`;