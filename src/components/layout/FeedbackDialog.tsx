import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';

import DialogTitleWithClose from '../material/DialogTitleWithClose';
import { LoadingButton } from '@mui/lab';
import { saveFeedback } from '../../helpers/feedbackHelpers';

type Props = {
  open: boolean;
  onClose: () => void;
};

const FeedbackDialog = ({ open, onClose }: Props) => {
  const [feedbackValue, setFeedbackValue] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const handleSubmit = useCallback(async () => {
    if (feedbackValue === '') {
      return;
    }
    setSubmitError(undefined);
    setSubmitLoading(true);
    try {
      await saveFeedback(feedbackValue);
      setFeedbackValue('');
      onClose();
    } catch (error) {
      setSubmitError('Error saving your response, please try again');
    } finally {
      setSubmitLoading(false);
    }
  }, [feedbackValue, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitleWithClose title="Feedback" onClose={onClose} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              Any feedback is appreciated, especially if something (challenges,
              units) is missing from the app
            </Typography>
          </Grid>
          {!!submitError && (
            <Grid item xs={12}>
              <Alert variant="outlined" color="error" title="Error">
                {submitError}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={feedbackValue}
              onChange={e => setFeedbackValue(e.target.value)}
              multiline
              minRows={3}
              label="Comments"
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={submitLoading}
              disabled={feedbackValue === ''}
              onClick={handleSubmit}
            >
              Save
            </LoadingButton>
            <Button disabled={submitLoading} color="inherit" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
