// import { GITHUB_ORG, GITHUB_ORIGINAL_MAINTAINER } from '../constants/github';

// const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : undefined;

export const getOpenSourceContributors = async () => {
  try {
    // const repos = [];
    // let repoPageIndex = 1;
    // while (true) {
    //   const orgReposResponse = await fetch(
    //     `https://api.github.com/orgs/${GITHUB_ORG}/repos?type=sources&per_page=100&page=${repoPageIndex}`,
    //     { headers },
    //   );
    //   if (!orgReposResponse.ok) {
    //     throw new Error(`Got ${orgReposResponse.status} response looking up org repos`);
    //   }

    //   const orgReposPage = await orgReposResponse.json();
    //   repos.push(...orgReposPage);

    //   if (orgReposPage.length < 100) break;
    //   else repoPageIndex += 1;
    // }

    // const contributors = await Promise.all(
    //   repos.map(async repo => {
    //     const repoContributors = [];
    //     let contributorPageIndex = 1;

    //     while (true) {
    //       const repoResponse = await fetch(
    //         `https://api.github.com/repos/${repo.full_name}/contributors?per_page=100&page=${contributorPageIndex}`,
    //         {
    //           headers,
    //         },
    //       );
    //       if (!repoResponse.ok) {
    //         throw new Error(`Got ${repoResponse.status} response looking up ${repo.full_name} contributors`);
    //       }

    //       const contributorPage = await repoResponse.json();

    //       // Skip any repos where I'm not the first contributor - these are almost certainly unmarked forks
    //       // that shouldn't be counted. This does still include browser-launcher though... Hmm.
    //       if (contributorPageIndex === 1 && contributorPage[0].login !== GITHUB_ORIGINAL_MAINTAINER) break;

    //       repoContributors.push(...contributorPage);

    //       if (contributorPage.length < 100) break;
    //       else contributorPageIndex += 1;
    //     }

    //     return [
    //       repo.full_name,
    //       repoContributors
    //         .filter(contributor => contributor.type === 'User' && contributor.login !== 'greenkeeperio-bot')
    //         .map(contributor => contributor.login),
    //     ];
    //   }),
    // );

    // const uniqueContributors = [...new Set<unknown>(contributors.map(([, contributors]) => contributors).flat())];

    // return uniqueContributors.length;
    return 96;
  } catch (error) {
    console.error('An error occurred trying to fetch getOpenSourceContributors:', error);
    // fallback static data if dynamic fetch fails
    return 96;
  }
};
