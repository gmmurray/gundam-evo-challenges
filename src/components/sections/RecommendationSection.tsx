import { Box, Fade, Grid, Paper, Typography } from '@mui/material';

import UnitGroupingDisplay from '../units/UnitGroupingDisplay';
import { useRecommendationContext } from '../../contexts/recommendations/RecommendationContext';

const RecommendationSection = () => {
  const { recommendations } = useRecommendationContext();

  return (
    <Fade in={recommendations.length > 0} timeout={500} unmountOnExit>
      <Paper sx={{ m: 2, py: 1, px: 2 }}>
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
            <UnitGroupingDisplay
              grouping={recommendations}
              recommendations={recommendations}
              viewEnabled
            />
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
