'use client';

import { styled } from '@/styles';

export const StyledIframe = styled.iframe<{
    $aspectRatio: string,
    $visible: boolean | undefined
}>`
    width: 100%;
    aspect-ratio: ${props => props.$aspectRatio};
    border: none;

    ${p => p.$visible === undefined &&
    // During SSR, we render both and use CSS only to show the right default
    `
        @media (prefers-color-scheme: dark) {
            &[data-hide-on-theme="dark"] { display: none; }
        }

        @media (prefers-color-scheme: light) {
            &[data-hide-on-theme="light"] { display: none; }
        }
    `}

    ${p => p.$visible === false &&
    // Once rendering is active, we render only the right one, but then we also
    // make it hidden until the content is actually ready.
    `
        visibility: hidden;
    `}
`;