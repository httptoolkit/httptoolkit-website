import { Container } from '@/components/elements/container';
import { Heading } from '@/components/elements/heading';
import { Text } from '@/components/elements/text';

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
      <Text>
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
    </Container>
  );
}
