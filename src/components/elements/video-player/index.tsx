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
    libraryId: string,
    darkId: string,
    lightId: string,
    aspectRatio: string
}) => {
    const { isMounted } = useMounted();
    const { resolvedTheme: theme } = useTheme();

    const darkUrl = `https://iframe.mediadelivery.net/embed/${props.libraryId}/${props.darkId}?${urlOptions}`;
    const lightUrl = `https://iframe.mediadelivery.net/embed/${props.libraryId}/${props.lightId}?${urlOptions}`;

    const darkVisibility = isMounted
        ? theme === 'dark'
        : undefined;
    const lightVisibility = isMounted
        ? theme === 'light'
        : undefined;

    return <>
        { (!isMounted || theme === 'dark') &&
            <StyledIframe
                src={darkUrl}

                loading="lazy"
                // Hide if wrong theme
                data-hide-on-theme="light"
                $visible={darkVisibility}

                $aspectRatio={props.aspectRatio}
                allow="autoplay;picture-in-picture;"
                allowFullScreen={true}
            />
        }
        { (!isMounted || theme === 'light') &&
            <StyledIframe
                src={lightUrl}

                loading="lazy"
                // Hide if wrong theme
                data-hide-on-theme="dark"
                $visible={lightVisibility}

                $aspectRatio={props.aspectRatio}
                allow="autoplay;picture-in-picture;"
                allowFullScreen={true}
            />
        }
    </>;
};