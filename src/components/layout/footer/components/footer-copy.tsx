import { StyledFooterCopySection } from '../footer.styles';

import { Link } from '@/components/elements/link';
import Stack from '@/components/elements/stack';
import { Text } from '@/components/elements/text';
import { pageRoutes } from '@/lib/constants/routes';

export const FooterCopy = () => {
  const { PRIVACY_POLICY, TERM_OF_SERVICES } = pageRoutes;
  return (
    <StyledFooterCopySection>
      <Text fontSize="m">© {new Date().getFullYear()} HTTP Toolkit All rights reserved.</Text>
      <Stack $direction="row">
        <Link href={TERM_OF_SERVICES.href}>{TERM_OF_SERVICES.label}</Link>
        <Link href={PRIVACY_POLICY.href}>{PRIVACY_POLICY.label}</Link>
      </Stack>
    </StyledFooterCopySection>
  );
};
