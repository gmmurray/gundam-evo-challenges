import { useMemo } from 'react';
import { useTheme } from '@mui/material';

export const useBarConfig = () => {
  const theme = useTheme();

  const barConfig = useMemo(
    () => ({
      indexAxis: 'y' as const,
      responsive: true,
      scales: {
        x: {
          ticks: {
            stepSize: 1,
            color: theme.palette.text.primary,
          },
        },
        y: {
          ticks: {
            color: theme.palette.text.primary,
          },
        },
      },
    }),
    [theme.palette.text.primary],
  );

  return barConfig;
};
