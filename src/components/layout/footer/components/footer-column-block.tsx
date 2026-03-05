import { StyledMenuItems, StyledMenuWrapper } from '../footer.styles';

import { Link } from '@/components/elements/link';
import { Text } from '@/components/elements/text';
import type { FooterColumn } from '@/content/data/footer-columns';

export const FooterColumnBlock = ({ column }: { column: FooterColumn }) => {
  const displayOnMobile = !!column.displayOn?.includes('mobile');
  const displayOnDesktop = !!column.displayOn?.includes('desktop');

  return (
    <StyledMenuWrapper
      data-hide={displayOnMobile}
      data-display-on-mobile={String(displayOnMobile)}
      data-display-on-desktop={String(displayOnDesktop)}
    >
      <Text as="label" fontSize="m" color="cinnabarRed" fontWeight="bold">
        {column.title}
      </Text>
      <StyledMenuItems role="list" data-display-on-mobile={String(displayOnMobile)} data-display-on-desktop={String(displayOnDesktop)}>
        {column.links.map(link => {
          if (!link) {
            return null;
          }

          return (
            <li role="listitem" key={link.label}>
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </StyledMenuItems>
    </StyledMenuWrapper>
  );
};
