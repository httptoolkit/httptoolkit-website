'use client';

import sortBy from 'lodash/sortBy';
import { useEffect, useMemo, useState } from 'react';

import { SendEmail } from './components/send-email';
import type { DownloadDropdownProps } from './download-button.types';
import { Dropdown } from '../dropdown';
import type { DropdownOptionProps } from '../dropdown/dropdown.types';

import { StyledHideElementOn } from '@/components/elements/hide-on/hide-on';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import { parseUserAgent } from '@/lib/utils/parse-user-agent';

const LATEST_RELEASE_URL = 'https://github.com/httptoolkit/httptoolkit-desktop/releases/latest';

export const DownloadDropdown = ({
  $small,
  $variant,
  $withBorder,
  isInHeader,
  fixedOS,
  downloadItems,
}: DownloadDropdownProps) => {
  const [operativeSystem, setOperativeSystem] = useState('');
  const isMobile = useIsMobile();
  const defaultOperativeSystem =
    downloadItems.find(os => os.os === operativeSystem && os.defaultText) || downloadItems[0];

  const items: DropdownOptionProps[] = useMemo(
    () =>
      sortBy(downloadItems, [item => (item.os === defaultOperativeSystem.os ? 0 : 1)], 'os', 'desc').map(item => ({
        as: 'link',
        href: item.href || LATEST_RELEASE_URL,
        content: item.text,
      })),
    [operativeSystem],
  );

  useEffect(() => {
    if (!isMobile && fixedOS) return setOperativeSystem(fixedOS);

    setOperativeSystem(parseUserAgent(navigator.userAgent));
  }, []);

  // Makes the hide/show with styles to avoid CLS issues
  return (
    <>
      <StyledHideElementOn $hideOn="desktop">
        <SendEmail data-is-in-header={isInHeader} buttonProps={{ $variant, $small, $withBorder }} />
      </StyledHideElementOn>
      <StyledHideElementOn $hideOn="mobile">
        <Dropdown
          $small={$small}
          href={defaultOperativeSystem.href}
          $variant={$variant}
          $withBorder={$withBorder}
          aria-label="Download Items"
          items={items}
        >
          Download for {defaultOperativeSystem.defaultText}
        </Dropdown>
      </StyledHideElementOn>
    </>
  );
};
