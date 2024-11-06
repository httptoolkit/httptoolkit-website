import 'server-only';

import { getLatestRelease } from '@/lib/services/get-latest-release';

export type DownloadDictionary = {
  os: string;
  slug: string;
  href: string;
  text: string;
  defaultText?: string;
  releasePath?: string;
  downloadCommand?: string;
};

export const getDownloadOptionsDictionary = async (): Promise<DownloadDictionary[]> => {
  const { latestReleaseVersion } = await getLatestRelease();

  return [
    {
      os: 'mac',
      slug: 'osx-dmg',
      href: '/download/osx-dmg',
      text: 'MacOS DMG',
      defaultText: 'macOS',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}.dmg`,
    },
    {
      os: 'mac',
      slug: 'osx-homebrew',
      href: '/download/osx-homebrew',
      text: 'MacOS via Homebrew',
      downloadCommand: 'brew install --cask http-toolkit',
    },
    {
      os: 'windows',
      slug: 'win-exe',
      href: '/download/win-exe',
      text: 'Windows Installer',
      defaultText: 'Windows',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-installer-${latestReleaseVersion}.exe`,
    },
    {
      os: 'windows',
      slug: 'win-winget',
      href: '/download/win-winget',
      text: 'Windows via Winget',
      downloadCommand: 'winget install httptoolkit',
    },
    {
      os: 'windows',
      slug: 'win-standalone',
      href: '/download/win-standalone',
      text: 'Windows Zip',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-win-x64-${latestReleaseVersion}.zip`,
    },
    {
      os: 'linux',
      slug: 'linux-deb',
      href: '/download/linux-deb',
      text: 'Linux DEB Package',
      defaultText: 'Linux',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}.deb`,
    },
    {
      os: 'linux',
      slug: 'linux-rpm',
      href: '/download/linux-rpm',
      text: 'Linux RPM Package',
      defaultText: 'Linux',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}.rpm`,
    },
    {
      os: 'linux',
      slug: 'linux-aur',
      href: '/download/linux-aur',
      text: 'Linux Arch Package',
      downloadCommand: 'yay -S httptoolkit',
    },
    {
      os: 'linux',
      slug: 'linux-appimage',
      href: '/download/linux-appimage',
      text: 'Linux AppImage',
      defaultText: 'Linux',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}.AppImage`,
    },
    {
      os: 'linux',
      slug: 'linux-standalone',
      href: '/download/linux-standalone',
      text: 'Linux Zip',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-linux-x64-${latestReleaseVersion}.zip`,
    },
  ];
};
