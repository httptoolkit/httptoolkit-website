const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
const fetch = require('node-fetch');
const { createFilePath } = require('gatsby-source-filesystem');

const { siteMetadata } = require('./gatsby-config');

const LATEST_VERSION = siteMetadata.latestAppVersion;

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

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions;

    await loadGithubDownloadStats(createNode, createContentDigest, createNodeId);
    await loadTwitterDummyData(createNode, createContentDigest, createNodeId);
}

async function loadGithubDownloadStats(createNode, createContentDigest, createNodeId) {
    const response = await fetch("https://api.github.com/repos/httptoolkit/httptoolkit-desktop/releases?per_page=100", {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    });

    if (!response.ok) {
        response.text().then(console.log); // Async print the body when we have it
        throw new Error(`Bad response for GitHub stats: ${response.status}`); // Kill the build
    }

    const releaseStats = await response.json();

    const totalDownloads = _.sum(releaseStats.map(release =>
        _.sum(release.assets.map((asset) =>
            asset.download_count
        )))
    );

    const data = { value: totalDownloads };

    createNode({
        ...data,
        id: createNodeId('gh-download-stats'),
        parent: null,
        children: [],
        internal: {
            type: "GhDownloadStat",
            content: JSON.stringify(data),
            contentDigest: createContentDigest(data)
        }
    });
};

function loadTwitterDummyData(createNode, createContentDigest, createNodeId) {
    if (
        process.env.TWITTER_CONSUMER_SECRET &&
        process.env.TWITTER_CONSUMER_KEY &&
        process.env.TWITTER_BEARER_TOKEN
    ) {
        // We have all the Twitter config, we're all good.
        return;
    } else if (process.env.NODE_ENV === 'production') {
        throw new Error("No Twitter secret configured for production build");
    } else {
        // In dev, we use placeholders if there's no Twitter key configured:
        console.log("\n** No Twitter secret configured, falling back to placeholder data **\n");

        _.range(10).forEach((i) => {
            const data = {
                id_str: `tweet-${i}`,
                full_text: "Placeholder tweet",
                entities: { urls: [{url:"QQ", display_url: "QQ"}] },
                user: { profile_image_url_https: "", name: "Placeholder" },
                extended_entities: { media: [{url: "QQ"}] }
            };

            createNode({
                ...data,
                id: createNodeId(`twitter-dummy-data-${i}`),
                parent: null,
                children: [],
                internal: {
                    type: "TwitterStatusesLookupTestimonials",
                    content: JSON.stringify(data),
                    contentDigest: createContentDigest(data)
                }
            });
        });
    }
}

const blogPostsFolder = path.join(__dirname, 'src', 'posts')
const docsFolder = path.join(__dirname, 'src', 'docs')

// Load the blog & docs markdown content:
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

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    // Create a download page for each available download
    await createDownloadPages(createPage);

    // Create a normal and a 'buy now' pricing page
    createPricingPages(createPage);

    // Create a page for each blog post
    await createMarkdownPages(graphql, createPage);
};

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions;
    if (page.path.match(/^\/will-it-cors(\/|$)/)) {
        page.matchPath = "/will-it-cors/*";
        createPage(page);
    }
}

exports.onPostBuild = () => {
    fs.writeFileSync(path.join(__dirname, 'public', 'latest-version'), LATEST_VERSION);
};

async function createDownloadPages(createPage) {
    const downloadThankYou = path.resolve('./src/templates/download-thank-you.jsx');
    await Promise.all(_.map({
        'win-exe': `v${LATEST_VERSION}/HttpToolkit-installer-${LATEST_VERSION}.exe`,
        'win-standalone': `v${LATEST_VERSION}/HttpToolkit-win-x64-${LATEST_VERSION}.zip`,
        'linux-deb': `v${LATEST_VERSION}/HttpToolkit-${LATEST_VERSION}.deb`,
        'linux-standalone': `v${LATEST_VERSION}/HttpToolkit-linux-x64-${LATEST_VERSION}.zip`,
        'osx-dmg': `v${LATEST_VERSION}/HttpToolkit-${LATEST_VERSION}.dmg`,
    }, async (releasePath, downloadId) => {
        // Validate that all download URLs are reachable
        const response = await fetch(
            `https://github.com/httptoolkit/httptoolkit-desktop/releases/download/${releasePath}`,
            { method: 'HEAD' }
        );
        if (response.status !== 200) {
            throw new Error(
                `Unexpected response for download ${downloadId}: ${response.status} ${response.statusText}`
            );
        }

        const targetName = ({
            'win-exe': 'Windows',
            'win-standalone': 'Windows (ZIP)',
            'linux-deb': 'Linux (Debian and Ubuntu)',
            'linux-standalone': 'Linux (ZIP)',
            'osx-dmg': 'Mac'
        })[downloadId];

        if (!targetName) throw new Error(`No download name for ${downloadId}`);

        // Create a page for this download:
        createPage({
            path: `/download/${downloadId}/`,
            component: downloadThankYou,
            context: { targetName, releasePath }
        });
    }));

    // Create a 'download' page for the homebrew install command
    createPage({
        path: `/download/osx-homebrew/`,
        component: downloadThankYou,
        context: {
            targetName: 'Mac with Homebrew',
            downloadCommand: 'brew install --cask http-toolkit'
        }
    });

    // Create a 'download' page for the AUR install command
    createPage({
        path: `/download/linux-aur/`,
        component: downloadThankYou,
        context: {
            targetname: 'Linux (Arch)',
            downloadCommand: 'yay -S httptoolkit'
        }
    });

    // Create a 'download' page for the winget install command
    createPage({
        path: `/download/win-winget/`,
        component: downloadThankYou,
        context: {
            targetName: 'Windows (with WinGet)',
            downloadCommand: 'winget install httptoolkit'
        }
    });

}

function createPricingPages(createPage) {
    const pricingPage = path.resolve('./src/templates/pricing.jsx');
    createPage({ path: '/pricing/', component: pricingPage, context: {} });
    createPage({
        path: '/get-pro/', component: pricingPage, context: {
            directPurchase: true,
        }
    });
}

async function createMarkdownPages(graphql, createPage) {
    const result = await graphql(`{
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
    }`);

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
    });
}