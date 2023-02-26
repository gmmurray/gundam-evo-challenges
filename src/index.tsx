import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ServiceWorkerWrapper from './components/layout/ServiceWorkerWrapper';
import StorageProvider from './contexts/storage/StorageProvider';
import ThemeWrapper from './theme/ThemeWrapper';
import ViewUnitProvider from './contexts/viewUnit/ViewUnitProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeWrapper>
      <ServiceWorkerWrapper>
        <CssBaseline />
        <StorageProvider>
          <ViewUnitProvider>
            <App />
          </ViewUnitProvider>
        </StorageProvider>
      </ServiceWorkerWrapper>
    </ThemeWrapper>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
