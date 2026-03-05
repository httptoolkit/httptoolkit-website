import { styled } from '@linaria/react';

import { Container } from '@/components/elements/container';
import { Gradient } from '@/components/elements/gradient';
import { GrowingNumbers } from '@/components/modules/growing-numbers';
import type { GrowingNumbersStat } from '@/components/modules/growing-numbers';
import { HeadingBlock } from '@/components/modules/heading-block';
import { getGithubDownloadStats } from '@/lib/services/get-github-download-stats';
import { getOpenSourceContributors } from '@/lib/services/get-open-source-contributors';
import { getOrganizationStars } from '@/lib/services/get-repo-stars';
import { screens } from '@/styles/tokens';

interface StatisticsProps {
  title?: string;
  text?: string;
}

const StyledStatisticsGradient = styled.div`
  position: absolute;
  top: 0;
  height: 110%;
  left: 0;
`;

const StyledStatisticsGradientWrapper = styled.section`
  position: relative;
  overflow: hidden;
`;

const StyledStatisticsWrapper = styled(Container)`
  &&& {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    padding: 96px 48px;
    position: relative;

    @media (max-width: ${screens.lg}) {
      flex-direction: column;
      padding: 16px 0;

      & > *:first-child {
        margin: 0 auto;
        align-items: center;
      }

      & * {
        text-align: center;
      }
    }
  }
`;

export const Statistics = async ({
  title = 'Why *HTTP Toolkit*?',
  text = 'Numbers that speak for themselves:',
}: StatisticsProps) => {
  const downloads = await getGithubDownloadStats();
  const contributors = await getOpenSourceContributors();
  const starts = await getOrganizationStars();

  const stats: GrowingNumbersStat[] = [
    {
      title: 'years of development',
      number: new Date().getFullYear() - 2018,
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
      title: 'GitHub stars across httptoolkit\'s repos',
      number: starts,
      isOver: true,
    },
  ];

  return (
    <StyledStatisticsGradientWrapper>
      <StyledStatisticsGradient>
        <Gradient />
      </StyledStatisticsGradient>
      <StyledStatisticsWrapper>
        <HeadingBlock $align="left" title={title} text={text} />
        <GrowingNumbers stats={stats} />
      </StyledStatisticsWrapper>
    </StyledStatisticsGradientWrapper>
  );
};
