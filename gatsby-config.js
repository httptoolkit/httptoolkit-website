const path = require('path');

module.exports = {
  siteMetadata: {
    name: 'HTTP Toolkit',
    title: 'Intercept, debug & build with HTTP',
    description: 'Intercept, debug and build with HTTP. Beautiful, cross-platform & open-source HTTP(S) proxy, analyzer and client. Built-in support for Chrome, Android, Docker and more.'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: "UA-117670723-1",
        head: false,
        anonymize: true,
        respectDNT: true
      },
    },
  ]
}
