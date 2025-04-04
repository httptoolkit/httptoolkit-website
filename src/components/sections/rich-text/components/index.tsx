import { kebabCase } from 'lodash-es';
import type { MDXComponents } from 'mdx/types';

import {
  StyledHeading,
  StyledHighlightedParagraphs,
  StyledImage,
  StyledLink,
  StyledOL,
  StyledText,
  StyledUL,
} from './default.styles';
import type { StyledHeadingProps } from './default.types';

import * as Icons from '@/components/elements/icon';
import { Accordion } from '@/components/modules/accordion';
import type { AccordionProps } from '@/components/modules/accordion/accordion.types';
import { BlockCode, InlineCode } from '@/components/modules/block-code';
import { CTABox } from '@/components/modules/cta-box';
import type { CTABoxProps } from '@/components/modules/cta-box/cta-box.types';

const Heading2 = ({ children }: Component<StyledHeadingProps>) => {
  return (
    <StyledHeading $margin={48} forwardedAs="h2" fontSize="m" color="lightGrey" id={kebabCase(children?.toString())}>
      {children}
    </StyledHeading>
  );
};

const Heading3to6 = ({ children }: Component<StyledHeadingProps>) => {
  return (
    <StyledHeading $margin={24} forwardedAs="h3" fontSize="s" color="lightGrey" id={kebabCase(children?.toString())}>
      {children}
    </StyledHeading>
  );
};

export const defaultComponents: MDXComponents = {
  h2: Heading2,
  h3: Heading3to6,
  h4: Heading3to6,
  h5: Heading3to6,
  h6: Heading3to6,
  // @ts-ignore
  a({ children, href }: Component<{ href: string }>) {
    return <StyledLink href={href}>{children}</StyledLink>;
  },
  p({ children }: Component) {
    return (
      <StyledText fontSize="m" color="darkGrey">
        {children}
      </StyledText>
    );
  },
  HighlightedParagraphs({ children }: Component) {
    return <StyledHighlightedParagraphs>{children}</StyledHighlightedParagraphs>;
  },
  Accordion(props: AccordionProps) {
    return <Accordion {...props} />;
  },
  CTABox(props: CTABoxProps) {
    return <CTABox {...props} />;
  },
  ul({ children }: Component) {
    return <StyledUL>{children}</StyledUL>;
  },
  ol({ children }: Component) {
    return <StyledOL>{children}</StyledOL>;
  },
  code({ children, className }) {
    if (!className) {
      return <InlineCode>{children}</InlineCode>;
    }

    return <BlockCode content={children} language={className} title="Code example" />;
  },
  ...Icons,
};

function setImagePath(path: string, parentFolder: string) {
  const imageSegments = path?.split('/');
  const imageFilename = imageSegments[imageSegments.length - 1];

  return `/images/${parentFolder}/${imageFilename}`;
}

const imageResolver = ({
  src,
  alt,
  title,
  imagePathPrefix,
}: {
  src?: string;
  alt?: string;
  title?: string;
  imagePathPrefix: string;
}) => {
  const realSRC = setImagePath(src || '', imagePathPrefix);

  return (
    <StyledImage forwardedWrapperAs="span" src={realSRC} alt={alt ?? ''} title={title} width={1024} height={768} />
  );
};

export const docsComponents: MDXComponents = {
  img: ({ src, alt, title }) => imageResolver({ src, title, alt, imagePathPrefix: 'docs' }),
};

export const postComponents: MDXComponents = {
  img: ({ src, alt, title }) => imageResolver({ src, title, alt, imagePathPrefix: 'posts' }),
};
