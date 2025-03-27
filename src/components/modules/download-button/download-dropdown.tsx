'use client';

import sortBy from 'lodash/sortBy';
import partition from 'lodash/partition';
import { useEffect, useMemo, useState } from 'react';

import { styled } from '@/styles';

import { SendEmail } from './components/send-email';
import type { DownloadDropdownProps } from './download-button.types';
import { Dropdown } from '../dropdown';
import type { DropdownOption } from '../dropdown/dropdown.types';

import { StyledHideElementOn } from '@/components/elements/hide-on/hide-on';
import { useIsMobile } from '@/lib/hooks/use-is-mobile';
import { parseUserAgent } from '@/lib/utils/parse-user-agent';
import type { DownloadDictionary } from '@/content/data/download-dictionary';

const LATEST_RELEASE_URL = 'https://github.com/httptoolkit/httptoolkit-desktop/releases/latest';

const DownloadSubText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.text.xs};
  margin-top: 4px;
`;

const downloadItemToOption = (item: DownloadDictionary) => ({
  as: 'link',
  href: item.href || LATEST_RELEASE_URL,
  text: item.text,
  subtext: item.subtext
} as const);

export const DownloadDropdown = ({
  $small,
  $variant,
  $withBorder,
  isInHeader,
  fixedOS,
  downloadItems,
}: DownloadDropdownProps) => {
  const [operatingSystem, setOperatingSystem] = useState<string>(fixedOS ?? 'windows');
  const isMobile = useIsMobile();

  const defaultDownload =
    downloadItems.find(os => os.os === operatingSystem && os.defaultText) || downloadItems[0];

  const items: DropdownOption[] = useMemo(
    () => {
      const [currentOsDownloads, otherOsDownloads] = partition(downloadItems, ({ os }) => os === operatingSystem);

      return [
        ...sortBy(currentOsDownloads.map(downloadItemToOption), ['desc']),
        ...(currentOsDownloads.length ? [{ type: 'hr' } as const] : []),
        ...sortBy(otherOsDownloads.map(downloadItemToOption), ['os', 'desc']),
      ];
    }, [downloadItems, operatingSystem]
  );

  useEffect(() => {
    if (!isMobile && fixedOS) return setOperatingSystem(fixedOS);
    setOperatingSystem(parseUserAgent(navigator.userAgent));
  }, []);

  // Makes the hide/show with styles to avoid CLS issues
  return (
    <>
      <SendEmail data-is-in-header={isInHeader} buttonProps={{ $variant, $small, $withBorder }} />
      <StyledHideElementOn $hideBelow="md">
        <Dropdown
          $small={$small}
          href={defaultDownload.href}
          $variant={$variant}
          $withBorder={$withBorder}
          aria-label="Download Items"
          items={items}
        >
          <div>
            Download for {defaultDownload.defaultText}
            { defaultDownload.subtext && <DownloadSubText>
              { defaultDownload.subtext }
            </DownloadSubText> }
          </div>
        </Dropdown>
      </StyledHideElementOn>
    </>
  );
};