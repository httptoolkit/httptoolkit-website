import {
    StyledAlternativesColumnContent,
    StyledAlternativesPageColumns,
    StyledGradientLeft,
    StyledAlternativeHeadingTag,
    StyledAlternativeList
} from './alternatives.styles';

import { LandingLayout } from '@/components/layout/landing-layout';
import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { Heading } from '@/components/elements/heading';
import { Section } from '@/components/elements/section';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { Link } from '@/components/elements/link';

export default function AlternativesPage() {
  return (
    <LandingLayout>
      <Section>
        <StyledGradientLeft>
          <Gradient />
        </StyledGradientLeft>
        <Container>
          <StyledAlternativesPageColumns>
            <StyledAlternativesColumnContent>
              <Stack $gap="32px" $gapxl="24px">
                <Heading fontSize="l" color="textGradient">
                    HTTP Toolkit as an alternative to...
                </Heading>
                <Text fontSize="m">
                    How does HTTP Toolkit compare as an alternative to other popular HTTP debuggers?
                    Take a look at the comparison pages to the right to see what HTTP Toolkit
                    offers compared to other similar HTTP debugging tools and approaches.
                </Text>
                <Text fontSize="m">
                    Is there an alternative that's not covered that you'd like to see
                    here? <Link href="/contact/">Get in touch</Link> with your feedback.
                </Text>
              </Stack>
            </StyledAlternativesColumnContent>

            <div>
                <Text fontSize="xl">
                    Let's compare the features & value of HTTP Toolkit as a:
                </Text>
                <StyledAlternativeList>
                    <li>
                        <StyledAlternativeHeadingTag>
                            <Link href="/fiddler-alternative/">
                                Fiddler alternative
                            </Link>
                        </StyledAlternativeHeadingTag>
                    </li>
                    <li>
                        <StyledAlternativeHeadingTag>
                            <Link href="/charles-alternative/">
                                Charles alternative
                            </Link>
                        </StyledAlternativeHeadingTag>
                    </li>
                    <li>
                        <StyledAlternativeHeadingTag>
                            <Link href="/chrome-devtools-alternative/">
                                Chrome Devtools alternative
                            </Link>
                        </StyledAlternativeHeadingTag>
                    </li>
                </StyledAlternativeList>
            </div>
          </StyledAlternativesPageColumns>
        </Container>
      </Section>
    </LandingLayout>
  );
}
