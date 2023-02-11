import { Fragment, useState } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ManageUnitsDialog from '../units/ManageUnitsDialog';
import Typography from '@mui/material/Typography';

const HeaderSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Fragment>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h3" component="h1">
              Gundam Evolution Challenges
            </Typography>
            <Typography variant="subtitle1">
              Keep track of your challenges until they add them in-game!
            </Typography>
          </Box>
          <Button sx={{ ml: 'auto' }} onClick={() => setDialogOpen(true)}>
            Units
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
      </Box>
      <ManageUnitsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Fragment>
  );
};

export default HeaderSection;
