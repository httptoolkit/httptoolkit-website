'use client';

import { styled } from '@/styles';

/**
 * A line break that's only shown on larger screens (leaving smaller screens to
 * word break for themselves naturally).
 */
export const ResponsiveLineBreak = styled.br`
    display: none;

    @media (min-width: ${({ theme }) => theme.screens.md}) {
        display: block;
    }
`;