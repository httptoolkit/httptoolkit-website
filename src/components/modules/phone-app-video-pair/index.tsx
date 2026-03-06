'use client';

import * as React from 'react';

import { styled } from '@linaria/react';

import { PhoneWindow } from '@/components/elements/phone-window';
import { AppWindow } from '@/components/elements/app-window';

import { VideoKey, videoDictionary } from '@/content/data/video-dictionary';

import { DirectVideoPlayer } from '@/components/elements/direct-video-player';
import { useVideoLinking } from '@/lib/hooks/use-video-linking';

import { screens } from '@/styles/tokens';

const PairContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    max-width: 100%;
    width: 100%;

    @media (min-width: ${screens['lg']}) {
        width: 1344px;
        height: 744px;
    }

    margin: 0 auto;
    padding: 0 10px;

    > .phone {
        width: 300px;
        max-width: min(20vw, 300px);
        transition: margin 0.5s, transform 0.5s;
    }

    > .hidden-phone {
        margin-right: calc(-1 * min(20vw, 300px));
        transform: scale(70%);
    }

    > .visible-phone {
        margin-right: -5px;
        display: block;
        @media (min-width: ${screens['xl']}) {
            margin-right: 30px;
        }
    }
`;

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
                    loop={false}
                    autoPlay={false} // Managed by video linking
                />
            </PhoneWindow>
        </> }
        <AppWindow>
            <DirectVideoPlayer
                videoId={props.videoId}
                eventListener={parentListener}
                autoPlay={false} // Managed by video linking
            />
        </AppWindow>
    </PairContainer>
};
