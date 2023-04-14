import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    medals: {
      gold: string;
      silver: string;
      bronze: string;
    };
  }
  interface ThemeOptions {
    medals?: {
      gold?: string;
      silver?: string;
      bronze?: string;
    };
  }
}

export const userThemeDefinitions = {
  default: {
    title: 'Default',
    short: 'Default',
  },
  efsf: {
    title: 'Earth Federation Space Force',
    short: 'E.F.S.F',
  },
  efsfDark: {
    title: 'Earth Federation Space Force',
    short: 'E.F.S.F (dark)',
  },
  zeon: {
    title: 'Zeon',
    short: 'Zeon',
  },
  zeonDark: {
    title: 'Zeon',
    short: 'Zeon (dark)',
  },
} as const;

export type UserThemeKey = keyof typeof userThemeDefinitions;

const getDefaultTheme = (prefersDarkMode: boolean): ThemeOptions => ({
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
  },
  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //       body {
  //         background-color: white;
  //       }
  //     `,
  //   },
  // },
});

const efsfTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#2139b1',
    },
    background: {
      paper: '#fdd000',
    },
  },
};

const efsfDarkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#fdd000',
    },
    background: {
      paper: '#2139b1',
    },
  },
};

const zeonTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#000',
    },
    background: {
      default: '#800000',
      paper: '#000',
    },
  },
};

const zeonDarkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#800000',
    },
    background: {
      default: '#000',
      paper: '#800000',
    },
  },
};

const userThemes = {
  default: getDefaultTheme(true),
  efsf: efsfTheme,
  efsfDark: efsfDarkTheme,
  zeon: zeonTheme,
  zeonDark: zeonDarkTheme,
};

const getCustomTheme = (
  prefersDarkMode: boolean,
  currentTheme: UserThemeKey,
): ThemeOptions => {
  return userThemes[currentTheme] ?? getDefaultTheme(prefersDarkMode);
};

const getTheme = (
  prefersDarkMode: boolean,
  currentTheme: UserThemeKey = 'default',
) => {
  let theme = createTheme({
    ...getCustomTheme(prefersDarkMode, currentTheme),
    medals: {
      gold: '#fcd55e',
      silver: '#b5b9c4',
      bronze: '#ec7e33',
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default getTheme;
