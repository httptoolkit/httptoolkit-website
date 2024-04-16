import { GITHUB_DEFAULT_HEADERS, GITHUB_ORG } from '../constants/github';

export async function getOrganizationStars() {
  try {
    let starsCount = 0;
    let page = 1;
    const perPage = 100; // Maximum number of results per page

    // Fetch repositories from the organization page by page until all repositories are fetched
    while (true) {
      const response = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?page=${page}&per_page=${perPage}`, {
        headers: GITHUB_DEFAULT_HEADERS,
      });

      if (!response.ok) {
        throw new Error(`Error fetching repositories: ${response.status} - ${response.statusText}`);
      }

      const repositories = await response.json();

      // If no more repositories, break the loop
      if (repositories.length === 0) {
        break;
      }

      // Accumulate stars count from each repository
      for (const repo of repositories) {
        starsCount += repo.stargazers_count;
      }

      page++; // Move to the next page
    }

    return starsCount;
  } catch (error: unknown) {
    if (error instanceof Error) console.error('Error:', error.message);
    return 0;
  }
}
