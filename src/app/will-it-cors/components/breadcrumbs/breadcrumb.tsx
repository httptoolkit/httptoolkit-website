import type { BreadcrumState } from './breadcrumbs-types';
import { StyledBreadcrumbItemWrapper } from './breadcrumbs.styles';

import { CheckCircle, XCircle } from '@/components/elements/icon';

interface BreadcrumbProps {
  state?: BreadcrumState;
}

export const Breadcrumb = ({ children, state }: Component<BreadcrumbProps>) => {
  return (
    <StyledBreadcrumbItemWrapper $state={state}>
      {state === 'yes' && <CheckCircle aria-label="Yes" weight="fill" size={30} color="#6284FA" />}
      {state === 'no' && <XCircle aria-label="No" weight="fill" size={30} color="#D93E1C" />}

      <p>{children}</p>
    </StyledBreadcrumbItemWrapper>
  );
};
