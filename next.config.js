// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withMDX(nextConfig);
