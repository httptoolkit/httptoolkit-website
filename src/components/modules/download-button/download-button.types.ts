import type { ButtonProps } from '@/components/elements/button/button.types';
import type { DownloadDictionary } from '@/content/data/download-dictionary';

export type DownloadDropdownProps = Pick<ButtonProps, '$small' | '$variant' | '$withBorder'> & {
  isInHeader?: boolean;
  fixedOS?: 'mac' | 'windows' | 'linux';
  downloadItems: DownloadDictionary[];
};

export type DownloadButtonProps = Omit<DownloadDropdownProps, 'downloadItems'>;
