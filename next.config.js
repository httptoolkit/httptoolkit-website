const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  productionBrowserSourceMaps: true,
  images: {
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  transpilePackages: ['next-image-export-optimizer'],
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '80',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'http-toolkit-assets',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react', '@httptoolkit/accounts'],
  },
  compiler: {
    styledComponents: true,
  },
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
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

module.exports = withBundleAnalyzer(nextConfig);
