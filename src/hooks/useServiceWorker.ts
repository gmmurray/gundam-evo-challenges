import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

import { useCallback, useEffect, useState } from 'react';

export const useServiceWorker = () => {
  const [canUpdate, setCanUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );

  const onSwUpdate = useCallback((registration: ServiceWorkerRegistration) => {
    setCanUpdate(true);
    setWaitingWorker(registration.waiting);
  }, []);

  const onUpdateAppVersion = useCallback(() => {
    if (!waitingWorker) {
      return;
    }
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    setCanUpdate(false);
    window.location.reload();
  }, [waitingWorker]);

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSwUpdate });
  });

  return {
    canUpdate,
    onUpdateAppVersion,
  };
};
