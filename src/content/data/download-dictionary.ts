import 'server-only';

import { getLatestRelease } from '@/lib/services/get-latest-release';

export type DownloadDictionary = {
  os: string;
  slug: string;
  href: string;
  text: string;
  subtext?: string;
  defaultText?: string;
  releasePath?: string;
  downloadCommand?: string;
};

export const getDownloadOptionsDictionary = async (): Promise<DownloadDictionary[]> => {
  const { latestReleaseVersion } = await getLatestRelease();

  return [
    {
      os: 'mac',
      slug: 'osx-dmg-arm64',
      href: '/download/osx-dmg-arm64',
      text: 'MacOS DMG',
      defaultText: 'macOS',
      subtext: 'Apple Silicon',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}-arm64.dmg`,
    },
    {
      os: 'mac',
      slug: 'osx-dmg',
      href: '/download/osx-dmg',
      text: 'MacOS DMG',
      subtext: 'Intel',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}-x64.dmg`,
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
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}.exe`,
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
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}-win-x64.zip`,
    },
    {
      os: 'linux',
      slug: 'linux-deb',
      href: '/download/linux-deb',
      text: 'Linux DEB Package',
      defaultText: 'Linux',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}-x64.deb`,
    },
    {
      os: 'linux',
      slug: 'linux-rpm',
      href: '/download/linux-rpm',
      text: 'Linux RPM Package',
      defaultText: 'Linux',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}-x64.rpm`,
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
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}-x64.AppImage`,
    },
    {
      os: 'linux',
      slug: 'linux-standalone',
      href: '/download/linux-standalone',
      text: 'Linux Zip',
      subtext: 'x64',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}-linux-x64.zip`,
    },
    {
      os: 'linux',
      slug: 'linux-standalone-arm64',
      href: '/download/linux-standalone-arm64',
      text: 'Linux Zip',
      subtext: 'arm64',
      releasePath: `v${latestReleaseVersion}/HttpToolkit-${latestReleaseVersion}-linux-arm64.zip`,
    },
  ];
};
