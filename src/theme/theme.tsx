import { createTheme, responsiveFontSizes } from '@mui/material';

const getTheme = (prefersDarkMode: boolean) => {
  let theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default getTheme;
