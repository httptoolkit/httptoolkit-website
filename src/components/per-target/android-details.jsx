import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { styled, media } from '../../styles';

import { PhoneContainer } from '../phone-container';

import * as connectedScreenshot from '../../images/android-app-connected.png';

const DetailsContainer = styled.section`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    position: relative;

    ${media.desktop`
        margin-top: -60px;
        margin-bottom: 20px;
        max-height: 480px;

        > ${PhoneContainer} {
            flex-basis: 100%;
            flex-shrink: 0;
            margin: -40px 20px;
        }
    `}

    ${media.tablet`
        padding-right: 20%;

        > ${PhoneContainer} {
            position: absolute;
            left: 75%;
            top: 50%;
            transform: translateY(-50%);
        }
    `}

    ${media.mobile`
        > ${PhoneContainer} {
            display: none;
        }
    `}
`;

const DetailsContent = styled.div`
    border-radius: 4px;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.1);
    background-color: ${p => p.theme.mainBackground};
    padding: 20px 40px 0 20px;

    ${media.desktop`
        width: calc((100% - 324px) / 2);
        flex-grow: 1;

        & + & {
            margin-top: 20px;
        }
    `}

    ${media.tablet`
        padding-bottom: 20px;
        margin: 0 20px 20px;
        z-index: -1;
    `};

    ${media.mobile`
        padding-bottom: 20px;
        margin: 0 10px 20px;
    `};

    label {
        display: flex;
        align-items: center;
    }

    > label, > h3 {
        margin-bottom: 15px;
    }

    h3 {
        ${p => p.theme.fontSizeSubheading};
        color: ${p => p.theme.mainColor};
        line-height: 1.1;
        font-weight: bold;

        padding-right: 30px;
    }

    p {
        ${p => p.theme.fontSizeText};
        line-height: 1.3;

        ${media.mobileOrTablet`
            &:not(:last-child) {
                margin-bottom: 15px;
            }
        `}

        ${media.desktop`
            margin-bottom: 15px;
        `}
    }

    position: relative;

    > svg {
        position: absolute;
        top: 11px;
        right: 20px;
        height: 48px;
        color: ${p => p.theme.mainColor};
        font-size: 2em;
        width: 1em;
        opacity: 0.2;
        z-index: 0;
    }

    strong a {
        color: ${p => p.theme.popColor};
    }

    input {
        &[type=checkbox], & + label .chevron {
            display: none;

            margin-right: 18px;
        }

        ${media.mobile`
            &:checked {
                & + label [data-icon=chevron-up] {
                    display: inline;
                }
            }

            &:not(:checked) {
                & + label [data-icon=chevron-down] {
                    display: inline;
                }

                & + label {
                    margin-bottom: 0;
                }

                & ~ p {
                    display: none;
                }
            }
        `}
    }
`;

const AndroidScreenshot = styled.img`
    display: block;
    height: 480px;
    width: 270px;
`;

export const AndroidDetails = () => <DetailsContainer>
    <DetailsContent>
        <FontAwesomeIcon icon={['fas', 'search']} />

        <input id="debug-toggle" type="checkbox" />
        <label htmlFor="debug-toggle">
            <FontAwesomeIcon className="chevron" icon={'fas', 'chevron-up'} />
            <FontAwesomeIcon className="chevron" icon={'fas', 'chevron-down'} />
            <h3>Debug your Android device's HTTP requests</h3>
        </label>

        <p>
            Scan a QR code on the device to start setup, or remotely connect debuggable devices via ADB.
        </p>
        <p>
            Reconnect again later in one tap.
        </p>
        <p>
            Supports Android Lollipop and later (v5 / API level 21+)
        </p>
    </DetailsContent>

    <DetailsContent>
        <FontAwesomeIcon icon={['fas', 'wrench']} />

        <input id="quickstart-toggle" type="checkbox" />
        <label htmlFor="quickstart-toggle">
            <FontAwesomeIcon className="chevron" icon={'fas', 'chevron-up'} />
            <FontAwesomeIcon className="chevron" icon={'fas', 'chevron-down'} />
            <h3>Get started instantly</h3>
        </label>

        <p>
            No messing around with certificate files and wifi settings.
        </p>
        <p>
            Click the button, accept permissions, start capturing traffic.
        </p>
    </DetailsContent>

    <PhoneContainer>
        <AndroidScreenshot
            src={connectedScreenshot}
            alt="Screenshot of the Android app, successfully connected"
        />
    </PhoneContainer>

    <DetailsContent>
        <FontAwesomeIcon icon={['fas', 'lock-open']} />

        <input id="decrypt-toggle" type="checkbox" />
        <label htmlFor="decrypt-toggle">
            <FontAwesomeIcon className="chevron" icon={'fas', 'chevron-up'} />
            <FontAwesomeIcon className="chevron" icon={'fas', 'chevron-down'} />
            <h3>Capture & inspect encrypted HTTPS</h3>
        </label>

        <p>
            Immediately view HTTPS on any device from apps that trust user-installed certificates, like Chrome.
        </p>
        <p>
            Enable trust in your own app with <a
                href="/docs/guides/android#intercepting-traffic-from-your-own-android-app"
                target="_blank"
                rel='noopener noreferrer'
            >one tiny manifest change</a>.
        </p>
        <p>
            On emulators & rooted devices, easily intercept HTTPS from <em>any</em> app, with automatic injection of a system certificate authority.
        </p>
    </DetailsContent>

    <DetailsContent>
        <h3>Want the full details?</h3>
        <p>Take a look at the <strong><a
            href="/docs/guides/android"
            target="_blank"
            rel='noopener noreferrer'
        >
            in-depth guide to Android HTTP debugging
        </a></strong>.</p>
    </DetailsContent>
</DetailsContainer>