const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const { createFilePath } = require('gatsby-source-filesystem');
const { siteMetadata } = require('./gatsby-config');

const LATEST_VERSION = siteMetadata.latestAppVersion;

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
    'win-exe': `v${LATEST_VERSION}/HttpToolkit-installer-${LATEST_VERSION}.exe`,
    'win-standalone': `v${LATEST_VERSION}/HttpToolkit-win-x64-${LATEST_VERSION}.zip`,
    'linux-deb': `v${LATEST_VERSION}/HttpToolkit-${LATEST_VERSION}.deb`,
    'linux-standalone': `v${LATEST_VERSION}/HttpToolkit-linux-x64-${LATEST_VERSION}.zip`,
    'osx-dmg': `v${LATEST_VERSION}/HttpToolkit-${LATEST_VERSION}.dmg`,
  }, (releasePath, downloadId) => {
      createPage({
        path: `/download/${downloadId}/`,
        component: downloadThankYou,
        context: { releasePath }
      });
  });

  // Create a 'download' page for the homebrew install command
  createPage({
    path: `/download/osx-homebrew/`,
    component: downloadThankYou,
    context: { downloadCommand: 'brew install --cask http-toolkit' }
  });

  // Create a 'download' page for the AUR install command
  createPage({
    path: `/download/linux-aur/`,
    component: downloadThankYou,
    context: { downloadCommand: 'yay -S httptoolkit' }
  });

  // Create a normal and a 'buy now' pricing page
  const pricingPage = path.resolve('./src/templates/pricing.jsx');
  createPage({ path: '/pricing/', component: pricingPage, context: {} });
  createPage({ path: '/get-pro/', component: pricingPage, context: {
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

exports.onCreatePage = async({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/will-it-cors(\/|$)/)) {
    page.matchPath = "/will-it-cors/*";
    createPage(page);
  }
}

exports.onPostBuild = () => {
  fs.writeFileSync(path.join(__dirname, 'public', 'latest-version'), LATEST_VERSION);
};
