import { StyledIframe } from "./video-player.styles";

const urlOptions = 'autoplay=true&loop=true&muted=true&preload=true&responsive=true';

export const VideoPlayer = (props: {
    libraryId: string,
    darkId: string,
    lightId: string,
    aspectRatio: string
}) => {
    const darkUrl = `https://iframe.mediadelivery.net/embed/${props.libraryId}/${props.darkId}?${urlOptions}`;
    const lightUrl = `https://iframe.mediadelivery.net/embed/${props.libraryId}/${props.lightId}?${urlOptions}`;

    return <>
        <StyledIframe
            src={lightUrl}
            data-hide-on-theme="dark"
            aspectRatio={props.aspectRatio}
            allow="autoplay;picture-in-picture;"
            allowFullScreen={true}
        />
        <StyledIframe
            src={darkUrl}
            data-hide-on-theme="light"
            aspectRatio={props.aspectRatio}
            allow="autoplay;picture-in-picture;"
            allowFullScreen={true}
        />
    </>;
};