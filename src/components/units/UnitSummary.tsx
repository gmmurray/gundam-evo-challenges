import { Fade, Grid, LinearProgress, Paper, Typography } from '@mui/material';

import { ChallengeSummary } from '../../types/challenges';
import UnitAvatar from './UnitAvatar';
import { challengeTypes } from '../../data/challengeTypes';
import { unitOptions } from '../../data/units';

type Props = {
  unitId: string;
  summary: ChallengeSummary;
};

const UnitSummary = ({ unitId, summary }: Props) => {
  return (
    <Fade in timeout={250}>
      <Paper
        sx={{ height: '100%', p: 2, display: 'flex', alignItems: 'center' }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md="auto"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UnitAvatar unit={unitOptions[unitId]} viewEnabled size="large" />
          </Grid>
          <Grid
            item
            xs={12}
            md
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {Object.keys(summary)
              // sort challenge types for a single unit first by completion %, then by name
              .sort((a, b) => {
                const { progress: progressA, total: totalA } = summary[a];
                const { progress: progressB, total: totalB } = summary[b];

                if (progressA / totalA > progressB / totalB) {
                  return -1;
                } else if (progressB / totalB > progressA / totalA) {
                  return 1;
                } else {
                  return challengeTypes[a].shortTitle >
                    challengeTypes[b].shortTitle
                    ? 1
                    : -1;
                }
              })
              .map(key => {
                const { progress, total } = summary[key];
                const { shortTitle } = challengeTypes[key];

                return (
                  <Grid container key={key}>
                    <Grid item xs>
                      <Typography variant="body1" sx={{ lineHeight: 'unset' }}>
                        {shortTitle}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs="auto"
                      sx={{ display: 'flex', justifyContent: 'end' }}
                    >
                      <Typography variant="body2">
                        {progress.toLocaleString()} / {total.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(progress / total) * 100}
                      />
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
};

export default UnitSummary;
