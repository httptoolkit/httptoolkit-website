import { octokit } from './github-client';
import { GITHUB_DESKTOP_REPO_NAME, GITHUB_ORG } from '../constants/github';

export const getLatestRelease = async () => {
  try {
    const { data } = await octokit.rest.repos.getLatestRelease({ owner: GITHUB_ORG, repo: GITHUB_DESKTOP_REPO_NAME });
    return data.tag_name.replace('v', '');
  } catch (error) {
    return 'error';
  }
};
