import { octokit } from './github-client';
import { GITHUB_DESKTOP_REPO_NAME, GITHUB_ORG } from '../constants/github';
import { siteMetadata } from '../site-metadata';

interface LatestReleaseReturnProps {
  latestReleaseVersion: string;
  latestReleaseDate: string | null;
}

export const getLatestRelease = async (): Promise<LatestReleaseReturnProps> => {
  try {
    // Use listReleases becasue for some reason getLatestRelease method it returns
    // the second-to-last one instead of the last one.
    const { data: allReleases } = await octokit.rest.repos.listReleases({
      owner: GITHUB_ORG,
      repo: GITHUB_DESKTOP_REPO_NAME,
    });

    const lastReleaseTagName = allReleases[0]?.tag_name;
    const publishedAt = allReleases[0]?.published_at;

    return {
      latestReleaseVersion: lastReleaseTagName.replace('v', ''),
      latestReleaseDate: publishedAt,
    };
  } catch (error) {
    console.error('An error occurred trying to fetch getLatestRelease:', error);
    // fallback static data if dynamic fetch fails
    return {
      latestReleaseVersion: siteMetadata.latestAppVersion,
      latestReleaseDate: siteMetadata.latestSiteUpdate,
    };
  }
};
