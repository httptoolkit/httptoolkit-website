export type VideoEvent =
    | 'ready'
    | 'play'
    | 'pause'
    | 'seeked'
    | 'timeupdate';

export type VideoAPI = {
    getCurrentTime(): number;
    setCurrentTime(time: number): void;
    play(): void;
    pause(): void;
    isPaused(): boolean;
};

export type VideoCallback = (
    event: VideoEvent,
    video: VideoAPI
) => void;