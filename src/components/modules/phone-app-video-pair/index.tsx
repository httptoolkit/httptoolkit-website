'use client';

import * as React from 'react';

import { PhoneWindow } from '@/components/elements/phone-window';
import { AppWindow } from '@/components/elements/app-window';

import { VideoKey, videoDictionary } from '@/content/data/video-dictionary';

import { DirectVideoPlayer } from '@/components/elements/direct-video-player';
import { useVideoLinking } from '@/lib/hooks/use-video-linking';

import { PairContainer } from './phone-app-video-pair.styles';

export const PhoneAppVideoPair = (props: {
    videoId: VideoKey
}) => {
    const appVideo = videoDictionary[props.videoId];

    const { phoneVideo } = appVideo;
    const phoneVideoKey = appVideo.phoneVideo?.key;

    const phoneVideoData = phoneVideo?.key
        ? videoDictionary[phoneVideo?.key]
        : undefined;

    const [currentTime, setTime] = React.useState(0);

    const isPhoneVisible = phoneVideo && (
        phoneVideo.startTime <= currentTime &&
        phoneVideo.endTime >= currentTime
    );

    const phoneClassName = isPhoneVisible
        ? 'phone visible-phone'
        : 'phone hidden-phone';

    const { parentListener, childListener } =
        phoneVideo
        ? useVideoLinking({
            setTime,
            childOffset: phoneVideo?.startTime
        })
        : {} as { parentListener: undefined, childListener: undefined };

    return <PairContainer>
        { phoneVideo && <>
            <PhoneWindow
                className={phoneClassName}
                aspectRatio={phoneVideoData!.aspectRatio}
            >
                <DirectVideoPlayer
                    videoId={phoneVideoKey!}
                    eventListener={childListener}
                    showControls={false}
                />
            </PhoneWindow>
        </> }
        <AppWindow>
            <DirectVideoPlayer
                videoId='chrome'
                eventListener={parentListener}
            />
        </AppWindow>
    </PairContainer>
};