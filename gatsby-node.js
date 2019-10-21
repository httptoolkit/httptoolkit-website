const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const { createFilePath } = require('gatsby-source-filesystem');

const LATEST_VERSION = '0.1.16';

// Include Monaco:
exports.onPostBootstrap = function (pages) {
    return fs.copy('./node_modules/monaco-editor/min/vs', './public/vs');
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          // Exclude auth0 from the server-side build, as it uses Window
          { test: /auth0-js/, use: loaders.null(), },
        ],
      },
    })
  }
}

const blogPostsFolder = path.join(__dirname, 'src', 'posts')
const docsFolder = path.join(__dirname, 'src', 'docs')

// Set up the blog:
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const nodePath = node.fileAbsolutePath;
    const nodeType = nodePath.startsWith(blogPostsFolder)
        ? 'blog-post'
      : nodePath.startsWith(docsFolder)
        ? 'docs'
      : false;
    if (!nodeType) throw new Error(`Unexpected markdown: ${nodePath}`);

    createNodeField({ node, name: 'type', value: nodeType });

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
  const downloadThankYou = path.resolve('./src/templates/download-thank-you.jsx');
  _.forEach({
    'win-exe': `v${LATEST_VERSION}/HTTP.Toolkit-${LATEST_VERSION}.Setup.exe`,
    'win-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-win32-x64-${LATEST_VERSION}.zip`,
    'linux-deb': `v${LATEST_VERSION}/httptoolkit_${LATEST_VERSION}_amd64.deb`,
    'linux-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-linux-x64-${LATEST_VERSION}.zip`,
    'osx-dmg': `v${LATEST_VERSION}/HTTP.Toolkit.dmg`,
    'osx-standalone': `v${LATEST_VERSION}/HTTP.Toolkit-darwin-x64-${LATEST_VERSION}.zip`
  }, (releasePath, downloadId) => {
      createPage({
        path: `/download/${downloadId}`,
        component: downloadThankYou,
        context: { releasePath }
      });
      // Create a /view/thank-you page for each too, for historical reasons
      createPage({
        path: `/view/thank-you/${downloadId}`,
        component: downloadThankYou,
        context: { releasePath }
      });
  });

  // Create a 'download' page for the homebrew install command
  createPage({
    path: `/download/osx-homebrew`,
    component: downloadThankYou,
    context: { downloadCommand: 'brew cask install http-toolkit' }
  });

  // Create a 'download' page for the AUR install command
  createPage({
    path: `/download/linux-aur`,
    component: downloadThankYou,
    context: { downloadCommand: 'yay -S httptoolkit' }
  });

  // The same, for /view (purely for historical reasons):
  createPage({
    path: `/view/thank-you/osx-homebrew`,
    component: downloadThankYou,
    context: { downloadCommand: 'brew cask install http-toolkit' }
  });

  // Create a 'download' page for the AUR install command
  createPage({
    path: `/view/thank-you/linux-aur`,
    component: downloadThankYou,
    context: { downloadCommand: 'yay -S httptoolkit' }
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
                type
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.fields.type === 'blog-post') {
          createPage({
            path: `/blog/${node.fields.slug}`,
            component: path.resolve(`./src/templates/post.jsx`),
            context: {
              slug: node.fields.slug,
            },
          })
        } else if (node.fields.type === 'docs') {
          createPage({
            path: `/docs/${node.fields.slug}`,
            component: path.resolve(`./src/templates/doc.jsx`),
            context: {
              slug: node.fields.slug,
            },
          })
        }
      })
      resolve()
    });
  });
};
