module.exports = {
  siteMetadata: {
    title: 'HTTP Toolkit | Intercept, debug & send HTTP requests',
    description: 'An open-source proxy tool suite to intercept, debug & send HTTP requests'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts'
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet'
  ]
}
