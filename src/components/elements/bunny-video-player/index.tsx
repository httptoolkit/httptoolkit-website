'use client';

import * as React from "react";
import { useTheme } from "next-themes";

import { useMounted } from '@/lib/hooks/use-mounted';
import { darkLibraryId, lightLibraryId, videoDictionary, VideoKey } from "@/content/data/video-dictionary";

import { StyledIframe } from "./bunny-video-player.styles";

const urlOptions = new URLSearchParams({
    autoplay: 'true',
    loop: 'true',
    muted: 'true',
    preload: 'true',
    responsive: 'true'
}).toString();

export const BunnyVideoPlayer = (props: {
    videoId: VideoKey
}) => {
    const { isMounted } = useMounted();
    const { resolvedTheme: theme } = useTheme();

    const { lightId, darkId, aspectRatio } = videoDictionary[props.videoId];

    const darkUrl = `https://iframe.mediadelivery.net/embed/${darkLibraryId}/${darkId}?${urlOptions}`;
    const lightUrl = `https://iframe.mediadelivery.net/embed/${lightLibraryId}/${lightId}?${urlOptions}`;

    return <>
        {(!isMounted || theme === 'dark') &&
            <StyledIframe
                src={darkUrl}

                // During SSR, we show both but hide via CSS matching against system prefs:
                $mounted={isMounted}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="light"

                $aspectRatio={aspectRatio}
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

                $aspectRatio={aspectRatio}
                allow="autoplay;picture-in-picture;"
                allowFullScreen={true}
            />
        }
    </>;
};