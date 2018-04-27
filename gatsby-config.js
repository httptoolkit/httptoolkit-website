module.exports = {
  siteMetadata: {
    title: 'HTTP Toolkit | Intercept, debug & send HTTP',
    description: 'Beautiful, open-source & cross-platform HTTP tools to intercept, debug & send HTTP'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-117670723-1",
        head: false,
        anonymize: true,
        respectDNT: true
      },
    },
  ]
}
