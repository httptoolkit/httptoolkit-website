import React from 'react';

import { HomeButton, PhoneOutline, PhoneScreen } from './phone-window.styles';

export const PhoneWindow = (p: {
    aspectRatio: string;
    children: React.ReactNode;
    className?: string;
}) => <PhoneOutline className={p.className}>
        <PhoneScreen $aspectRatio={p.aspectRatio}>
            { p.children }
        </PhoneScreen>
        <HomeButton />
    </PhoneOutline>;
