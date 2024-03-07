// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Images optimization API does not work with output export https://nextjs.org/docs/messages/export-image-api
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  compiler: {
    styledComponents: true,
  },
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack(config) {
    config.module?.rules?.push({
      // issuer: /\.[jt]sx?$/,
      test: /\.svg$/i,
      use: [
        {
          loader: '@svgr/webpack',
          // options: { icons: true },
        },
      ],
    });

    return config;
  },
};

module.exports = withMDX(nextConfig);
