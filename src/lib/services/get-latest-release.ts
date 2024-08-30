import { GITHUB_DESKTOP_REPO_NAME, GITHUB_ORG, GITHUB_DEFAULT_HEADERS } from '../constants/github';
import { siteMetadata } from '../site-metadata';

interface LatestReleaseReturnProps {
  latestReleaseVersion: string;
  latestReleaseDate: string | null;
}

let cachedLatestRelease: LatestReleaseReturnProps | null = null;

export const getLatestRelease = async (): Promise<LatestReleaseReturnProps> => {
  if (cachedLatestRelease) return cachedLatestRelease;

  try {
    const latestReleaseResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_DESKTOP_REPO_NAME}/releases/latest`,
      { headers: GITHUB_DEFAULT_HEADERS },
    );

    if (!latestReleaseResponse.ok) {
      throw new Error(`Got ${latestReleaseResponse.status} response looking up latest release`);
    }

    const latestRelease = await latestReleaseResponse.json();

    const lastReleaseTagName = latestRelease.tag_name;
    const publishedAt = latestRelease.published_at;

    return (cachedLatestRelease = {
      latestReleaseVersion: lastReleaseTagName.replace('v', ''),
      latestReleaseDate: publishedAt,
    });
  } catch (error) {
    console.error('An error occurred trying to fetch getLatestRelease:', error);
    // fallback static data if dynamic fetch fails
    return {
      latestReleaseVersion: siteMetadata.latestAppVersion,
      latestReleaseDate: siteMetadata.latestSiteUpdate,
    };
  }
};
