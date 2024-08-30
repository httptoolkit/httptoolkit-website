import {
  StyledDocumentationGlobalWrapper,
  StyledDocumentationLayoutContentWrapper,
  StyledDocumentationLayoutDesktopHeading,
  StyledDocumentationLayoutGradientWrapper,
  StyledDocumentationLayoutMobileHeading,
  StyledDocumentationLayoutNavigationWrapper,
  StyledDocumentationLayoutSideWrapper,
  StyledDocumentationLayoutWrapper,
} from './documentation.styles';
import type { DocumentationLayoutProps } from './documentation.types';

import { Gradient } from '@/components/elements/gradient';
import { NavigationSidebarLinks } from '@/components/modules/navigation-sidebar-links';
import { SiteSearch } from '@/components/modules/site-search';
import { TableContent } from '@/components/modules/table-content';
import { getAllDocsMeta } from '@/lib/mdx/docs';
import type { UnorganizedDoc } from '@/lib/mdx/utils/get-content-table-links';
import { getContentTableLinks } from '@/lib/mdx/utils/get-content-table-links';

export async function DocumentationLayout({ title, children, links }: Component<DocumentationLayoutProps>) {
  const docsMeta = await getAllDocsMeta();
  const pageLinks = getContentTableLinks(docsMeta as UnorganizedDoc[]);

  return (
    <StyledDocumentationGlobalWrapper>
      <StyledDocumentationLayoutGradientWrapper>
        <Gradient />
      </StyledDocumentationLayoutGradientWrapper>
      <StyledDocumentationLayoutWrapper>
        <StyledDocumentationLayoutMobileHeading fontSize="l" color="textGradient">
          {title}
        </StyledDocumentationLayoutMobileHeading>
        <StyledDocumentationLayoutSideWrapper>
          <SiteSearch />
          <TableContent isCollapsible links={pageLinks} />
        </StyledDocumentationLayoutSideWrapper>
        <StyledDocumentationLayoutContentWrapper>
          <div id="intro" />
          <StyledDocumentationLayoutDesktopHeading>{title}</StyledDocumentationLayoutDesktopHeading>
          {children}
        </StyledDocumentationLayoutContentWrapper>
        <StyledDocumentationLayoutNavigationWrapper>
          {links?.length ? <NavigationSidebarLinks title="On this page" links={links} /> : null}
        </StyledDocumentationLayoutNavigationWrapper>
      </StyledDocumentationLayoutWrapper>
    </StyledDocumentationGlobalWrapper>
  );
}
