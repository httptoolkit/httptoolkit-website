import sum from 'lodash/sum';

import { GITHUB_ORG } from '../constants/github';

export async function getGithubDownloadStats() {
  try {
    const releases = [];
    let pageIndex = 1;
    while (true) {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_ORG}/httptoolkit-desktop/releases?per_page=100&page=${pageIndex}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        },
      );
      if (!response.ok) {
        response.text().then(console.log); // Async print the body when we have it
        throw new Error(`Bad response for GitHub stats: ${response.status}`); // Kill the build
      }

      const releasesPage = await response.json();
      releases.push(...releasesPage);

      if (releasesPage.length < 100) break;
      else pageIndex += 1;
    }

    const totalDownloads = sum(
      releases.map((release: any) => sum(release.assets.map((asset: any) => asset.download_count))),
    );

    return totalDownloads;
  } catch (error) {
    console.error('An error occurred trying to fetch getGithubDownloadStats:', error);
    // fallback static data if dynamic fetch fails
    return 496000;
  }
}
