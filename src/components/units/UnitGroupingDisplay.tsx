import { Box, Grid } from '@mui/material';

import UnitAvatar from './UnitAvatar';
import { UnitGrouping } from '../../data/unitGroupings';
import { getUnitsFromGrouping } from '../../helpers/unitHelpers';

type Props = {
  grouping: UnitGrouping;
};

const UnitGroupingDisplay = ({ grouping }: Props) => {
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
              <UnitAvatar unit={unit} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default UnitGroupingDisplay;
