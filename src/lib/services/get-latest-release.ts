import { octokit } from './github-client';
import { GITHUB_DESKTOP_REPO_NAME, GITHUB_ORG } from '../constants/github';
import { siteMetadata } from '../site-metadata';

interface LatestReleaseReturnProps {
  latestReleaseVersion: string;
  latestReleaseDate: string | null;
}

export const getLatestRelease = async (): Promise<LatestReleaseReturnProps> => {
  try {
    const { data } = await octokit.rest.repos.getLatestRelease({ owner: GITHUB_ORG, repo: GITHUB_DESKTOP_REPO_NAME });
    return {
      latestReleaseVersion: data.tag_name.replace('v', ''),
      latestReleaseDate: data.published_at,
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
