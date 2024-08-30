import type { DownloadButtonProps } from './download-button.types';
import { DownloadDropdown } from './download-dropdown';

import { getDownloadOptionsDictionary } from '@/content/data/download-dictionary';

export const DownloadButton = async ({ ...props }: DownloadButtonProps) => {
  const downloadItems = await getDownloadOptionsDictionary();
  return <DownloadDropdown {...props} downloadItems={downloadItems} />;
};
