import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const MobileFullscreenButton = styled.button`
    ${media.desktopOrTablet`
        display: none;
    `};

    border: none;
    background: none;
    ${p => p.theme.fontSizeTinyText};
    font-family: 'Lato', sans-serif;
    cursor: pointer;
    text-decoration: underline;
    opacity: 0.4;

    position: absolute;
    top: calc(100% + 4px);
    right: 6px;
    padding: 0;

    > svg {
        margin-left: 3px;
    }
`;

const PhonePlusDesktopContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;

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
        const video = videoRef.current;
        if (!video) return;

        const updateVideoContent = () => {
            const currentTime = video.currentTime;

            const videoIsFullscreen =
                document.fullscreenElement === video ||
                document.webkitFullscreenElement === video ||
                video.webkitDisplayingFullscreen === true;

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
        document.addEventListener('webkitbeginfullscreen', updateVideoContent);
        document.addEventListener('webkitendfullscreen', updateVideoContent);
        video.addEventListener('fullscreenchange', updateVideoContent);
        video.addEventListener('webkitbeginfullscreen', updateVideoContent);
        video.addEventListener('webkitendfullscreen', updateVideoContent);

        return () => {
            document.removeEventListener('fullscreenchange', updateVideoContent);
            document.removeEventListener('mozfullscreenchange', updateVideoContent);
            document.removeEventListener('webkitfullscreenchange', updateVideoContent);
            document.removeEventListener('webkitbeginfullscreen', updateVideoContent);
            document.removeEventListener('webkitendfullscreen', updateVideoContent);
            video.removeEventListener('fullscreenchange', updateVideoContent);
            video.removeEventListener('webkitbeginfullscreen', updateVideoContent);
            video.removeEventListener('webkitendfullscreen', updateVideoContent);
        };
    }, [videoRef]);
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
        videoA.addEventListener('timeupdate', () => {
            if (Math.abs(videoB.currentTime - videoB.currentTime) > 0.5) {
                videoB.currentTime = videoA.currentTime;
            }
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
        <MobileFullscreenButton onClick={() => {
            const video = desktopVideoRef.current;
            if (!video) return;
            video.requestFullscreen();
        }}>
            View fullscreen <FontAwesomeIcon icon={['far', 'expand-arrows']} />
        </MobileFullscreenButton>
    </PhonePlusDesktopContainer>;
}