import { Box, Dialog, DialogContent } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { firebaseAuth, firebaseUiConfig } from '../../config/firebase';

import Button from '@mui/material/Button';
import DialogTitleWithClose from '../material/DialogTitleWithClose';
import Divider from '@mui/material/Divider';
import ManageUnitsDialog from '../units/ManageUnitsDialog';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../contexts/auth/AuthContext';

const HeaderSection = () => {
  const { user } = useAuthContext();
  const [unitsDialogOpen, setUnitsDialogOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setLoginDialogOpen(false);
    }
  }, [user]);
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
          <Box sx={{ ml: 'auto' }}>
            {user && (
              <Button onClick={() => firebaseAuth.signOut()}>Log out</Button>
            )}
            {!user && (
              <Button onClick={() => setLoginDialogOpen(true)}>Login</Button>
            )}
          </Box>
        </Box>
        <Box>
          <Button sx={{}} onClick={() => setUnitsDialogOpen(true)}>
            Units
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
      </Box>
      <Dialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitleWithClose
          title="Sign in or sign up below"
          onClose={() => setLoginDialogOpen(false)}
        />
        <DialogContent>
          <Typography variant="caption">
            Signing up for this app will allow you to automatically save your
            progress in the cloud! This means you can access your progress
            across devices easily.{' '}
            <b>
              If you have already created an account, signing in will replace
              your local data with your saved data.
            </b>
          </Typography>
          <StyledFirebaseAuth
            uiConfig={firebaseUiConfig}
            firebaseAuth={firebaseAuth}
          />
        </DialogContent>
      </Dialog>
      <ManageUnitsDialog
        open={unitsDialogOpen}
        onClose={() => setUnitsDialogOpen(false)}
      />
    </Fragment>
  );
};

export default HeaderSection;
