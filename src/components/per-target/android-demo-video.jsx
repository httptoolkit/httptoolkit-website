import React from 'react';

import { styled, media } from '../../styles';

import { AppWindow } from '../app-window';
import { PhoneContainer } from '../phone-container';

const DesktopDemoVideo = styled.video`
    display: block;
    background-color: #000;
    width: 100%;

    ${media.desktop`
        border-radius: 0 0 5px 5px;
    `}
`;

const PhoneDemoVideo = styled.video`
    display: block;
    background-color: #000;

    max-width: 208px;
    width: 100%;
`;

const PhonePlusDesktopContainer = styled.div`
    display: flex;
    align-items: center;

    margin-bottom: 60px;

    ${media.desktop`
        margin-top: -336px;
    `}

    ${media.mobileOrTablet`
        margin-top: -100px;
    `}

    ${media.tablet`
        margin-left: 30px;
        margin-right: 30px;
        max-width: calc(100% - 60px);
    `}

    ${PhoneContainer} {
        ${media.desktopOrTablet`
            margin-right: 20px;
        `}
        ${media.mobile`
            margin-right: -4px;
        `}

        flex: 1 1 222px;
    }

    ${AppWindow} {
        flex: 1 1 782px;
    }
`;

// A hook which swaps out the contents of a video when it goes fullscreen.
const useVideoFullscreenSwap = (videoRef, initialSrc, fullscreenSrc) => {
    React.useEffect(() => {
        const updateVideoContent = () => {
            const video = videoRef.current;
            if (!video) return;

            const currentTime = video.currentTime;

            const videoIsFullscreen = document.fullscreenElement == video;
            if (videoIsFullscreen) {
                video.setAttribute('src', fullscreenSrc);
            } else {
                video.setAttribute('src', initialSrc);
            }
            video.currentTime = currentTime;
        };

        document.addEventListener('fullscreenchange', updateVideoContent);
        document.addEventListener('mozfullscreenchange', updateVideoContent);
        document.addEventListener('webkitfullscreenchange', updateVideoContent);

        return () => {
            document.removeEventListener('fullscreenchange', updateVideoContent);
            document.removeEventListener('mozfullscreenchange', updateVideoContent);
            document.removeEventListener('webkitfullscreenchange', updateVideoContent);
        };
    }, [videoRef.current]);
};

const useVideoLinking = (videoARef, videoBRef) => {
    React.useEffect(() => {
        const videoA = videoARef.current;
        const videoB = videoBRef.current;
        if (!videoA || !videoB) return;

        videoA.addEventListener('play', () => {
            videoB.currentTime = videoA.currentTime;
            videoB.play();
        });
        videoA.addEventListener('pause', () => {
            videoB.currentTime = videoA.currentTime;
            videoB.pause();
        });

        // Wait until both videos have enough data before letting them start:
        let loaded = 0;
        if (videoA.readyState === 4) loaded += 1;
        if (videoB.readyState === 4) loaded += 1;
        if (loaded !== 2) {
            videoA.pause();
            videoB.pause();

            const onLoad = () => {
                loaded += 1;
                if (loaded >= 2) {
                    videoA.removeEventListener('canplaythrough', onLoad);
                    videoB.removeEventListener('canplaythrough', onLoad);
                    videoA.play();
                }
            };

            videoA.addEventListener('canplaythrough', onLoad);
            videoB.addEventListener('canplaythrough', onLoad);
        }

        requestAnimationFrame(() => {
            videoB.currentTime = videoA.currentTime;
        });
    }, [videoARef.current, videoBRef.current]);
};

export const AndroidDemoVideo = () => {
    const mobileVideoRef = React.useRef();
    const desktopVideoRef = React.useRef();

    useVideoFullscreenSwap(desktopVideoRef, "/android-desktop-demo.mp4", "/android-both-demo.mp4");
    useVideoLinking(desktopVideoRef, mobileVideoRef);

    return <PhonePlusDesktopContainer>
        <PhoneContainer>
            <PhoneDemoVideo autoPlay loop muted ref={mobileVideoRef}>
                <source src='/android-mobile-demo.mp4' type="video/mp4" />
            </PhoneDemoVideo>
        </PhoneContainer>
        <AppWindow>
            <DesktopDemoVideo controls autoPlay loop muted ref={desktopVideoRef}>
                <source src='/android-desktop-demo.mp4' type="video/mp4" />
            </DesktopDemoVideo>
        </AppWindow>
    </PhonePlusDesktopContainer>;
}