const path = require('path');

module.exports = {
  siteMetadata: {
    name: 'HTTP Toolkit',
    title: 'Intercept, debug & build with HTTP',
    description: 'Beautiful, cross-platform & open-source tools for debugging, testing and building with HTTP(S), on Windows, Linux & Mac.',
    siteUrl: 'https://httptoolkit.tech/',
    blogUrl: 'https://httptoolkit.tech/blog/',
    latestAppVersion: '1.4.1'
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
                  .replace(/ href="\/static/g, ' href="https://httptoolkit.tech/static')
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
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-117670723-1',
        head: false,
        anonymize: true,
        respectDNT: true
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://httptoolkit.tech',
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
        ]
      }
    },
    'gatsby-plugin-force-trailing-slashes',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://httptoolkit.tech',
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
    },
    {
      resolve: `gatsby-source-twitter`,
      options: {
        credentials: {
          consumer_key: process.env.TWITTER_CONSUMER_KEY,
          consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
          bearer_token: process.env.TWITTER_BEARER_TOKEN,
        },
        queries: {
          testimonials: {
            endpoint: "statuses/lookup",
            params: {
              id: [
                "1293520327591333890",
                "1223946088324968448",
                "1226889803582537728",
                "1233552355339071488",
                "1252611268806148102",
                "1265816960685793280",
                "1227981703496511489",
                "1302164558736322560",
                "1277965200457478145",
                "1222894618594795520",
                "1176163277925228545",
                "1233552355339071488",
                "1358065384524496896",
                "1356353324694515718",
                "1337144156397953024",
                "1329019171800223744",
                "1381489773223665669",
                "1381703719687835648",
                "1385676109073764353",
                "1275874663705522178"

              ].join(','),
              tweet_mode: 'extended' // do not truncate
            }
          }
        }
      }
    }
  ]
}
