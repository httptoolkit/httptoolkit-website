import { Link } from '@/components/elements/link';
import { CaretRight } from '@/components/elements/icon';
import { styled } from '@linaria/react';
import { fontSizes, fontWeight } from '@/styles/tokens';

interface BreadcrumbLink {
  href?: string;
  text: string;
}

export interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}

const StyledBreadcrumbsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledBreadcrumbItem = styled.div`
  display: flex;
  gap: 8px;

  & svg {
    color: var(--text-dark-grey);
  }
`;

const breadcrumbStyles = `
  font-size: ${fontSizes.label.l};
  line-height: 1.1;
  color: var(--text-dark-grey);
  letter-spacing: 0.6px;
  transition: all 0.1s;
  text-transform: uppercase;
  flex-shrink: 0;

  &[data-active="true"] {
    font-weight: ${fontWeight.bold};
    color: var(--text-white);
  }
`;

const StyledBreadcrumbLink = styled(Link)`
  ${breadcrumbStyles}
`;

const StyledBreadcrumbText = styled.p`
  ${breadcrumbStyles}
`;

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <StyledBreadcrumbsWrapper>
      {Array.isArray(links) &&
        links.length > 0 &&
        links.map((link, index) => {
          const isLast = links.length - 1 === index;
          return (
            <StyledBreadcrumbItem key={link.text}>
              <StyledBreadcrumbItem>
                {link.href ? (
                  <StyledBreadcrumbLink data-active={isLast} href={link.href}>
                    {link.text}
                  </StyledBreadcrumbLink>
                ) : (
                  <StyledBreadcrumbText data-active={isLast}>
                    {link.text}
                  </StyledBreadcrumbText>
                )}
                {!isLast && <CaretRight size={16} weight="fill" />}
              </StyledBreadcrumbItem>
            </StyledBreadcrumbItem>
          );
        })}
    </StyledBreadcrumbsWrapper>
  );
};
