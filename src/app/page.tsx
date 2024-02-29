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
  SealCheck,
  LinkSimpleBreak,
} from '@/components/elements/icon';
import ShowCase from '@/components/elements/showcase';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import { ThemedImage } from '@/components/elements/themed-image';
import { Tooltip } from '@/components/elements/tooltip';
import { SimpleFooter } from '@/components/layout/footer/simple-footer';
import { Dropdown } from '@/components/modules/dropdown';
import type { DropdownOptionProps } from '@/components/modules/dropdown/dropdown.types';
import { FluidCard } from '@/components/modules/fluid-card';
import { HeadingBlock } from '@/components/modules/heading-block';
import { Input } from '@/components/modules/input';
import { IntegrationCard } from '@/components/modules/integration-card';

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
    },
  ];

  return (
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
      <ShowCase title="Badge">
        <Badge icon={Sparkle}>Intercept</Badge>
        <Badge icon={Sparkle} variant="secondary" additionalText="Edit">
          Pro Feature
        </Badge>
      </ShowCase>
      <ShowCase title="Icon">
        <SquareIcon icon={Alien} />
        <SquareIcon icon={Alien} $size="large" />
        <SquareIcon icon={Logo} $variant="secondary" />
        <SquareIcon icon={Alien} $variant="tertiary" />
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
      <ShowCase title="Simple Footer">
        <SimpleFooter />
      </ShowCase>
    </Container>
  );
}
