import { styled } from '@linaria/react';

import { Image } from '@/components/elements/image';
import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import { fontSizes, fontWeight } from '@/styles/tokens';

export const StyledLink = styled(Link)`
  &&& {
    text-decoration: underline;
    color: var(--text-dark-grey);
  }
`;

export const StyledText = styled(Text)`
  &&& {
    margin-bottom: 1.25rem;
  }
`;

export const StyledHighlightedParagraphs = styled.div`
  p {
    margin-bottom: 2rem;
    color: var(--text-dark-grey);
    font-size: ${fontSizes.text.l};
    font-weight: ${fontWeight.bold};
    line-height: 1.5;
  }
`;

export const StyledHeading = styled.div`
  &&& {
    margin-bottom: 24px;
    margin-top: var(--heading-margin, 0px);
  }
`;

export const StyledUL = styled.ul`
  list-style: disc;
  padding-left: 30px;
  margin-bottom: 2rem;
  color: var(--text-dark-grey);
  font-size: ${fontSizes.text.m};

  ul, ol {
    margin-top: 2px;
    margin-bottom: 2px;
  }
`;

export const StyledOL = styled.ol`
  list-style: decimal;
  padding-left: 30px;
  margin-bottom: 2rem;
  color: var(--text-dark-grey);
  font-size: ${fontSizes.text.m};

  ul, ol {
    margin-top: 2px;
    margin-bottom: 2px;
  }
`;

export const StyledImage = styled(Image)`
  &&& {
    display: block;
    position: relative !important;
    max-width: 100%;
    margin: 48px auto;
  }
`;
