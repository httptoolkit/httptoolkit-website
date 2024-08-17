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
    const allReleasesResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_DESKTOP_REPO_NAME}/releases?per_page=1`,
      { headers: GITHUB_DEFAULT_HEADERS },
    );

    if (!allReleasesResponse.ok) {
      throw new Error(`Got ${allReleasesResponse.status} response looking up latest release`);
    }

    const latestRelease = await allReleasesResponse.json();

    const lastReleaseTagName = latestRelease[0]?.tag_name;
    const publishedAt = latestRelease[0]?.published_at;

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
