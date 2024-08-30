import React from 'react';

import {
    PhoneOutline,
    PhoneScreen,
    HomeButton
} from './phone-window.styles';

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