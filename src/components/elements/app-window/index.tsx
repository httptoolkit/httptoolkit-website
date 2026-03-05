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
        <VideoWindowButtons xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100">
            <circle cx="75" cy="50" r="25"/>
            <circle cx="175" cy="50" r="25"/>
            <circle cx="275" cy="50" r="25"/>
        </VideoWindowButtons>
        <VideoWindowContents>
            { p.children }
        </VideoWindowContents>
    </VideoWindowBorder>;