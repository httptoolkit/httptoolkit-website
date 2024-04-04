/** @type {import('next-sitemap').IConfig} */
module.exports = {
  //TODO(before-release): change to prod domain
  siteUrl: 'https://httptoolkit-website.pages.dev',
  generateRobotsTxt: true,
  exclude: [
    '/download/*', // Drop direct download pages
    '/blog-thank-you/', // Drop post-blog subscribe thank you
    '/sent-to-computer/', // Drop post-send-to-computer page
    '/thank-you/', // Drop post-mailing-list signup page
    '/web-purchase-thank-you/',
    '/app-purchase-thank-you/',
    '/will-it-cors/*', // Drop will-it-cors step pages
  ],
};
