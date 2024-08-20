'use client';

import { styled } from '@/styles';

export const StyledIframe = styled.iframe<{
    aspectRatio: string
}>`
    width: 100%;
    aspect-ratio: ${props => props.aspectRatio};
    border: none;
`;