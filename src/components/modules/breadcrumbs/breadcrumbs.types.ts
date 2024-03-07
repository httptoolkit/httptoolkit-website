interface BreadcrumbLink {
  href?: string;
  text: string;
}

export interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}
