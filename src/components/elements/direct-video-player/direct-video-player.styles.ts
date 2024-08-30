'use client';

import { styled } from '@/styles';

export const StyledVideo = styled.video<{
    $aspectRatio: string,
    $mounted: boolean
}>`
    width: 100%;
    aspect-ratio: ${props => props.$aspectRatio};
    border: none;

    ${p => p.$mounted === false &&
    // During SSR, we render both and use CSS only to show the right default
    `
        @media (prefers-color-scheme: dark) {
            &[data-hide-on-theme="dark"] { display: none; }
        }

        @media (prefers-color-scheme: light) {
            &[data-hide-on-theme="light"] { display: none; }
        }
    `}
`;