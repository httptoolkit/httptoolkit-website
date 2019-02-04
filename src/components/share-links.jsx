import { styled, media } from '../styles';

export default styled.div`
    ${media.mobile`
        text-align: center;
    `}

    > * {
        display: inline-block;

        ${media.desktopOrTablet`
            min-width: 250px;
        `}

        ${media.mobile`
            width: 90%;
        `}

        margin: 10px 10px 10px 0;
        padding: 20px;

        text-align: center;
        text-decoration: none;
        color: #fff;
        font-weight: bolder;
        ${p => p.theme.fontSizeSubheading};

        border-radius: 4px;
        border: 1px solid ${p => p.theme.containerBackground};

        > svg {
            display: block;
            margin: 0 auto 20px;
            height: 24px;
        }

        &.facebook {
            background: linear-gradient(to bottom, #4B69A8, #3B5998);
        }

        &.twitter {
            background: linear-gradient(to bottom, #10BCEF, #00ACED);
        }
    }
`;