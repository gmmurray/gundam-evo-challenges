import React from 'react';
import { Typography } from '@mui/material';

const NoStatData = () => {
  return (
    <Typography
      variant="overline"
      sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}
    >
      No data
    </Typography>
  );
};

export default NoStatData;
