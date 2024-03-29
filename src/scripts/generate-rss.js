const { promises: fs } = require('fs');
var minify = require('html-minifier').minify;

const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');
const showdown = require('showdown');

const converter = new showdown.Converter();

function isMarkdown(str) {
  const markdowRegex = /\.(md|mdx)$/;
  return markdowRegex.test(str);
}

async function generate() {
  try {
    const feed = new RSS({
      title: 'HTTP Toolkit RSS Feed',
      site_url: 'https://httptoolkit.com',
      feed_url: 'https://httptoolkit.com/rss.xml',
    });

    const posts = await fs.readdir(path.join(__dirname, '..', 'content', 'posts'));

    await Promise.all(
      posts.map(async name => {
        if (!isMarkdown(name)) {
          return;
        }

        const content = await fs.readFile(path.join(__dirname, '..', 'content', 'posts', name));
        const frontmatter = matter(content);

        const html = converter
          .makeHtml(frontmatter.content)
          .replace(/src="\.\//g, ' src="https://httptoolkit.com/images/posts/http-toolkit-assets/');

        const finalHtml = minify(html, {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseInlineTagWhitespace: true,
          minifyJS: true,
          minifyCSS: true,
        });

        const postUrl = 'https://httptoolkit.com/blog/' + name.replace(/\.mdx?/, '');

        feed.item({
          title: frontmatter.data.title,
          url: postUrl,
          guid: postUrl,
          date: frontmatter.data.date,
          description: finalHtml,
          customElements: [{ 'content:encoded': html }],
        });
      }),
    );
    const dirPath = path.join(__dirname, '..', '..', 'public');
    const filePath = path.join(dirPath, 'rss.xml');
    await fs.writeFile(filePath, feed.xml({ indent: true }));
  } catch (error) {
    console.error('Error trying to generating the rss feed:', error);
  }
}

generate();
