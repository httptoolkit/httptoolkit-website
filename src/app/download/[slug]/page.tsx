import { SelfDownload } from './self-download';
import {
  StyledDownloadSection,
  StyledColumnContent,
  StyledDownloadaColumns,
  StyledGradientBottom,
  StyledGradientMobile,
  StyledImageWrapper,
} from '../download.styles';

import { Container } from '@/components/elements/container';
import { Copy } from '@/components/elements/copy';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemedImage } from '@/components/elements/themed-image';
import { LandingLayout } from '@/components/layout/landing-layout';
import { ContentCard } from '@/components/modules/content-card';
import { NEWSLETTER_URLS } from '@/components/modules/newsletter/newsletter.values';
import { OSDictionary } from '@/lib/constants/download-dictionary';

export async function generateStaticParams() {
  return OSDictionary.map(software => ({
    slug: software.slug,
  }));
}

type DownloadPageProps = {
  params: { slug: string };
};

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { slug } = params;
  const downloadData = OSDictionary.find(item => item.slug === slug);
  const hasDownloadCommand = typeof downloadData?.downloadCommand === 'string';

  return (
    <LandingLayout>
      {downloadData?.releasePath && <SelfDownload releasePath={downloadData.releasePath} />}
      <StyledGradientMobile>
        <Gradient />
      </StyledGradientMobile>
      <StyledDownloadSection>
        <Container>
          <StyledDownloadaColumns>
            <StyledColumnContent>
              <Heading fontSize="l" color="textGradient">
                {hasDownloadCommand ? 'Get started with HTTP Toolkit' : 'HTTP Toolkit is now downloading...'}
              </Heading>
              {hasDownloadCommand ? (
                <Stack>
                  <Copy text={downloadData.downloadCommand} />
                  <Text fontSize="l" fontWeight="medium" color="white">
                    Copy & run the above to install HTTP Toolkit.
                  </Text>
                </Stack>
              ) : (
                <Text fontSize="l" fontWeight="medium">
                  Didn&apos;t work?{' '}
                  <Link
                    target="_self"
                    href={`https://github.com/httptoolkit/httptoolkit-desktop/releases/download/${downloadData?.releasePath}`}
                  >
                    <Text fontSize="l" as="span" color="cinnarbarRed" fontWeight="medium">
                      Click here
                    </Text>
                  </Link>
                </Text>
              )}

              <Stack $gapxl="8px">
                <Text fontSize="m">
                  There&apos;s a lot of new HTTP Toolkit features coming soon, like automated iOS interception, HTTP
                  client tools, gRPC & GraphQL support, and request diffing.
                </Text>
              </Stack>
              <ContentCard
                title="Join the mailing list now, so you don't miss new features & releases:"
                $isNewsletter
                action={NEWSLETTER_URLS.download}
              />
            </StyledColumnContent>
            <StyledImageWrapper>
              <ThemedImage
                withBorder
                alt="Get started with HTTP Toolkit"
                darkSrc="/images/hero-placeholder-dark.webp"
                lightSrc="/images/hero-placeholder-light.webp"
                loading="eager"
              />
            </StyledImageWrapper>
          </StyledDownloadaColumns>
        </Container>
      </StyledDownloadSection>
      <StyledGradientBottom />
    </LandingLayout>
  );
}
