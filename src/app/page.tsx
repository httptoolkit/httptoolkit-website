import { CaretDown, RocketLaunch } from '@phosphor-icons/react/dist/ssr';

import { Button } from '@/components/elements/button';
import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';
import { Dropdown } from '@/components/modules/dropdown';

export default async function Home() {
  return (
    <Container>
      <Heading>What is HTTP Toolkit? - XL</Heading>
      <Heading as="h2" fontSize="l">
        What is HTTP Toolkit? - L
      </Heading>
      <Heading as="h3" fontSize="m">
        What is HTTP Toolkit? - M
      </Heading>
      <Heading as="h4" fontSize="s" color="cinnarbarRed">
        What is HTTP Toolkit? - S
      </Heading>
      <Heading as="h5" fontSize="xs">
        What is HTTP Toolkit? - XS
      </Heading>
      <Text textAlign="center">
        This is a paragraph Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or
        inject errors
      </Text>
      <Text color="electricLightBlue">
        This is a paragraph Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite, redirect, or
        inject errors
      </Text>
      <Text color="cinnarbarRed" fontWeight="medium">
        This is a paragraph orange and bold, Intercept & view all your HTTP(S) Mock endpoints or entire servers Rewrite,
        redirect, or inject errors
      </Text>
      <Button target="_blank" icon={CaretDown} as="link" href="/eso">
        Download for macOs
      </Button>
      <Button as="button" withBorder icon={CaretDown}>
        Download for macOs
      </Button>
      <Button as="button" variant="secondary" icon={RocketLaunch}>
        Go Pro!
      </Button>
      <Button as="button" small variant="secondary" icon={RocketLaunch}>
        Go Pro!
      </Button>
      <Dropdown
        as="button"
        variant="secondary"
        small
        items={[
          {
            content: 'Example',
            as: 'button',
          },
          {
            content: 'Example',
            as: 'a',
            href: '/',
          },
          {
            content: 'Example',
            as: 'Link',
            href: '/',
            target: '_blank',
          },
        ]}
      >
        Download for macOS
      </Dropdown>
    </Container>
  );
}
