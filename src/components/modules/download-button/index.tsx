'use client';

import sortBy from 'lodash/sortBy';
import { useEffect, useMemo, useState } from 'react';

import { SendEmail } from './components/send-email';
import type { DownloadButtonProps } from './download-button.types';
import { Dropdown } from '../dropdown';
import type { DropdownOptionProps } from '../dropdown/dropdown.types';

import { OSDictionary } from '@/lib/constants/download-dictionary';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import { parseUserAgent } from '@/lib/utils/parse-user-agent';

// TODO: need to integrate send email functionality

const LATEST_RELEASE_URL = 'https://github.com/httptoolkit/httptoolkit-desktop/releases/latest';

export const DownloadButton = ({ $small, $variant, $withBorder }: DownloadButtonProps) => {
  const [operativeSystem, setOperativeSystem] = useState('');
  const isMobile = useIsMobile();
  const defaultOperativeSystem =
    OSDictionary.find(os => os.os === operativeSystem && os.defaultText) || OSDictionary[0];

  const items: DropdownOptionProps[] = useMemo(
    () =>
      sortBy(OSDictionary, [item => (item.os === defaultOperativeSystem.os ? 0 : 1)], 'os', 'desc').map(item => ({
        as: 'link',
        href: item.href || LATEST_RELEASE_URL,
        content: item.text,
      })),
    [operativeSystem],
  );

  useEffect(() => {
    setOperativeSystem(parseUserAgent(navigator.userAgent));
  }, []);

  if (isMobile || operativeSystem === 'mobile') return <SendEmail buttonProps={{ $variant, $small, $withBorder }} />;

  return (
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
  );
};
