import React from 'react';

import { styled } from '../../styles';

import { PhoneContainer } from '../phone-container';

import * as connectedScreenshot from '../../images/android-app-connected.png';

const DetailsContainer = styled.section`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    margin: 60px 0 20px;
    max-height: 502px;

    > ${PhoneContainer} {
        flex-basis: 100%;
        flex-shrink: 0;
        margin: -40px 20px;
    }
`;

const DetailsContent = styled.div`
    border-radius: 4px;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.1);
    background-color: ${p => p.theme.mainBackground};
    padding: 20px 40px 0 20px;

    width: calc((100% - 324px) / 2);
    flex-grow: 1;

    margin-bottom: 20px;

    h3 {
        text-transform: uppercase;
        ${p => p.theme.fontSizeSubheading};
        color: ${p => p.theme.mainSubtleColor};
        font-weight: bold;

        padding-bottom: 10px;

        &:not(:first-child) {
            margin-top: 20px;
        }
    }

    p {
        ${p => p.theme.fontSizeText};
        line-height: 1.3;

        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
`;

export const AndroidDetails = () => <DetailsContainer>
    <DetailsContent>
        <h3>
            Debug HTTP from any Android device
        </h3>
        <p>
            Scan a QR code on the device to start setup, or remotely connect debuggable devices via ADB.
        </p>
        <p>
            Reconnect again later in one tap.
        </p>
        <p>
            Supports Android Lollipop and later (that means v5 / API level 21+)
        </p>
    </DetailsContent>

    <DetailsContent>
        <h3>Self-driving setup</h3>
        <p>
            No messing around with certificate files and wifi settings.
        </p>
        <p>
            Click the button, accept permissions, start capturing traffic.
        </p>
    </DetailsContent>

    <PhoneContainer>
        <img
            src={connectedScreenshot}
            alt="Screenshot of the Android app, successfully connected"
        />
    </PhoneContainer>

    <DetailsContent>
        <h3>Capture & inspect encrypted HTTPS</h3>
        <p>
            Inspect HTTPS on non-rooted devices from apps like Chrome that trust user-installed CA certificates.
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
        <h3>Want more details?</h3>
        <p>Take a look at the <a
            href="/docs/guides/android"
            target="_blank"
            rel='noopener noreferrer'
        >
            full guide to Android HTTP debugging
        </a>.</p>
    </DetailsContent>
</DetailsContainer>