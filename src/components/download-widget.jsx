import * as React from 'react';
import * as _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby';

import { styled, css } from '../styles';
import { Button } from './form';
import { MailchimpSignupForm } from './mailchimp-signup-form';

const DOWNLOAD_OPTIONS = {
    'win-exe': { name: 'Windows Installer', platform: 'Windows', icon: 'windows' },
    'win-standalone': { name: 'Windows Standalone Zip', platform: 'Windows', icon: 'windows' },
    'win-winget': { name: 'Windows via Winget', platform: 'Windows', icon: 'windows' },
    'linux-deb': { name: 'Linux Debian Package', platform: 'Linux (Deb)', icon: 'linux' },
    'linux-aur': { name: 'Linux Arch Package via AUR', platform: 'Linux (Arch)', icon: 'linux' },
    'linux-standalone': { name: 'Linux Standalone Zip', platform: 'Linux', icon: 'linux' },
    'osx-dmg': { name: 'MacOS DMG', platform: 'MacOS', icon: 'apple' },
    'osx-homebrew': { name: 'MacOS via Homebrew', platform: 'MacOS', icon: 'apple' }
}

const OPTIONS_HEIGHT = 236;

function detectDownloadOption() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return 'send-to-email';
    }

    const platform = navigator.platform;

    if (platform.startsWith('Linux') && !platform.includes('Linux arm')) {
        return 'linux-deb';
    } else if (platform.startsWith('Win')) {
        return 'win-exe';
    } else if (platform.startsWith('Mac')) {
        return 'osx-dmg';
    } else {
        return null;
    }
}

const DownloadButtonStyle = css`
    border: none;
    cursor: pointer;

    ${p => p.theme.fontSizeSubheading};
    white-space: normal;

    color: ${p => p.theme.primaryInputColor};
    background-color: ${p => p.theme.primaryInputBackground};
`;

const DownloadWidgetContainer = styled.div`
    position: relative;

    display: flex;
    align-items: stretch;
`;

const DownloadSelected = styled(Button)`
    ${DownloadButtonStyle}
    border-radius: 4px 0 0 4px;
    flex-grow: 1;
    font-weight: ${p => p.small ? 'normal' : 'bold'};

    ${p => p.small && css`
        padding: 15px 5px;
        ${p.theme.fontSizeText};
    `}

    &:focus {
        z-index: 1;
    }

    /* Relevant because we actually render as an <a href>, to provide a fallback for
       browsers that don't support JS (or other JS failure environments) */
    text-decoration: none;
`;

const DownloadOptionsButton = styled(Button)`
    ${DownloadButtonStyle}
    border-radius: 0 4px 4px 0;

    ${p => p.small && `
        padding: 10px 15px;
    `}

    &:focus {
        z-index: 1;
    }
`;

const SeparatePlatformText = styled.small`
    ${p => p.theme.fontSizeText};
    font-weight: normal;
    display: block;
`;

const DownloadOptions = styled.div`
    display: ${p => p.dropdownOpen ? 'block' : 'none'};

    border-radius: 4px;
    border: solid 1px ${p => p.theme.containerBorder};
    background-color: ${p => p.theme.popBackground};

    margin: 10px 0;
    z-index: 1;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2);

    width: 100%;
    position: absolute;
    ${p => p.hasSpaceAvailable ? 'top' : 'bottom'}: 100%;
`;

const downloadOptionCss = css`
    display: block;
    width: 100%;
    padding: 10px;
    text-decoration: none;

    cursor: pointer;
    border: none;
    background: none;
    font-family: 'Lato', sans-serif;
    ${p => p.theme.fontSizeText};

    font-weight: ${p => p.selected ? 'bold' : 'normal'};
    text-align: left;

    > svg {
        margin-right: 10px;
    }

    &:hover {
        background-color: ${p => p.theme.containerBackground};
    }
`;

const DownloadOption = styled(Link)`${downloadOptionCss}`;

const SendToEmailWrapper = styled.div`
    width: 100%;
    padding: 0 5px;
    ${p => p.theme.fontSizeText};
    display: flex;
    flex-direction: column;
`;

const SendToEmailExplanation = styled.p`
    font-style: italic;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 10px;
`;

export class DownloadWidget extends React.Component {

    containerRef = null;

    constructor(props) {
        super(props);

        this.state = {
            selectedId: false,
            dropdownOpen: false
        };
    }

    componentDidMount() {
        this.setState({
            selectedId: detectDownloadOption()
        });
    }

    render() {
        const { className, small, sendToEmailText, privacyPolicy } = this.props;
        const { selectedId, dropdownOpen } = this.state;

        if (selectedId === 'send-to-email') {
            return <DownloadWidgetContainer
                className={className}
                ref={(ref) => this.containerRef = ref}
            >
                <SendToEmailWrapper>
                    <SendToEmailExplanation>{
                        sendToEmailText || <>
                            On mobile? Send this to your computer and try it out there:
                        </>
                    }</SendToEmailExplanation>
                    <MailchimpSignupForm
                        autoFocus
                        action={`https://tech.us18.list-manage.com/subscribe/post?u=f6e81ee3f567741ec9800aa56&amp;id=358164ab38&SOURCE=download-widget`}
                        emailTitle={`Enter your email to get download links sent straight to your inbox`}
                        hiddenFieldName={"b_f6e81ee3f567741ec9800aa56_358164ab38"}
                        submitText={'Send me a download link'}
                        privacyPolicy={ privacyPolicy || '' }
                        forceVertical={true}
                    />
                </SendToEmailWrapper>
            </DownloadWidgetContainer>;
        } else {
            const selectedDetails = DOWNLOAD_OPTIONS[selectedId];

            const downloadOptionOrder = selectedId
                ? _.flatten(
                    // Show the current platform options first, then the rest:
                    _.partition(Object.keys(DOWNLOAD_OPTIONS), k => selectedId.startsWith(k.split('-')[0]))
                )
                : Object.keys(DOWNLOAD_OPTIONS);

            return <DownloadWidgetContainer
                className={className}
                ref={(ref) => this.containerRef = ref}
            >
                <DownloadSelected
                    onClick={this.downloadNow}
                    as='a'
                    href={selectedId
                        ? `/download/${selectedId}/`
                        : 'https://github.com/httptoolkit/httptoolkit-desktop/releases/latest'
                    }
                    small={small}
                >
                    { small
                        ? `Download ${selectedDetails ? ` for ${selectedDetails.platform}` : ''}`
                        : <>Download free now{
                            selectedDetails ? <SeparatePlatformText>
                                for {selectedDetails.platform}
                            </SeparatePlatformText> : ''
                        }</>
                    }
                </DownloadSelected>
                <DownloadOptionsButton onClick={this.toggleDropdown} small={small}>
                    <FontAwesomeIcon icon={[
                        'fas',
                        dropdownOpen ? 'chevron-up' : 'chevron-down'
                    ]} />
                </DownloadOptionsButton>
                <DownloadOptions
                    dropdownOpen={dropdownOpen}
                    hasSpaceAvailable={this.isDownloadOptionsSpaceAvailable()}
                >
                    { _.map(downloadOptionOrder, (downloadId) =>
                        <DownloadOption
                            key={downloadId}
                            to={`/download/${downloadId}/`}
                            selected={selectedId === downloadId}
                        >
                            <FontAwesomeIcon icon={['fab', DOWNLOAD_OPTIONS[downloadId].icon]} fixedWidth />
                            {DOWNLOAD_OPTIONS[downloadId].name}
                        </DownloadOption>
                    ) }
                </DownloadOptions>
            </DownloadWidgetContainer>;
        }
    }

    isDownloadOptionsSpaceAvailable() {
        if (this.containerRef) {
            const rect = this.containerRef.getBoundingClientRect();
            const scrollOffset = document.documentElement.scrollTop;
            const bottomPosition = rect.bottom + scrollOffset;
            const documentHeight = document.documentElement.scrollHeight;

            return documentHeight - bottomPosition > OPTIONS_HEIGHT;
        } else {
            return true;
        }
    }

    toggleDropdown = () => {
        const { dropdownOpen } = this.state;

        this.setState({
            dropdownOpen: !dropdownOpen
        });
    }

    downloadNow = (event) => {
        const { selectedId } = this.state;
        if (!selectedId) {
            event.preventDefault();
            this.toggleDropdown();
        }
        // If not, we just let the normal link behaviour work its magic.
    }
}