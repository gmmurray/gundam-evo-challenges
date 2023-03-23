import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    medals: {
      gold: string;
      silver: string;
      bronze: string
    }
  }
  interface ThemeOptions {
    medals?: {
      gold?: string;
      silver?: string;
      bronze?: string
    }
  }
}

const getTheme = (prefersDarkMode: boolean) => {
  let theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
    medals: {
      gold: '#fcd55e',
      silver: '#b5b9c4',
      bronze: '#ec7e33'
    }
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default getTheme;
