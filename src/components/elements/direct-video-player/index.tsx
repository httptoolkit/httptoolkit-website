'use client';

import * as React from "react";
import { useTheme } from "next-themes";

import { useMounted } from '@/lib/hooks/use-mounted';
import { VideoCallback } from "@/lib/video-events";

import {
    darkPullZoneId,
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
    autoPlay?: boolean
}) => {
    const { isMounted } = useMounted();
    const { resolvedTheme: theme } = useTheme();

    const { lightId, darkId, aspectRatio } = videoDictionary[props.videoId];

    // Lots of different formats exposed for the same video. We pick the source
    // based on device width & pixel ratio. Video sizes are 720p=1280x720 vs
    // 480p=854x480. Playlist exposes both, but not widely supported.

    const darkThumbnail = `https://${darkPullZoneId}.b-cdn.net/${darkId}/thumbnail.jpg`;
    const darkVideoPlaylist = `https://${darkPullZoneId}.b-cdn.net/${darkId}/playlist.m3u8`;
    const dark720Url = `https://${darkPullZoneId}.b-cdn.net/${darkId}/play_720p.mp4`;
    const dark480Url = `https://${darkPullZoneId}.b-cdn.net/${darkId}/play_480p.mp4`;

    const lightThumbnail = `https://${lightPullZoneId}.b-cdn.net/${lightId}/thumbnail.jpg`;
    const lightVideoPlaylist = `https://${lightPullZoneId}.b-cdn.net/${lightId}/playlist.m3u8`;
    const light720Url = `https://${lightPullZoneId}.b-cdn.net/${lightId}/play_720p.mp4`;
    const light480Url = `https://${lightPullZoneId}.b-cdn.net/${lightId}/play_480p.mp4`;

    const darkVideoRef = React.useRef<HTMLVideoElement>(null);
    const lightVideoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (!isMounted) return;

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
    }, [isMounted, props.eventListener, darkVideoRef.current, lightVideoRef.current]);

    return <>
        {(!isMounted || theme === 'dark') &&
            <StyledVideo
                poster={darkThumbnail}
                controls={props.showControls ?? true}
                autoPlay={props.autoPlay ?? true}
                loop={props.loop ?? true}
                muted
                playsInline // Required for iOS non-fullscreen playback
                preload={isMounted ? "auto" : "metadata"}

                ref={darkVideoRef}

                // During SSR, we show both but hide via CSS matching against system prefs:
                $mounted={isMounted}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="light"

                $aspectRatio={aspectRatio}
            >
                <source src={darkVideoPlaylist} type="application/x-mpegURL" />

                <source src={dark720Url} type="video/mp4" media="(min-width: 426px) and (min-resolution: 2.5dppx)" />
                <source src={dark720Url} type="video/mp4" media="(min-width: 640px) and (min-resolution: 1.5dppx)" />
                <source src={dark720Url} type="video/mp4" media="(min-width: 1280px)" />

                <source src={dark480Url} />

                Video not available
            </StyledVideo>
        }
        {(!isMounted || theme === 'light') &&
            <StyledVideo
                poster={lightThumbnail}
                controls={props.showControls ?? true}
                autoPlay={props.autoPlay ?? true}
                loop={props.loop ?? true}
                muted
                playsInline // Required for iOS non-fullscreen playback
                preload={isMounted ? "auto" : "metadata"}

                ref={lightVideoRef}

                // During SSR, we show both but hide via CSS matching against system prefs:
                $mounted={isMounted}
                // Using this prop to css-hide for wrong theme
                data-hide-on-theme="dark"

                $aspectRatio={aspectRatio}
            >
                <source src={lightVideoPlaylist} type="application/x-mpegURL" />

                <source src={light720Url} type="video/mp4" media="(min-width: 426px) and (min-resolution: 2.5dppx)" />
                <source src={light720Url} type="video/mp4" media="(min-width: 640px) and (min-resolution: 1.5dppx)" />
                <source src={light720Url} type="video/mp4" media="(min-width: 1280px)" />

                <source src={light480Url} type="video/mp4" />

                Video not available
            </StyledVideo>
        }
    </>;
};