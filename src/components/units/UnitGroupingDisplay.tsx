import { Box, Grid } from '@mui/material';

import { RecommendationContextValue } from '../../contexts/recommendations/RecommendationContext';
import UnitAvatar from './UnitAvatar';
import { UnitGrouping } from '../../data/unitGroupings';
import { getUnitsFromGrouping } from '../../helpers/unitHelpers';

type Props = {
  grouping: UnitGrouping;
  viewEnabled?: boolean;
  recommendations?: RecommendationContextValue['recommendations'];
};

const UnitGroupingDisplay = ({
  grouping,
  viewEnabled = false,
  recommendations = [],
}: Props) => {
  const units = getUnitsFromGrouping(grouping);

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container sx={{ justifyContent: 'space-around' }}>
        {units.map(unit => {
          return (
            <Grid
              key={unit.id}
              item
              sx={{
                display: 'flex',
                justfiyContent: 'center',
                textAlign: 'center',
              }}
            >
              <UnitAvatar
                unit={unit}
                viewEnabled={viewEnabled}
                recommendationPosition={recommendations.findIndex(rec =>
                  rec.units.includes(unit.id),
                )}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default UnitGroupingDisplay;
