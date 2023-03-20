import { Box, Fade, Grid, Paper, Typography } from '@mui/material';

import { ChallengeSummary } from '../../types/challenges';
import LinearProgressWithLabel from '../material/LinearProgressWithLabel';
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
      <Paper sx={{ my: 1, p: 2 }}>
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
            {Object.keys(summary).map(key => {
              const { progress, total } = summary[key];
              const { title } = challengeTypes[key];

              return (
                <Box
                  sx={{ display: 'flex', flexDirection: 'column' }}
                  key={key}
                >
                  <Typography variant="body1" sx={{ lineHeight: 'unset' }}>
                    {title}
                  </Typography>
                  <LinearProgressWithLabel
                    numerator={progress}
                    denominator={total}
                  />
                </Box>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
};

export default UnitSummary;
