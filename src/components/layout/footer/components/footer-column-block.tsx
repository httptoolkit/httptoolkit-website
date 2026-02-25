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
      $displayOnMobile={displayOnMobile}
      $displayOnDesktop={displayOnDesktop}
    >
      <Text as="label" fontSize="m" color="cinnabarRed" fontWeight="bold">
        {column.title}
      </Text>
      <StyledMenuItems role="list" $displayOnMobile={displayOnMobile} $displayOnDesktop={displayOnDesktop}>
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
