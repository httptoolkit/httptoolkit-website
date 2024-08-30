export const siteMetadata = {
  name: 'HTTP Toolkit',
  title: 'Intercept, debug & build with HTTP',
  description:
    'Beautiful, cross-platform & open-source tools for debugging, testing and building with HTTP(S), on Windows, Linux & Mac.',
  siteUrl: 'https://httptoolkit.com',
  blogUrl: 'https://httptoolkit.com/blog',

  latestAppVersion: '1.19.0',
  latestSiteUpdate: new Date().toISOString(), // I.e. the date of the latest site build

  // Fallback static stats in case we hit the github api limits (only used in dev)
  totalContributors: 149,
  totalDownloads: 598515,
  totalStarsCount: 8000,
};
