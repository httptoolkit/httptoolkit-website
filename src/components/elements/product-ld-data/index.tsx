import React from 'react';

import { testimonialsCount } from '@/content/data/testimonials';
import { getLatestRelease } from '@/lib/services/get-latest-release';

export const ProductLdData = async () => {
  const { latestReleaseDate, latestReleaseVersion } = await getLatestRelease();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication', 'MobileApplication'],
    image: 'https://httptoolkit.com/logo-square.png',
    screenshot: 'https://httptoolkit.com/screenshot.png',
    dateModified: latestReleaseDate ? new Date(latestReleaseDate) : '',
    video: {
      '@type': 'VideoObject',
      name: 'HTTP Toolkit',
      description: 'A short demo of HTTP Toolkit in action',
      contentUrl: 'https://httptoolkit.com/http-mock-demo.mp4',
      thumbnailUrl: 'https://httptoolkit.com/http-mock-demo-thumbnail.png',
      uploadDate: '2019-09-25T00:00:00Z',
    },
    name: 'HTTP Toolkit',
    description: 'Beautiful & open-source tools to debug, test and develop with HTTP(S)',
    softwareVersion: latestReleaseVersion,
    operatingSystem: ['Windows', 'Mac', 'Linux', 'Android'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: testimonialsCount, // Updated automatically as new testimonials are added
    },
    url: 'https://httptoolkit.com/',
    downloadUrl: [
      'https://httptoolkit.com/download/win-exe/',
      'https://httptoolkit.com/download/win-standalone/',
      'https://httptoolkit.com/download/win-winget/',
      'https://httptoolkit.com/download/linux-deb/',
      'https://httptoolkit.com/download/linux-standalone/',
      'https://httptoolkit.com/download/linux-aur/',
      'https://httptoolkit.com/download/osx-dmg/',
      'https://httptoolkit.com/download/osx-homebrew/',
    ],
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />;
};
