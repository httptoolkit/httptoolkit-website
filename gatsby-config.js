const path = require('path');

module.exports = {
  siteMetadata: {
    name: 'HTTP Toolkit',
    title: 'Intercept, debug & build with HTTP',
    description: 'Beautiful, cross-platform & open-source tools for debugging, testing and building with HTTP(S), on Windows, Linux & Mac.',
    siteUrl: 'https://httptoolkit.com/',
    blogUrl: 'https://httptoolkit.com/blog/',
    latestAppVersion: '1.15.0',
    latestSiteUpdate: new Date().toISOString() // I.e. the date of the latest site build
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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/docs`,
        name: 'docs'
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
              quality: 90,
              maxHeight: 600,
              fit: `inside`,
              backgroundColor: 'transparent',
              disableBgImageOnAlpha: true
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 80
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {}
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {}
          },
        ],
      },
    },
    'gatsby-plugin-catch-links', // Convert Remark relative links to <Link>
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
                  .replace(/ src="\/static/g, ' src="https://httptoolkit.com/static')
                  .replace(/ href="\/static/g, ' href="https://httptoolkit.com/static')
                  .replace(/ class="gatsby-resp-image-background-image"\s+style="[^"]+"/g, '');

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
                  filter: {
                    frontmatter: { draft: { ne: true } },
                    fields: { type: { eq: "blog-post" } }
                  }
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
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://httptoolkit.com',
        sitemap: 'https://httptoolkit.com/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [
          '/download/*', // Drop direct download pages
          '/blog-thank-you/', // Drop post-blog subscribe thank you
          '/sent-to-computer/', // Drop post-send-to-computer page
          '/thank-you/', // Drop post-mailing-list signup page
          '/web-purchase-thank-you/',
          '/app-purchase-thank-you/',
        ]
      }
    },
    'gatsby-plugin-force-trailing-slashes',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://httptoolkit.com',
        stripQueryString: true
      },
    },
    {
      // Used primarily to inject the docsearch script, not to configure the input
      // itself. That's done by the standalone Docsearch component.
      resolve: `gatsby-plugin-algolia-docsearch`,
      options: {
        apiKey: "f5b49b1ad3229d305c66fc594c1133a3",
        indexName: "httptoolkit",
        inputSelector: ".docsearch-input"
      }
    }
  ]
}
