import {
  StyledDocumentationGlobalWrapper,
  StyledDocumentationLayoutContentWrapper,
  StyledDocumentationLayoutDesktopHeading,
  StyledDocumentationLayoutGradientWrapper,
  StyledDocumentationLayoutMobileHeading,
  StyledDocumentationLayoutSideWrapper,
  StyledDocumentationLayoutWrapper,
} from './documentation.styles';
import type { DocumentationLayoutProps } from './documentation.types';

import { Gradient } from '@/components/elements/gradient';
import { Input } from '@/components/modules/input';
import { TableContent } from '@/components/modules/table-content';
import { getAllDocsMeta } from '@/lib/mdx/docs';
import type { UnorganizedDoc } from '@/lib/utils/get-content-table-links';
import { FAQ_SLUG, getContentTableLinks } from '@/lib/utils/get-content-table-links';
import { getTitlesBySlug } from '@/lib/utils/get-titles-by-slug';

export async function DocumentationLayout({ title, children }: Component<DocumentationLayoutProps>) {
  const docsMeta = await getAllDocsMeta();
  const links = getContentTableLinks(docsMeta as UnorganizedDoc[]);
  const faq = await getTitlesBySlug(`/src/content/docs/guides/${FAQ_SLUG}.mdx`, FAQ_SLUG);

  return (
    <StyledDocumentationGlobalWrapper>
      <StyledDocumentationLayoutGradientWrapper>
        <Gradient />
      </StyledDocumentationLayoutGradientWrapper>
      <StyledDocumentationLayoutWrapper>
        <StyledDocumentationLayoutMobileHeading fontSize="m" color="textGradient">
          {title}
        </StyledDocumentationLayoutMobileHeading>
        <StyledDocumentationLayoutSideWrapper>
          <Input id="search" type="search" placeholder="Search" />
          <TableContent isCollapsible links={[...links, faq]} />
        </StyledDocumentationLayoutSideWrapper>
        <StyledDocumentationLayoutContentWrapper>
          <StyledDocumentationLayoutDesktopHeading>{title}</StyledDocumentationLayoutDesktopHeading>
          {children}
        </StyledDocumentationLayoutContentWrapper>
      </StyledDocumentationLayoutWrapper>
    </StyledDocumentationGlobalWrapper>
  );
}
