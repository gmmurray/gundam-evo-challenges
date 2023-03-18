import { Button, Snackbar } from '@mui/material';
import React, { Fragment, PropsWithChildren, useCallback } from 'react';

import { useServiceWorker } from '../../hooks/useServiceWorker';

const ServiceWorkerWrapper = ({ children }: PropsWithChildren) => {
  const { canUpdate, onUpdateAppVersion } = useServiceWorker();

  const handleRefreshApp = useCallback(
    (viewChanges: boolean = false) => {
      if (!canUpdate) {
        return;
      }

      onUpdateAppVersion();
      if (viewChanges && typeof window !== 'undefined') {
        window.open('/changes', '_blank');
      }
    },
    [canUpdate, onUpdateAppVersion],
  );

  return (
    <Fragment>
      <Snackbar
        open={canUpdate}
        message="A new app version is available!"
        onClick={() => handleRefreshApp(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        action={
          <Fragment>
            <Button
              color="inherit"
              size="small"
              onClick={() => handleRefreshApp(false)}
            >
              Refresh
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={() => handleRefreshApp(true)}
            >
              Changes
            </Button>
          </Fragment>
        }
      />
      {children}
    </Fragment>
  );
};

export default ServiceWorkerWrapper;
