import { Box, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

type Props = {
  title: string;
} & PropsWithChildren;
const StatsSubSection = ({ title, children }: Props) => {
  return (
    <Box sx={{}}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Box
        sx={{
          my: 4,
          minHeight: '33vh',
          minWidth: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default StatsSubSection;
