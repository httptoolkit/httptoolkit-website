import React from 'react';
import { styled, media, css } from '../styles';

export const Nowrap = styled(({ children, className }) => <span className={className}>
    {children}
</span>)`
    white-space: nowrap;
`;