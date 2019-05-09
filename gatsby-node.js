const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const { createFilePath } = require('gatsby-source-filesystem');

const LATEST_VERSION = '0.1.6';

const releasePathMap = {
    'win-exe': `v${LATEST_VERSION}/HTTP.Toolkit-${LATEST_VERSION}.Setup.exe`,
    'win-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-win32-x64-${LATEST_VERSION}.zip`,
    'linux-deb': `v${LATEST_VERSION}/httptoolkit_${LATEST_VERSION}_amd64.deb`,
    'linux-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-linux-x64-${LATEST_VERSION}.zip`,
    'osx-dmg': `v${LATEST_VERSION}/HTTP.Toolkit.dmg`,
    'osx-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-darwin-x64-${LATEST_VERSION}.zip`
}

// Include Monaco:
exports.onPostBootstrap = function (pages) {
    return fs.copy('./node_modules/monaco-editor/min/vs', './public/vs');
};

// Set up the blog:
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: 'post' });
    createNodeField({
      node,
      name: 'slug',
      value: slug.replace(/^\//, ''),
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create a download page for each available download
  const viewThankYou = path.resolve('./src/templates/view-thank-you.jsx');
  _.forEach(releasePathMap, (releasePath, downloadId) => {
      createPage({
          path: `/view/thank-you/${downloadId}`,
          component: viewThankYou,
          context: { releasePath }
      });
  });

  // Create a normal and a 'buy now' pricing page
  const pricingPage = path.resolve('./src/templates/pricing.jsx');
  createPage({ path: '/pricing', component: pricingPage, context: {} });
  createPage({ path: '/get-pro', component: pricingPage, context: {
      directPurchase: true,
  }});

  // Create a page for each blog post
  return new Promise((resolve) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: `/blog/${node.fields.slug}`,
          component: path.resolve(`./src/templates/post.jsx`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    });
  });
};
