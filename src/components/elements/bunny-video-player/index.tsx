'use client';

import * as React from "react";
import { useTheme } from "next-themes";

import { styled } from '@linaria/react';

import { useMounted } from '@/lib/hooks/use-mounted';
import { darkLibraryId, lightLibraryId, videoDictionary, VideoKey } from "@/content/data/video-dictionary";

const StyledIframe = styled.iframe`
    width: 100%;
    border: none;

    &:not([data-mounted="true"]) {
        @media (prefers-color-scheme: dark) {
            &[data-hide-on-theme="dark"] { display: none; }
        }

        @media (prefers-color-scheme: light) {
            &[data-hide-on-theme="light"] { display: none; }
        }
    }
`;

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
                data-mounted={isMounted ? "true" : "false"}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="light"

                style={{ aspectRatio }}
                allow="autoplay;picture-in-picture;"
                allowFullScreen={true}
            />
        }
        {(!isMounted || theme === 'light') &&
            <StyledIframe
                src={lightUrl}

                // During SSR, we show both but hide via CSS matching against system prefs:
                data-mounted={isMounted ? "true" : "false"}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="dark"

                style={{ aspectRatio }}
                allow="autoplay;picture-in-picture;"
                allowFullScreen={true}
            />
        }
    </>;
};
