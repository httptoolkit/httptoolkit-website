import React from 'react';

import { HomeButton, PhoneOutline, PhoneScreen } from './phone-window.styles';

export const PhoneWindow = (p: {
    aspectRatio: string;
    children: React.ReactNode;
    className?: string;
}) => <PhoneOutline className={p.className}>
        <PhoneScreen style={{ '--phone-aspect-ratio': p.aspectRatio } as React.CSSProperties}>
            { p.children }
        </PhoneScreen>
        <HomeButton />
    </PhoneOutline>;
