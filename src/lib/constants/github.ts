export const GITHUB_ORG = 'httptoolkit';
export const GITHUB_ORIGINAL_MAINTAINER = 'pimterry';
export const GITHUB_DESKTOP_REPO_NAME = 'httptoolkit-desktop';
export const GITHUB_DEFAULT_HEADERS = process.env.GITHUB_TOKEN
  ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
  : undefined;
