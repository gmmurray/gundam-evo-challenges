import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';

const LinearProgressWithLabel = (
  props: LinearProgressProps & { numerator: number; denominator: number },
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          value={(props.numerator / props.denominator) * 100}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${props.numerator.toLocaleString()}/${props.denominator.toLocaleString()}`}</Typography>
      </Box>
    </Box>
  );
};
export default LinearProgressWithLabel;
