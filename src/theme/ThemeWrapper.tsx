import { ThemeProvider, useMediaQuery } from '@mui/material';

import { PropsWithChildren } from 'react';
import getTheme from './theme';
import { useStorageContext } from '../contexts/storage/storageContext';

const ThemeWrapper = ({ children }: PropsWithChildren) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { localStorage: storage } = useStorageContext();
  return (
    <ThemeProvider theme={getTheme(prefersDarkMode, storage.theme)}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
