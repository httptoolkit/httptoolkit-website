const LATEST_VERSION_PLACEHOLDER = '1.14.9';

export const parseReleasePath = (path: string, LATEST_VERSION: string) => path.replace('{}', LATEST_VERSION);

export const OSDictionary = [
  {
    os: 'mac',
    slug: 'mac-dgm',
    href: '/download/mac-dgm',
    text: 'MacOS DGM',
    defaultText: 'macOs',
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
    slug: 'windows-installer',
    href: '/download/windows-installer',
    text: 'Windows installer',
    defaultText: 'Windows',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-installer-${LATEST_VERSION_PLACEHOLDER}.exe`,
  },
  {
    os: 'windows',
    slug: 'windows-zip',
    href: '/download/windows-zip',
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
    slug: 'debian-package',
    href: '/download/debian-package',
    text: 'Linux Debian Package',
    defaultText: 'Linux',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-${LATEST_VERSION_PLACEHOLDER}.deb`,
  },
  {
    os: 'linux',
    slug: 'arch-package-aur',
    href: '/download/arch-package-aur',
    text: 'Linux Arch Package via Aur',
    downloadCommand: 'yay -S httptoolkit',
  },
  {
    os: 'linux',
    slug: 'standalone-zip',
    href: '/download/standalone-zip',
    text: 'Linux Standalone Zip',
    releasePath: `v${LATEST_VERSION_PLACEHOLDER}/HttpToolkit-linux-x64-${LATEST_VERSION_PLACEHOLDER}.zip`,
  },
];
