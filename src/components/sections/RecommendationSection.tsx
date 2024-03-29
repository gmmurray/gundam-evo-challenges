import { Box, Fade, Grid, Paper, Typography } from '@mui/material';

import RecommendedUnitDisplay from '../units/RecommendedUnitDisplay';
import { useRecommendationContext } from '../../contexts/recommendations/RecommendationContext';

const RecommendationSection = () => {
  const { recommendations } = useRecommendationContext();

  return (
    <Fade in={recommendations.length > 0} timeout={500} unmountOnExit>
      <Paper
        sx={{
          my: 2,
          py: 1,
          px: 2,
          backgroundColor: theme => theme.palette.secondary.dark,
        }}
      >
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'center',
                md: 'start',
              },
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{ alignSelf: 'center' }}
            >
              Recommended Unit(s)
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto" sx={{ ml: 'auto' }}>
            <Grid container spacing={1}>
              {recommendations.map((group, index) => {
                return (
                  <Grid item key={index} xs>
                    <RecommendedUnitDisplay
                      count={group.challenges}
                      units={group.units}
                      position={index}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box></Box>
          <Box sx={{ ml: 'auto' }}></Box>
        </Box>
      </Paper>
    </Fade>
  );
};

export default RecommendationSection;
