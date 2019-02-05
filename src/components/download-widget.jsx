import * as React from 'react';
import * as _ from 'lodash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby';

import { styled, css } from '../styles';
import { Button } from '../components/form';

const DOWNLOAD_OPTIONS = {
    'win-exe': { name: 'Windows Installer', platform: 'Windows', icon: 'windows' },
    // TODO: Disabled temporarily, broken by https://github.com/electron-userland/electron-forge/issues/670
    // 'win-standalone': { name: 'Windows Standalone Zip', platform: 'Windows', icon: 'windows' },
    'linux-deb': { name: 'Linux Debian Package', platform: 'Linux (Deb)', icon: 'linux' },
    'linux-standalone': { name: 'Linux Standalone Zip', platform: 'Linux', icon: 'linux' },
    'osx-dmg': { name: 'MacOS DMG', platform: 'MacOS', icon: 'apple' },
    'osx-standalone': { name: 'MacOS Standalone Zip', platform: 'MacOS', icon: 'apple' }
}

const OPTIONS_HEIGHT = 236;

function detectDownloadOption() {
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

    color: #fff;
    background-color: ${p => p.theme.primaryColor};
`;

const DownloadWidgetContainer = styled.div`
    position: relative;

    display: flex;
    align-items: stretch;
`;

const DownloadSelected = styled(Button)`
    ${DownloadButtonStyle}
    border-radius: 4px 0 0 4px;
    font-weight: bold;
`;

const DownloadOptionsButton = styled(Button)`
    ${DownloadButtonStyle}
    border-radius: 0 4px 4px 0;
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

const DownloadOption = styled(Link)`
    display: block;
    padding: 10px;
    text-decoration: none;

    font-weight: ${p => p.selected ? 'bold' : 'normal'};
    text-align: left;

    > svg {
        margin-right: 10px;
    }

    &:hover {
        background-color: ${p => p.theme.containerBackground};
    }
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
        const { className } = this.props;
        const { selectedId, dropdownOpen } = this.state;
        const selectedDetails = DOWNLOAD_OPTIONS[selectedId];

        return <DownloadWidgetContainer
            className={className}
            innerRef={(ref) => this.containerRef = ref}
        >
            <DownloadSelected onClick={this.downloadNow}>
                {`Download now${selectedDetails ? ` for ${selectedDetails.platform}` : ''}`}
            </DownloadSelected>
            <DownloadOptionsButton onClick={this.toggleDropdown}>
                <FontAwesomeIcon icon={[
                    'fas',
                    dropdownOpen ? 'chevron-up' : 'chevron-down'
                ]} />
            </DownloadOptionsButton>
            <DownloadOptions
                dropdownOpen={dropdownOpen}
                hasSpaceAvailable={this.isDownloadOptionsSpaceAvailable()}
            >
                { _.map(DOWNLOAD_OPTIONS, (downloadDetails, downloadId) =>
                    <DownloadOption
                        key={downloadId}
                        to={`/view/thank-you/${downloadId}`}
                        selected={selectedId === downloadId}
                    >
                        <FontAwesomeIcon icon={['fab', downloadDetails.icon]} />
                        {downloadDetails.name}
                    </DownloadOption>
                ) }
            </DownloadOptions>
        </DownloadWidgetContainer>;
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

    downloadNow = () => {
        const { selectedId } = this.state;

        if (selectedId) {
            window.location.href = `/view/thank-you/${selectedId}`;
        } else {
            this.toggleDropdown();
        }
    }
}