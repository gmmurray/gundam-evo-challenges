import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Fragment, PropsWithChildren, useState } from 'react';
import { ViewUnitContext, ViewUnitContextType } from './viewUnitContext';
import { getUnitFullUrl, getUnitOfficialUrl } from '../../helpers/unitHelpers';

import DialogTitleWithClose from '../../components/material/DialogTitleWithClose';
import LaunchIcon from '@mui/icons-material/Launch';
import UnitAvatar from '../../components/units/UnitAvatar';

type Props = {} & PropsWithChildren;

const ViewUnitProvider = ({ children }: Props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [visibleUnit, setVisibleUnit] =
    useState<ViewUnitContextType['unit']>(undefined);

  const contextValue: ViewUnitContextType = {
    unit: visibleUnit,
    toggleUnit: setVisibleUnit,
  };

  return (
    <ViewUnitContext.Provider value={contextValue}>
      {children}
      <Dialog
        fullScreen={isSmallScreen}
        maxWidth="md"
        fullWidth
        open={!!visibleUnit}
        onClose={() => setVisibleUnit(undefined)}
      >
        {visibleUnit && (
          <Fragment>
            <DialogTitleWithClose
              title={visibleUnit.model}
              onClose={() => setVisibleUnit(undefined)}
            />
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <UnitAvatar unit={visibleUnit} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h3" sx={{ mb: 0, ml: 1 }}>
                        {visibleUnit.name}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="text"
                    endIcon={<LaunchIcon />}
                    href={getUnitOfficialUrl(visibleUnit)}
                    target="_blank"
                    rel="noopener"
                    sx={{ ml: -1 }}
                  >
                    Official Page
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md="auto"
                  sx={{
                    textAlign: {
                      xs: 'center',
                      md: 'left',
                    },
                  }}
                >
                  <img
                    src={getUnitFullUrl(visibleUnit)}
                    height="170"
                    width="185"
                    alt={`${visibleUnit.name} thumbnail`}
                  />
                </Grid>
                <Grid item xs={12} md>
                  <Paper
                    sx={{
                      borderRadius: theme => theme.shape.borderRadius,
                      p: 2,
                    }}
                  >
                    <Typography variant="body1">
                      {visibleUnit.description}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
          </Fragment>
        )}
      </Dialog>
    </ViewUnitContext.Provider>
  );
};

export default ViewUnitProvider;
