const path = require('path');

module.exports = {
  siteMetadata: {
    name: 'HTTP Toolkit',
    title: 'Intercept, debug & build with HTTP',
    description: 'Intercept, debug and build with HTTP. Beautiful, cross-platform & open-source HTTP(S) proxy, analyzer and client. Built-in support for Chrome, Android, Docker and more.',
    blogUrl: 'https://httptoolkit.tech/blog/'
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,
              quality: 90
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: name
                description
                blogUrl
                site_url: blogUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                // Hack to make image URLs absolute
                const html = edge.node.html
                  .replace(/ src="\/static/g, ' src="https://httptoolkit.tech/static')
                  .replace(/ href="\/static/g, ' href="https://httptoolkit.tech/static');

                return Object.assign({}, edge.node.frontmatter, {
                  description: html,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.blogUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.blogUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "HTTP Toolkit RSS Feed",
          },
        ]
      }
    },
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
        trackingId: 'UA-117670723-1',
        head: false,
        anonymize: true,
        respectDNT: true
      },
    },
  ]
}
