import {
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { Fragment, useMemo } from 'react';

import { Bar } from 'react-chartjs-2';
import ChallengeCompletionStats from '../stats/ChallengeCompletionStats';
import ChallengeDetailStats from '../stats/ChallengeDetailStats';
import StatsSubSection from '../stats/StatsSubSection';
import { getStatTotals } from '../../helpers/userStatHelpers';
import { useStats } from '../../contexts/stats/StatsProvider';
import { useTheme } from '@mui/material';

Chart.register(CategoryScale, LinearScale, BarElement);

const getOptions = (fontColor: string) => ({
  indexAxis: 'y' as const,
  responsive: true,
  scales: {
    x: {
      ticks: {
        stepSize: 1,
        color: fontColor,
      },
    },
    y: {
      ticks: {
        color: fontColor,
      },
    },
  },
});

const StatsSection = () => {
  const theme = useTheme();
  const { completedChallenges } = useStats();

  const statTotals = useMemo(
    () => getStatTotals(completedChallenges),
    [completedChallenges],
  );

  return (
    <Fragment>
      <StatsSubSection title="Challenge Completion">
        <ChallengeCompletionStats data={statTotals.challengeCount} />
      </StatsSubSection>
      <StatsSubSection title="Challenge Progress">
        <ChallengeDetailStats data={statTotals.challengeProgress} />
      </StatsSubSection>
    </Fragment>
    // <div style={{ display: 'flex', flexDirection: 'row' }}>
    //   <div>
    //     <h3>challenge types completed</h3>
    //     <div>
    //       <Bar
    //         options={getOptions(theme.palette.text.primary)}
    //         data={{
    //           labels: Object.keys(statTotals.challengeCount),
    //           datasets: [
    //             {
    //               data: Object.values(statTotals.challengeCount),
    //               backgroundColor: theme.palette.primary.main,
    //             },
    //           ],
    //         }}
    //       />
    //     </div>
    //     <ul>
    //       {Object.entries(statTotals.challengeCount)
    //         .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    //         .map(entry => (
    //           <li key={entry[0]}>
    //             {entry[0]}: {entry[1]}
    //           </li>
    //         ))}
    //     </ul>
    //     <h3>challenge metrics</h3>
    //     <ul>
    //       {Object.entries(statTotals.challengeProgress)
    //         .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    //         .map(entry => (
    //           <li key={entry[0]}>
    //             {entry[0]}: {entry[1]}
    //           </li>
    //         ))}
    //     </ul>
    //     <h3>unit counts</h3>
    //     <Bar
    //       options={getOptions(theme.palette.text.primary)}
    //       data={{
    //         labels: Object.keys(statTotals.units),
    //         datasets: [
    //           {
    //             data: Object.values(statTotals.units),
    //             backgroundColor: theme.palette.primary.main,
    //           },
    //         ],
    //       }}
    //     />
    //     <ul>
    //       {Object.entries(statTotals.units)
    //         .sort((a, b) => (a[1] > b[1] ? -1 : 1))
    //         .map(entry => (
    //           <li key={entry[0]}>
    //             {entry[0]}: {entry[1]}
    //           </li>
    //         ))}
    //     </ul>
    //   </div>
    // </div>
  );
};

export default StatsSection;
