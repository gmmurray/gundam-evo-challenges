import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Changes from './Changes';
import CssBaseline from '@mui/material/CssBaseline';
import PersonalDetailsProvider from './contexts/personal/PersonalDetailsProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecommendationProvider } from './contexts/recommendations/RecommendationContext';
import ServiceWorkerWrapper from './components/layout/ServiceWorkerWrapper';
import StorageProvider from './contexts/storage/StorageProvider';
import ThemeWrapper from './theme/ThemeWrapper';
import ViewUnitProvider from './contexts/viewUnit/ViewUnitProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeWrapper>
        <ServiceWorkerWrapper>
          <PersonalDetailsProvider>
            <CssBaseline />
            <StorageProvider>
              <RecommendationProvider>
                <ViewUnitProvider>
                  <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/changes" element={<Changes />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </ViewUnitProvider>
              </RecommendationProvider>
            </StorageProvider>
          </PersonalDetailsProvider>
        </ServiceWorkerWrapper>
      </ThemeWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);

serviceWorkerRegistration.register();
