import { Button, Snackbar } from '@mui/material';
import React, { Fragment, PropsWithChildren, useCallback } from 'react';

import { useServiceWorker } from '../../hooks/useServiceWorker';

const ServiceWorkerWrapper = ({ children }: PropsWithChildren) => {
  const { canUpdate, onUpdateAppVersion } = useServiceWorker();

  const handleRefreshApp = useCallback(() => {
    if (!canUpdate) {
      return;
    }

    onUpdateAppVersion();
  }, [canUpdate, onUpdateAppVersion]);

  return (
    <Fragment>
      <Snackbar
        open={canUpdate}
        message="A new app version is available!"
        onClick={handleRefreshApp}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        action={
          <Button color="inherit" size="small" onClick={handleRefreshApp}>
            Refresh
          </Button>
        }
      />
      {children}
    </Fragment>
  );
};

export default ServiceWorkerWrapper;
