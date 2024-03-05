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
} from '@/components/elements/icon';
import ShowCase from '@/components/elements/showcase';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import { ThemedImage } from '@/components/elements/themed-image';
import { Tooltip } from '@/components/elements/tooltip';
import { SimpleFooter } from '@/components/layout/footer/simple-footer';
import { BlockCode } from '@/components/modules/block-code';
import { BlogCard } from '@/components/modules/blog-card';
import { Card } from '@/components/modules/card';
import { ContentCard } from '@/components/modules/content-card';
import { CTABox } from '@/components/modules/cta-box';
import { Dropdown } from '@/components/modules/dropdown';
import type { DropdownOptionProps } from '@/components/modules/dropdown/dropdown.types';
import { FluidCard } from '@/components/modules/fluid-card';
import { HeadingBlock } from '@/components/modules/heading-block';
import { Input } from '@/components/modules/input';
import { IntegrationCard } from '@/components/modules/integration-card';
import { NavigationSidebarLinks } from '@/components/modules/navigation-sidebar-links';
import { TableContent } from '@/components/modules/table-content';
import { CTA } from '@/components/sections/cta';
import BlogPostImage from '@/content/posts/analytics-map.png';

export default async function Home() {
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
      href: '#example',
    },
    {
      text: 'Terms Of Service (“Terms”)',
      href: '#example',
    },
    {
      text: 'What information do we collect?',
      href: '#example',
      subItems: [
        {
          text: 'Information automatically collected',
          href: '#example',
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
          href: '#example',
        },
        {
          text: 'Internet transfer',
          href: '#example',
        },
      ],
    },
    {
      text: 'How to pay?',
      href: '#example',
    },
    {
      text: 'Troubles with payment',
      subitems: [
        {
          text: 'How to find your money',
          href: '#example',
        },
        {
          text: 'My money has gone',
          href: '#example',
        },
      ],
    },
  ];

  return (
    <>
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
          priority: true,
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
          <Input placeholder="Email address" />
          <Input placeholder="Search" type="search" />
          <Input as="textarea" placeholder="Email address" />
          <Input $hasError placeholder="Email address" errorMessage="This is an error message." />
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
            $showBadge
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
            buttonText="Github HTTP Toolkit"
            buttonIcon={GithubLogo}
            buttonHref="https://github.com/httptoolkit/httptoolkit-website"
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
        <ShowCase title="Navigation content sidebar links">
          <NavigationSidebarLinks title="On this page" links={navigationContentSidebar} />
        </ShowCase>
        <ShowCase title="Simple Footer">
          <SimpleFooter />
        </ShowCase>
      </Container>
    </>
  );
}
