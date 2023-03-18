import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Changes from './Changes';
import CssBaseline from '@mui/material/CssBaseline';
import PersonalDetailsProvider from './contexts/personal/PersonalDetailsProvider';
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
        <PersonalDetailsProvider>
          <CssBaseline />
          <StorageProvider>
            <ViewUnitProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/changes" element={<Changes />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </BrowserRouter>
            </ViewUnitProvider>
          </StorageProvider>
        </PersonalDetailsProvider>
      </ServiceWorkerWrapper>
    </ThemeWrapper>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
