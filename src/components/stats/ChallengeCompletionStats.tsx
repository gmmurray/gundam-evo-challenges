import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { GetStatTotals } from '../../helpers/userStatHelpers';
import NoStatData from './NoStatData';
import { challengeTypes } from '../../data/challengeTypes';
import { getUniqueElements } from '../../helpers/arrayHelpers';
import { useMemo } from 'react';
import { useTheme } from '@mui/material';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

type Props = {
  data: GetStatTotals['challengeCount'];
};

const ChallengeCompletionStats = ({ data }: Props) => {
  const theme = useTheme();

  const barOptions = useMemo(
    () => ({
      indexAxis: 'y' as const,
      responsive: true,
      scales: {
        x: {
          ticks: {
            stepSize: 1,
            color: theme.palette.text.primary,
          },
        },
        y: {
          ticks: {
            color: theme.palette.text.primary,
          },
        },
      },
    }),
    [theme.palette.text.primary],
  );

  if (
    Object.keys(data.dailies).length === 0 ||
    Object.keys(data.weeklies).length === 0
  ) {
    return <NoStatData />;
  }

  const labels = getUniqueElements([
    ...Object.keys(data.dailies),
    ...Object.keys(data.weeklies),
  ]).map(item => challengeTypes[item].shortTitle);

  return (
    <Bar
      options={barOptions}
      data={{
        labels,
        datasets: [
          {
            label: 'Dailies',
            data: Object.values(data.dailies),
            backgroundColor: theme.palette.primary.main,
          },
          {
            label: 'Weeklies',
            data: Object.values(data.weeklies),
            backgroundColor: theme.palette.secondary.main,
          },
        ],
      }}
    />
  );
};

export default ChallengeCompletionStats;
