import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import React, { Fragment } from 'react';

import App from './App';
import { AuthContextProvider } from './contexts/auth/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';
import DataContextProvider from './contexts/data/DataProvider';
import PersonalDetailsProvider from './contexts/personal/PersonalDetailsProvider';
import ReactDOM from 'react-dom/client';
import ServiceWorkerWrapper from './components/layout/ServiceWorkerWrapper';
import ThemeWrapper from './theme/ThemeWrapper';
import ViewUnitProvider from './contexts/viewUnit/ViewUnitProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Fragment>
    <ThemeWrapper>
      <ServiceWorkerWrapper>
        <PersonalDetailsProvider>
          <CssBaseline />
          <AuthContextProvider>
            <DataContextProvider>
              <ViewUnitProvider>
                <App />
              </ViewUnitProvider>
            </DataContextProvider>
          </AuthContextProvider>
        </PersonalDetailsProvider>
      </ServiceWorkerWrapper>
    </ThemeWrapper>
  </Fragment>,
);

serviceWorkerRegistration.register();
