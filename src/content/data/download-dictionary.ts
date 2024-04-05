const LATEST_VERSION_PLACEHOLDER = '1.14.9';

export const parseReleasePath = (path: string, LATEST_VERSION: string) => path.replace('{}', LATEST_VERSION);

export const OSDictionary = [
  {
    os: 'mac',
    slug: 'osx-dmg',
    href: '/download/osx-dmg',
    text: 'MacOS DGM',
    defaultText: 'macOS',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-${LATEST_VERSION_PLACEHOLDER}.dmg`,
  },
  {
    os: 'mac',
    slug: 'mac-homebrew',
    href: '/download/mac-homebrew',
    text: 'MacOS via Homebrew',
    downloadCommand: 'brew install --cask http-toolkit',
  },
  {
    os: 'windows',
    slug: 'windows-exe',
    href: '/download/windows-exe',
    text: 'Windows installer',
    defaultText: 'Windows',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-installer-${LATEST_VERSION_PLACEHOLDER}.exe`,
  },
  {
    os: 'windows',
    slug: 'win-standalone',
    href: '/download/win-standalone',
    text: 'Windows Standalone Zip',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-win-x64-${LATEST_VERSION_PLACEHOLDER}.zip`,
  },
  {
    os: 'windows',
    slug: 'windows-winget',
    href: '/download/windows-winget',
    text: 'Windows via Winget',
    downloadCommand: 'winget install httptoolkit',
  },
  {
    os: 'linux',
    slug: 'linux-deb',
    href: '/download/linux-deb',
    text: 'Linux Debian Package',
    defaultText: 'Linux',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-${LATEST_VERSION_PLACEHOLDER}.deb`,
  },
  {
    os: 'linux',
    slug: 'linux-aur',
    href: '/download/linux-aur',
    text: 'Linux Arch Package via Aur',
    downloadCommand: 'yay -S httptoolkit',
  },
  {
    os: 'linux',
    slug: 'linux-standalone',
    href: '/download/linux-standalone',
    text: 'Linux Standalone Zip',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-linux-x64-${LATEST_VERSION_PLACEHOLDER}.zip`,
  },
];
