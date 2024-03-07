import { StyledStatisticsWrapper } from './stadistics.styles';
import type { StatisticsProps } from './stadistics.types';

import { GrowingNumbers } from '@/components/modules/growing-numbers';
import type { GrowingNumbersStat } from '@/components/modules/growing-numbers/growing-numbers.types';
import { HeadingBlock } from '@/components/modules/heading-block';
import { getGithubDownloadStats } from '@/lib/services/get-github-download-stats';
import { getOpenSourceContributors } from '@/lib/services/get-open-source-contributors';
import { getOrganizationStars } from '@/lib/services/get-repo-starts';

export const Statistics = async ({ title, text }: StatisticsProps) => {
  const downloads = await getGithubDownloadStats();
  const contributors = await getOpenSourceContributors();
  const starts = await getOrganizationStars();

  const stats: GrowingNumbersStat[] = [
    {
      title: 'years in business',
      number: 8,
      isOver: true,
    },
    {
      title: 'users around the world',
      number: downloads,
      isOver: true,
    },
    {
      title: 'open-source contributors',
      number: contributors,
    },
    {
      title: 'GitHub stars on httptoolkit repos',
      number: starts,
      isOver: true,
    },
  ];
  return (
    <StyledStatisticsWrapper>
      <HeadingBlock $align="left" title={title} text={text} />
      <GrowingNumbers stats={stats} />
    </StyledStatisticsWrapper>
  );
};
