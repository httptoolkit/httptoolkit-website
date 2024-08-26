'use client';

import * as React from "react";
import { useTheme } from "next-themes";

import { useMounted } from '@/lib/hooks/use-mounted';
import { VideoCallback } from "@/lib/video-events";

import {
    darkPulLZoneId,
    lightPullZoneId,
    videoDictionary,
    VideoKey
} from "@/content/data/video-dictionary";

import { StyledVideo } from "./direct-video-player.styles";

export const DirectVideoPlayer = (props: {
    videoId: VideoKey,
    eventListener?: VideoCallback,

    showControls?: boolean,
    loop?: boolean
}) => {
    const { isMounted } = useMounted();
    const { resolvedTheme: theme } = useTheme();

    const { lightId, darkId, aspectRatio } = videoDictionary[props.videoId];

    const dark720Url = `https://${darkPulLZoneId}.b-cdn.net/${darkId}/play_720p.mp4`;
    const light720Url = `https://${lightPullZoneId}.b-cdn.net/${lightId}/play_720p.mp4`;

    const darkVideoRef = React.useRef<HTMLVideoElement>(null);
    const lightVideoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        // Once we're mounted, there should always be at most one video element rendered:
        const videoElem = darkVideoRef.current || lightVideoRef.current;
        if (!videoElem || !props.eventListener) return;

        const abortController = new AbortController();

        const videoAPI = {
            getCurrentTime() {
                return videoElem.currentTime;
            },
            setCurrentTime(time: number) {
                videoElem.currentTime = time;
            },
            play() {
                videoElem.play();
            },
            pause() {
                videoElem.pause();
            },
            isPaused() {
                return videoElem.paused;
            }
        };

        if (videoElem.readyState === 4) {
            props.eventListener('ready', videoAPI);
        } else {
            videoElem.addEventListener('canplaythrough', () => {
                props.eventListener?.('ready', videoAPI);
            }, { signal: abortController.signal });
        }

        videoElem.addEventListener('play', () => {
            props.eventListener?.('play', videoAPI);
        }, { signal: abortController.signal });

        videoElem.addEventListener('pause', () => {
            props.eventListener?.('pause', videoAPI);
        }, { signal: abortController.signal });

        videoElem.addEventListener('seeked', () => {
            props.eventListener?.('seeked', videoAPI);
        }, { signal: abortController.signal });

        videoElem.addEventListener('timeupdate', () => {
            props.eventListener?.('timeupdate', videoAPI);
        }, { signal: abortController.signal });

        return () => abortController.abort();
    }, [props.eventListener, darkVideoRef.current, lightVideoRef.current]);

    return <>
        {(!isMounted || theme === 'dark') &&
            <StyledVideo
                controls={props.showControls ?? true}
                autoPlay
                loop={props.loop ?? true}
                muted

                ref={darkVideoRef}

                // During SSR, we show both but hide via CSS matching against system prefs:
                $mounted={isMounted}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="light"

                $aspectRatio={aspectRatio}
            >
                <source src={dark720Url} type="video/mp4" />
            </StyledVideo>
        }
        {(!isMounted || theme === 'light') &&
            <StyledVideo
                controls={props.showControls ?? true}
                autoPlay
                loop={props.loop ?? true}
                muted

                ref={lightVideoRef}

                // During SSR, we show both but hide via CSS matching against system prefs:
                $mounted={isMounted}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="dark"

                $aspectRatio={aspectRatio}
            >
                <source src={light720Url} type="video/mp4" />
            </StyledVideo>
        }
    </>;
};