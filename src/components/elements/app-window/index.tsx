import React from 'react';

import {
    VideoWindowBorder,
    VideoWindowButtons,
    VideoWindowContents
} from './app-window.styles';

export const AppWindow = (p: {
    children: React.ReactNode
}) =>
    <VideoWindowBorder>
        <VideoWindowButtons>
            <circle cx="75" cy="50" r="25"/>
            <circle cx="175" cy="50" r="25"/>
            <circle cx="275" cy="50" r="25"/>
        </VideoWindowButtons>
        <VideoWindowContents>
            { p.children }
        </VideoWindowContents>
    </VideoWindowBorder>;