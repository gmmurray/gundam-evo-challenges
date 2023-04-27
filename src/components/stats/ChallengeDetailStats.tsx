import { Grid, Paper, Typography } from '@mui/material';

import { GetStatTotals } from '../../helpers/userStatHelpers';
import StatsSubSection from './StatsSubSection';
import { challengeTypes } from '../../data/challengeTypes';

type Props = {
  data: GetStatTotals['challengeProgress'];
};

const ChallengeDetailStats = ({ data }: Props) => {
  const dataPoints = Object.entries(data)
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(entry => ({
      title: challengeTypes[entry[0]].shortTitle,
      value: entry[1],
    }));
  return (
    <StatsSubSection title="Challenge Totals">
      <Grid container spacing={2}>
        {dataPoints.map((dp, index) => {
          return (
            <Grid item xs={6} md={3} key={index}>
              <DataPoint key={index} {...dp} />
            </Grid>
          );
        })}
      </Grid>
    </StatsSubSection>
  );
};

export default ChallengeDetailStats;

type DataPointProps = {
  title: string;
  value: number;
};
const DataPoint = ({ title, value }: DataPointProps) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
        justifyContent: 'center',
        height: '100%',
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {title}
      </Typography>
      <Typography variant="h6">{value.toLocaleString()}</Typography>
    </Paper>
  );
};
