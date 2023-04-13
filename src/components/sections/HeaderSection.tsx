import { Badge, Box, Grid } from '@mui/material';
import { Fragment, useState } from 'react';

import Button from '@mui/material/Button';
import ManageUnitsDialog from '../units/ManageUnitsDialog';
import ThemeMenu from '../theme/ThemeMenu';
import Typography from '@mui/material/Typography';

const HeaderSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<
    HTMLElement | undefined
  >(undefined);
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
            <Badge badgeContent="New" color="primary">
              <Button onClick={e => setThemeMenuAnchor(e.currentTarget)}>
                Theme
              </Button>
            </Badge>
            <Button sx={{ ml: 1 }} onClick={() => setDialogOpen(true)}>
              Units
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ManageUnitsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <ThemeMenu
        open={!!themeMenuAnchor}
        anchorEl={themeMenuAnchor}
        onClose={() => setThemeMenuAnchor(undefined)}
      />
    </Fragment>
  );
};

export default HeaderSection;
