import type { ButtonProps } from '@/components/elements/button';
import type { DownloadDictionary } from '@/content/data/download-dictionary';

import { DownloadDropdown } from './download-dropdown';
import { getDownloadOptionsDictionary } from '@/content/data/download-dictionary';

export type DownloadDropdownProps = Pick<ButtonProps, 'small' | 'variant' | 'withBorder'> & {
  isInHeader?: boolean;
  fixedOS?: 'mac' | 'windows' | 'linux';
  downloadItems: DownloadDictionary[];
};

export type DownloadButtonProps = Omit<DownloadDropdownProps, 'downloadItems'>;

export const DownloadButton = async ({ ...props }: DownloadButtonProps) => {
  const downloadItems = await getDownloadOptionsDictionary();
  return <DownloadDropdown {...props} downloadItems={downloadItems} />;
};
