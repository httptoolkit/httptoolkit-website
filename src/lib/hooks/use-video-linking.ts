import * as React from 'react';

import { VideoAPI, VideoEvent } from "../video-events";

interface VideoLinkingOptions {
    setTime: (time: number) => void;
    childOffset: number;
}

export const useVideoLinking = (options: VideoLinkingOptions) => {
    const { setTime, childOffset } = options;

    return React.useMemo(() => {
        let parentVideo: VideoAPI | null = null;
        let childVideo: VideoAPI | null = null;

        const SEEK_DEBOUNCE = 500;
        let seeking = false;
        let seekTimeout: NodeJS.Timeout | null = null;
        const startSeeking = () => {
            seeking = true;

            if (seekTimeout) clearTimeout(seekTimeout);
            seekTimeout = setTimeout(() => {
                seeking = false;
                seekTimeout = null;
                setTime(parentVideo!.getCurrentTime());
            }, SEEK_DEBOUNCE);
        };

        let started = false;
        function startVideos() {
            childVideo!.setCurrentTime(Math.max(parentVideo!.getCurrentTime() - childOffset, 0));

            parentVideo!.play();
            childVideo!.play();
            started = true;
        }

        return {
            parentListener: (event: VideoEvent, video: VideoAPI) => {
                parentVideo = video;

                if (event === 'ready') {
                    if (childVideo) {
                        startVideos();
                    } else {
                        video.pause();
                        video.setCurrentTime(0);
                        setTime(0);
                    }

                    return;
                }

                if (!childVideo) return;

                const time = parentVideo.getCurrentTime();

                const childTime = Math.max(parentVideo.getCurrentTime() - childOffset, 0);
                const childTimeInSync = Math.abs(childVideo.getCurrentTime() - childTime) < 0.5;

                if (event === 'play') {
                    if (!childTimeInSync) childVideo.setCurrentTime(childTime);
                    childVideo.play();
                } else if (event === 'pause') {
                    if (!childTimeInSync) childVideo.setCurrentTime(childTime);
                    childVideo.pause();
                } else if (event === 'seeked') {
                    startSeeking();
                    childVideo.setCurrentTime(childTime);
                } else if (event === 'timeupdate') {
                    // We skip time updates while seeking to avoid bouncing the UI around too
                    // much. Set time may get out of date
                    if (!seeking) setTime(time);

                    if (!childTimeInSync) childVideo.setCurrentTime(childTime);
                }
            },
            childListener: (event: VideoEvent, video: VideoAPI) => {
                childVideo = video;

                if (event === 'ready') {
                    if (!parentVideo) {
                        childVideo.pause();
                        childVideo.setCurrentTime(0);
                    } else if (!started) {
                        startVideos();
                    }
                }
            }
        }
    }, [setTime, childOffset]);
};