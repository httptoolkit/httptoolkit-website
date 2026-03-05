import { styled } from '@linaria/react';

export const StyledIframe = styled.iframe`
    width: 100%;
    border: none;

    &:not([data-mounted="true"]) {
        @media (prefers-color-scheme: dark) {
            &[data-hide-on-theme="dark"] { display: none; }
        }

        @media (prefers-color-scheme: light) {
            &[data-hide-on-theme="light"] { display: none; }
        }
    }
`;
