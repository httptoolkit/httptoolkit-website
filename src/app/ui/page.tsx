import { Badge } from '@/components/elements/badge';
import { Button } from '@/components/elements/button';
import { Container } from '@/components/elements/container';
import { Copy } from '@/components/elements/copy';
import { Heading } from '@/components/elements/heading';
import {
  Sparkle,
  Alien,
  Logo,
  CaretDown,
  RocketLaunch,
  AndroidLogo,
  CaretRight,
  SealCheck,
  LinkSimpleBreak,
  GithubLogo,
  CursorClick,
  ShieldCheck,
  ArrowsLeftRight,
  Gear,
} from '@/components/elements/icon';
import ShowCase from '@/components/elements/showcase';
import { SquareIcon } from '@/components/elements/square-icon';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import { ThemedImage } from '@/components/elements/themed-image';
import { Tooltip } from '@/components/elements/tooltip';
import { Layout } from '@/components/layout';
import { SimpleFooter } from '@/components/layout/footer/simple-footer';
import { BlockCode } from '@/components/modules/block-code';
import { BlogCard } from '@/components/modules/blog-card';
import { Card } from '@/components/modules/card';
import { ContentCard } from '@/components/modules/content-card';
import { CTABox } from '@/components/modules/cta-box';
import { DownloadButton } from '@/components/modules/download-button';
import { Dropdown } from '@/components/modules/dropdown';
import type { DropdownOptionProps } from '@/components/modules/dropdown/dropdown.types';
import { FluidCard } from '@/components/modules/fluid-card';
import { HeadingBlock } from '@/components/modules/heading-block';
import { Input } from '@/components/modules/input';
import { IntegrationCard } from '@/components/modules/integration-card';
import { NavigationSidebarLinks } from '@/components/modules/navigation-sidebar-links';
import { TableContent } from '@/components/modules/table-content';
import { CTA } from '@/components/sections/cta';
import { FeatureLine } from '@/components/sections/feature-line';
import { IntegrationSteps } from '@/components/sections/integration/single-page/steps';
import BlogPostImage from '@/content/posts/analytics-map.png';

export default async function UIPage() {
  const dropdownItems: DropdownOptionProps[] = [
    {
      content: 'Download for Android',
    },
    {
      content: 'Download for Linux',
      as: 'link',
      target: '_blank',
      href: 'https://www.google.com/',
    },
    {
      content: 'Download for Mac',
      as: 'link',
      href: '/blog',
      $variant: 'primary',
    },
  ];

  const commonSubItems = [
    {
      text: 'The Intercept Page',
      href: '#interceptor-page',
    },
    {
      text: 'Single Project',
      href: '#interceptor-page',
    },
    {
      text: 'Payments',
      href: '#interceptor-page',
    },
  ];
  const collapsibleTableContent = [
    {
      text: 'Getting Started',
      subItems: commonSubItems,
    },
    {
      text: 'Reference',
      subItems: commonSubItems,
    },
    {
      text: 'Guides',
      subItems: commonSubItems,
    },
    {
      text: 'CE Admin APIs',
      subItems: commonSubItems,
    },
    {
      text: 'FAQs',
      subItems: commonSubItems,
    },
  ];
  const nonCollapsibleTableContent = [
    {
      text: 'Terms Of Service',
      href: '#example-1',
    },
    {
      text: 'Terms Of Service (“Terms”)',
      href: '#example-2',
    },
    {
      text: 'What information do we collect?',
      href: '#example-3',
      subItems: [
        {
          text: 'Information automatically collected',
          href: '#example-5',
        },
      ],
    },
  ];

  const navigationContentSidebar = [
    {
      text: 'Payments processing',
      subitems: [
        {
          text: 'Standard checkout',
          href: '#example-1',
        },
        {
          text: 'Internet transfer',
          href: '#example-2',
        },
      ],
    },
    {
      text: 'How to pay?',
      href: '#example-3',
    },
    {
      text: 'Troubles with payment',
      subitems: [
        {
          text: 'How to find your money',
          href: '#example-4',
        },
        {
          text: 'My money has gone',
          href: '#example-5',
        },
      ],
    },
  ];

  const stepsData = [
    [
      'Open a terminal via HTTP Toolkit',
      'Run any command in that terminal to build or create a Docker container',
      'The build or container is automatically intercepted',
      "Instantly inspect, debug & rewrite all your container's HTTP(S) traffic",
    ],
    [
      'Launch a Docker container anywhere',
      "Click 'Attach to Docker' in HTTP Toolkit, and pick your container",
      'HTTP Toolkit recreates & restarts the container with interception injected',
      "Instantly inspect, debug & rewrite all your container's HTTP(S) traffic",
    ],
  ];
  const stepsData1 = [
    [
      'Open a terminal via HTTP Toolkit',
      'Run any Python script, tool or server from that terminal',
      "Instantly see, debug & rewrite all Python's HTTP traffic",
    ],
  ];

  return (
    <Layout>
      <CTA
        subHeading={{
          text: 'With one click',
          icon: CursorClick,
        }}
        heading="Intercept & view all your HTTP"
        image={{
          darkSrc: '/images/hero-placeholder-dark.webp',
          lightSrc: '/images/hero-placeholder-light.webp',
          withBorderAnimation: true,
          alt: 'Hero',
          loading: 'eager',
        }}
      />
      <Container>
        <ShowCase title="Heading">
          <Heading color="textGradient">XL Text Gradient</Heading>
          <Heading color="cinnarbarRed">What is HTTP Toolkit? - XL</Heading>
          <Heading as="h2" fontSize="l">
            What is HTTP Toolkit? - L
          </Heading>
          <Heading as="h3" fontSize="m">
            What is HTTP Toolkit? - M
          </Heading>
          <Heading as="h4" fontSize="s">
            What is HTTP Toolkit? - S
          </Heading>
          <Heading as="h4" fontSize="s" fontWeight="medium">
            What is HTTP Toolkit? - S Medium
          </Heading>
          <Heading as="h5" fontSize="xs">
            What is HTTP Toolkit? - XS
          </Heading>
          <Heading as="h5" fontSize="xs" fontWeight="medium">
            What is HTTP Toolkit? - XS Medium
          </Heading>
        </ShowCase>
        <ShowCase title="Text">
          <Text fontSize="xl">
            XL Regular: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject
            errors.
          </Text>
          <Text fontSize="xl" fontWeight="medium">
            XL Medium: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject
            errors.
          </Text>
          <Text fontSize="l">
            L Regular: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject
            errors
          </Text>
          <Text fontSize="l" fontWeight="medium">
            L Medium: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject
            errors
          </Text>
          <Text fontSize="l" fontWeight="semibold">
            L Semibold: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject
            errors
          </Text>
          <Text fontSize="m">
            M: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors
          </Text>
          <Text fontSize="s">
            S: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject errors
          </Text>
          <Text fontSize="s" fontWeight="medium">
            S Medium: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject
            errors
          </Text>
          <Text fontSize="s" fontWeight="semibold">
            S Semibold: Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or inject
            errors
          </Text>
          <Text as="label" fontSize="xll" fontWeight="bold">
            Label XL
          </Text>
          <Text as="label" fontSize="m" fontWeight="bold">
            Label L
          </Text>
          <Text as="label" fontSize="s" fontWeight="bold">
            Label M
          </Text>
        </ShowCase>
        {/* <ShowCase title="Hero">
          <Hero
            heading="Looking for a Fiddler alternative?"
            excerpt="HTTP Toolkit is a modern powerful alternative to Fiddler designed from the ground up for instant targeted debugging and control of any HTTP(S) traffic."
          />
          <Hero
            icon={Logo}
            heading="Try it for yourself"
            excerpt="It is completely free! You can also Go Pro and explore the Http Toolkit with additional features."
            cta={{
              title: 'Go Prop!',
              icon: RocketLaunch,
              href: '/pro',
            }}
          />
        </ShowCase> */}
        <ShowCase title="Badge">
          <Badge icon={Sparkle}>Intercept</Badge>
          <Badge icon={Sparkle} variant="secondary" additionalText="Edit">
            Pro Feature
          </Badge>
        </ShowCase>
        <ShowCase title="Icon">
          48x48
          <SquareIcon icon={Alien} $size="small" />
          56x56
          <SquareIcon icon={Alien} />
          <SquareIcon icon={Logo} $variant="secondary" />
          64x64
          <SquareIcon icon={Alien} $size="large" />
          72x72
          <SquareIcon icon={Alien} $size="xLarge" $variant="tertiary" />
        </ShowCase>
        <ShowCase title="Button Primary">
          <Button as="button" $withBorder icon={CaretDown}>
            Download for macOs
          </Button>
          <Button icon={CaretDown} as="link" href="/blog">
            Download for macOs
          </Button>
        </ShowCase>
        <ShowCase title="Button Secondary">
          <Button icon={RocketLaunch} $variant="secondary">
            Go Pro!
          </Button>
          <Button icon={RocketLaunch} $small $variant="secondary">
            Go Pro!
          </Button>
        </ShowCase>
        <ShowCase title="Dropdown">
          <Dropdown $small items={dropdownItems} aria-label="Download Items">
            Download for macOS
          </Dropdown>
          <Dropdown $variant="primary" $withBorder items={dropdownItems} aria-label="Download Items">
            Download for macOS
          </Dropdown>
        </ShowCase>
        <ShowCase title="Input">
          <Input id="email" placeholder="Email address" />
          <Input id="search" placeholder="Search" type="search" />
          <Input id="text-area" as="textarea" placeholder="Email address" />
          <Input id="email-with-error" $hasError placeholder="Email address" errorMessage="This is an error message." />
        </ShowCase>
        <ShowCase title="Card">
          <Card
            title="Simulate Network Issues & Redirect Traffic"
            text="Inject request timeouts, simulate connection failures, and silently redirect requests from one server to another. These features also ensure API stability and failover efficacy."
            darkImage="/images/illustration.svg"
            lightImage="/images/illustration-light.svg"
          />
          <Card
            title="Targeted Request Handling: Proxy & Mock Server Capabilities"
            text="Precise matching lets you target the requests you care about. Match any requests sent anywhere by using HTTP Toolkit as a proxy, send requests directly to use it as a mock server."
            darkImage="/images/illustration-1.svg"
            lightImage="/images/illustration-1-light.svg"
          />
        </ShowCase>
        <ShowCase title="Tooltip">
          <Tooltip text="example">
            <Button icon={RocketLaunch} $variant="secondary">
              Go Pro!
            </Button>
          </Tooltip>
          <Tooltip text="example">
            <Button icon={RocketLaunch} $variant="secondary">
              Go Pro!
            </Button>
          </Tooltip>
        </ShowCase>
        <ShowCase title="Integration Card" $flexDirection="row">
          <IntegrationCard
            $isPopular
            icon={AndroidLogo}
            title="Android"
            text="Android integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices."
            link={{
              href: '/example',
              target: '_blank',
            }}
          />
          <IntegrationCard
            icon={AndroidLogo}
            title="Javascript"
            text="Android integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices."
            link={{
              href: '/example',
              target: '_blank',
            }}
          />
        </ShowCase>
        <ShowCase title="Heading Block">
          <HeadingBlock
            title="What is `*HTTP Toolkit*`?"
            text="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
            badgeTitle="Pro Feature"
            badgeAdditionalText="EDIT"
            badgeIcon={Sparkle}
            $align="center"
            $isContentCentered
          />
          <HeadingBlock
            title="What is `*HTTP Toolkit*`?"
            text="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
            badgeTitle="Pro Feature"
            badgeAdditionalText="EDIT"
            badgeIcon={Sparkle}
            $align="left"
          />
          <HeadingBlock
            title="What is `*HTTP Toolkit*`?"
            text="HTTP Toolkit is a beautiful & open-source toolfor debugging, testing and building with HTTP(S)on Windows, Linux & Mac."
            $align="center"
            $isContentCentered
          />
          <HeadingBlock
            title="Test with `*fully automated*` mock responses"
            badgeTitle="Pro Feature"
            badgeAdditionalText="mock"
            badgeIcon={Sparkle}
            $align="center"
            $isContentCentered
          />
        </ShowCase>
        <ShowCase title="Copy">
          <Copy text="brew install --cask http-toolkit" />
        </ShowCase>
        <ShowCase title="Blog CTA Block">
          <CTABox
            title="A brief introduction to OpenAPI"
            subtitle="see also"
            buttonHref="/example"
            buttonText="Learn more"
            buttonIcon={CaretRight}
          />
          <CTABox
            $variant="faq"
            title="Still have questions?"
            text="Head to the GitHub issue repo, as many questions and bugs already have answers there, and new bugs or feature requests posted there get more feedback & support from the wider community."
            textOverButton="You can also read more in the docs:"
            buttonHref="https://example.com"
            buttonText="Github HTTP Toolkit"
            buttonIcon={GithubLogo}
          />
        </ShowCase>
        <ShowCase title="Blog card">
          <BlogCard
            title="How do you know what's gone wrong when your API request fails?"
            text="Android integration for apps and mobile browsers, including automated setup, per-app interception, and system-level certificate injection for complete visibility into emulators and rooted devices."
            slug="5-big-features-of-typescript-3.7"
            tag="engineering"
            date="2020-09-10T16:30"
            image={{
              src: BlogPostImage.src,
            }}
          />
        </ShowCase>
        <ShowCase title="Content Card">
          <ContentCard title="Join the mailing list now, so you don't miss new features & releases:" $isNewsletter />
          <ContentCard
            title="Having issues?"
            text="Head to the GitHub issue repo, as many questions and bugs already have answers there, and new bugs or feature requests posted there get more feedback & support from the wider community."
            button={{
              children: 'Github HTTP Toolkit',
              href: 'https://github.com/httptoolkit/httptoolkit-website',
              icon: GithubLogo,
            }}
          />
        </ShowCase>
        <ShowCase title="Fluid Cards">
          <FluidCard
            $variant="default"
            icon={SealCheck}
            title="Capture & inspect encrypted HTTPS"
            text={
              'Immediately view HTTPS on any device from apps that trust user-installed certificates, like Chrome.\n\n Enable trust in your own app with one tiny manifest change. \n\n On emulators & rooted devices, easily intercept HTTPS from any app, with automatic injection of a system certificate authority.'
            }
          />
          <FluidCard
            $variant="dark"
            icon={LinkSimpleBreak}
            title="Integrate"
            text={
              "Interception internals you can integrate into your own code for mocking, testing or building custom proxies, available as an MIT-licensed [open-source library](https://example.com) **(that's $0 vs the $2,999/year price tag to build on FiddlerCore)**."
            }
          />
          <FluidCard
            $variant="highlighted"
            title="Want the full details?"
            text={'Take a look at the in-depth guide to Android HTTP debugging.'}
            buttonHref="https://example.com"
            buttonText="Learn more"
          />
        </ShowCase>
        <ShowCase title="Navigation content sidebar">
          <TableContent isCollapsible links={collapsibleTableContent} />
          <TableContent links={nonCollapsibleTableContent} />
        </ShowCase>
        <ShowCase title="Theme toggle">
          <ThemeToggle />
        </ShowCase>
        <ShowCase title="Themed Image" $flexDirection="row">
          <ThemedImage
            withBorderAnimation
            alt="Example themed image"
            darkSrc="https://picsum.photos/id/1019/1024"
            lightSrc="https://picsum.photos/id/1035/1024"
          />
          <ThemedImage
            alt="Example themed image"
            darkSrc="https://picsum.photos/id/1019/1024"
            lightSrc="https://picsum.photos/id/1035/1024"
          />
        </ShowCase>
        <ShowCase title="Blog block code">
          <BlockCode
            title="Response example"
            language="javascript"
            content={`await axios.post(
  '/payments',
  { to: 'user@example', value: 2000 },
  { timeout: 2000 }
);`}
          />
        </ShowCase>
        <ShowCase title="Feature line">
          <FeatureLine
            $align="right"
            image={{
              darkSrc: '/images/mockup-image.webp',
              lightSrc: '/images/mockup-image-light.webp',
            }}
            title="Seamless Traffic Interception"
            badge={{
              text: 'Intercept',
              icon: Sparkle,
            }}
            list={[
              'Experience unmatched control with the Intercept feature, allowing you to seamlessly capture and analyze network traffic in real-time.',
              "Tailor your network's behavior by modifying requests and responses on the fly, ensuring thorough testing and debugging.",
              "Intercept offers a direct window into your application's communication, providing clarity and precision in your development process.",
            ]}
          />
        </ShowCase>
        <Stack $gap="32px" $gapxl="96px">
          <FeatureLine
            image={{
              darkSrc: '/images/mockup-image.webp',
              lightSrc: '/images/mockup-image-light.webp',
            }}
            title="Customize Responses with Prototyping Rules for Endpoints"
            text="Create rules to match requests and respond with your own content, to quickly prototype against new endpoints or services."
            icon={Gear}
          />
          <FeatureLine
            image={{
              darkSrc: '/images/mockup-image.webp',
              lightSrc: '/images/mockup-image-light.webp',
            }}
            title="Endpoint Management for Testing Edge Cases & Error Handling"
            text="Define new endpoints, override existing ones, or replace external services, to reproduce tricky edge cases and test your error handling."
            icon={ShieldCheck}
          />
          <FeatureLine
            image={{
              darkSrc: '/images/mockup-image.webp',
              lightSrc: '/images/mockup-image-light.webp',
            }}
            title="Shareable Mock Rulesets: Import & Export for Team Collaboration"
            text="Import & export your mock rulesets, to build complex setups and share them with your team."
            icon={ArrowsLeftRight}
          />
        </Stack>
        <IntegrationSteps title="Two ways to get started" subtitle="getting started" steps={stepsData} />
        <IntegrationSteps title="Getting `*started*`" steps={stepsData1} />
        <ShowCase title="Navigation content sidebar links">
          <NavigationSidebarLinks title="On this page" links={navigationContentSidebar} />
        </ShowCase>
        <ShowCase title="Download button">
          <DownloadButton $small $variant="secondary" />
          <DownloadButton $variant="primary" $withBorder />
        </ShowCase>
      </Container>
      <Container>
        <ShowCase title="Simple Footer">
          <SimpleFooter />
        </ShowCase>
      </Container>
    </Layout>
  );
}