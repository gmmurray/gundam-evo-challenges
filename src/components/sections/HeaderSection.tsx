import { Badge, Box, Grid } from '@mui/material';
import { Fragment, useState } from 'react';

import Button from '@mui/material/Button';
import ManageUnitsDialog from '../units/ManageUnitsDialog';
import Typography from '@mui/material/Typography';
import { usePreferences } from '../../contexts/preferences/PreferencesContext';

const HeaderSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { onDialogToggle } = usePreferences();
  return (
    <Fragment>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
        >
          <Grid item xs={12} md="auto">
            <Typography variant="h3" component="h1">
              Gundam Evolution Challenges
            </Typography>
            <Typography variant="subtitle1">
              Keep track of your challenges until they add them in-game!
            </Typography>
          </Grid>
          <Grid
            item
            xs
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'start',
                md: 'end',
              },
              alignItems: 'center',
            }}
          >
            <Button onClick={() => setDialogOpen(true)}>Units</Button>
            <Badge badgeContent="New" color="secondary">
              <Button sx={{ ml: 1 }} onClick={() => onDialogToggle()}>
                Preferences
              </Button>
            </Badge>
          </Grid>
        </Grid>
      </Box>
      <ManageUnitsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Fragment>
  );
};

export default HeaderSection;
