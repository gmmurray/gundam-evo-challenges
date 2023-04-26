import React from 'react';
import { Typography } from '@mui/material';

const NoStatData = () => {
  return (
    <Typography
      variant="overline"
      sx={{ textAlign: 'center', color: 'text.secondary' }}
    >
      No data
    </Typography>
  );
};

export default NoStatData;
