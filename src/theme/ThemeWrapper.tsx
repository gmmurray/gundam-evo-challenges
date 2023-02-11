import { ThemeProvider, useMediaQuery } from '@mui/material';

import { PropsWithChildren } from 'react';
import getTheme from './theme';

const ThemeWrapper = ({ children }: PropsWithChildren) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <ThemeProvider theme={getTheme(prefersDarkMode)}>{children}</ThemeProvider>
  );
};

export default ThemeWrapper;
