import type { Metadata } from 'next/types';

import { RocketLaunch, SealCheck, Wrench, AndroidLogo, MagnifyingGlass } from '@/components/elements/icon';
import { IntegrationBento } from '@/components/sections/integration/single-page/bento';
import { IntegrationSinglePageHero } from '@/components/sections/integration/single-page/hero';
import { buildMetadata } from '@/lib/utils/build-metadata';
import { PhoneAppVideoPair } from '@/components/modules/phone-app-video-pair';

export const metadata: Metadata = buildMetadata({
  title: 'Intercept, mock & debug Android HTTP traffic',
  description:
    'HTTP Toolkit includes built-in automatic setup and advanced support for Android, so you can debug and modify any HTTP(S) traffic in seconds.',
});

export default function AndroidIntegrationPage() {
  return (
    <>
      <IntegrationSinglePageHero
        title="Intercept, view & edit Android HTTP traffic"
        text="HTTP Toolkit includes built-in automatic setup and advanced support for Android, so you can debug and modify any HTTP(S) traffic in seconds."
        icon={AndroidLogo}
        breadcrumbText="android"
      />
      <PhoneAppVideoPair
        videoId='android'
      />
      <IntegrationBento
        title="HTTP Toolkit is an open-source tool for debugging, testing and building with HTTP on Windows, Linux & Mac."
        subtitle="what is http toolkit?"
        cards={[
          {
            $variant: 'default',
            title: 'Get started instantly',
            text: 'No messing around with certificate files and wifi settings.\n\nClick the button, accept permissions, start capturing traffic, toggle off & on again in one tap.\n\nGet straight to the data with zero hassle.',
            icon: RocketLaunch,
          },
          {
            $variant: 'default',
            title: "Flexible setup for every environment",
            text: 'Setup automatically using ADB or by scanning a QR code.\n\nIntercept the entire device, or target just a single app.\n\nSupports Android versions from Android Lollipop (v5 / API level 21+) through to the latest releases.',
            icon: Wrench,
          },
          {
            $variant: 'default',
            title: 'Capture & inspect encrypted HTTPS',
            text: 'Immediately view HTTPS on any device for apps that trust user-installed certificates, like Chrome, or your own app with a tiny manifest change.\n\nOn emulators & rooted devices, easily intercept HTTPS from any app, with automatic injection of a system certificate authority and automatic certificate unpinning powered by built-in Frida integration.',
            icon: SealCheck,
          },
          {
            $variant: 'default',
            title: 'See all your Android HTTP',
            text: 'Powered by Android\'s VPN APIs and built-in Frida support, HTTP Toolkit intercepts everything, even HTTP traffic from apps that try to ignore your system proxy settings.',
            icon: MagnifyingGlass,
          },
          {
            $variant: 'highlighted',
            title: 'Want the full details?',
            text: 'Take a look at the in-depth guide to Android HTTP debugging.',
            buttonText: 'Learn more',
            buttonHref: '/docs/guides/android/',
          },
        ]}
      />
    </>
  );
}
