import { Badge } from '@/components/elements/badge';
import { Button } from '@/components/elements/button';
import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Sparkle, Alien, Logo, CaretDown, RocketLaunch, AndroidLogo } from '@/components/elements/icon';
import ShowCase from '@/components/elements/showcase';
import { SquareIcon } from '@/components/elements/square-icon';
import { Text } from '@/components/elements/text';
import { ThemeToggle } from '@/components/elements/theme-toggle';
import { Tooltip } from '@/components/elements/tooltip';
import { Dropdown } from '@/components/modules/dropdown';
import type { DropdownOptionProps } from '@/components/modules/dropdown/dropdown.types';
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
      <ShowCase title="Theme toggle">
        <ThemeToggle />
      </ShowCase>
    </Container>
  );
}
