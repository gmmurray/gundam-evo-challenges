import {
  Box,
  Grid,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from '@mui/material';

const LinearProgressWithLabel = (
  props: LinearProgressProps & { numerator: number; denominator: number },
) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress
            variant="determinate"
            {...props}
            value={(props.numerator / props.denominator) * 100}
          />
        </Box>
      </Grid>
      <Grid item xs="auto" sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="overline"
          color="text.secondary"
        >{`${props.numerator.toLocaleString()}/${props.denominator.toLocaleString()}`}</Typography>
      </Grid>
    </Grid>
  );
};
export default LinearProgressWithLabel;
