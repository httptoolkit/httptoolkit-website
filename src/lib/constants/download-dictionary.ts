const LATEST_VERSION_PLACEHOLDER = '{LATEST_VERSION}';

export const parseReleasePath = (path: string, LATEST_VERSION: string) => path.replace('{}', LATEST_VERSION);

export const OSDictionary = [
  {
    os: 'mac',
    href: '/download/mac-dgm',
    text: 'MacOS DGM',
    defaultText: 'macOs',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-${LATEST_VERSION_PLACEHOLDER}.dmg`,
  },
  {
    os: 'mac',
    href: '/download/mac-homebrew',
    text: 'MacOS via Homebrew',
    downloadCommand: 'brew install --cask http-toolkit',
  },
  {
    os: 'windows',
    href: '/download/windows-installer',
    text: 'Windows installer',
    defaultText: 'Windows',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-installer-${LATEST_VERSION_PLACEHOLDER}.exe`,
  },
  {
    os: 'windows',
    href: '/download/windows-zip',
    text: 'Windows Standalone Zip',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-win-x64-${LATEST_VERSION_PLACEHOLDER}.zip`,
  },
  {
    os: 'windows',
    href: '/download/windows-winget',
    text: 'Windows via Winget',
    downloadCommand: 'winget install httptoolkit',
  },
  {
    os: 'linux',
    href: '/download/debian-package',
    text: 'Linux Debian Package',
    defaultText: 'Linux',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-${LATEST_VERSION_PLACEHOLDER}.deb`,
  },
  {
    os: 'linux',
    href: '/download/arch-package-aur',
    text: 'Linux Arch Package via Aur',
    downloadCommand: 'yay -S httptoolkit',
  },
  {
    os: 'linux',
    href: '/download/standalone-zip',
    text: 'Linux Standalone Zip',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-linux-x64-${LATEST_VERSION_PLACEHOLDER}.zip`,
  },
];
