'use client';

import * as React from "react";
import { useTheme } from "next-themes";

import { useMounted } from '@/lib/hooks/use-mounted';

import { StyledIframe } from "./video-player.styles";

const urlOptions = new URLSearchParams({
    autoplay: 'true',
    loop: 'true',
    muted: 'true',
    preload: 'true',
    responsive: 'true'
}).toString();

export const VideoPlayer = (props: {
    darkId: string,
    lightId: string,
    aspectRatio: string
}) => {
    const { isMounted } = useMounted();
    const { resolvedTheme: theme } = useTheme();

    const darkUrl = `https://iframe.mediadelivery.net/embed/${props.darkId}?${urlOptions}`;
    const lightUrl = `https://iframe.mediadelivery.net/embed/${props.lightId}?${urlOptions}`;

    return <>
        {(!isMounted || theme === 'dark') &&
            <StyledIframe
                src={darkUrl}

                // During SSR, we show both but hide via CSS matching against system prefs:
                $mounted={isMounted}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="light"

                $aspectRatio={props.aspectRatio}
                allow="autoplay;picture-in-picture;"
                allowFullScreen={true}
            />
        }
        {(!isMounted || theme === 'light') &&
            <StyledIframe
                src={lightUrl}

                // During SSR, we show both but hide via CSS matching against system prefs:
                $mounted={isMounted}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="dark"

                $aspectRatio={props.aspectRatio}
                allow="autoplay;picture-in-picture;"
                allowFullScreen={true}
            />
        }
    </>;
};