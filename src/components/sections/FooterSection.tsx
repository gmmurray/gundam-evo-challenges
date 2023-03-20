import { Box, Button, IconButton } from '@mui/material';
import { Fragment, useState } from 'react';

import FeedbackDialog from '../layout/FeedbackDialog';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { usePersonalDetailsContext } from '../../contexts/personal/PersonalDetailsContext';

const FooterSection = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { showPersonalDetails } = usePersonalDetailsContext();
  const repoURL = process.env.REACT_APP_REPO_URL ?? undefined;

  return (
    <Fragment>
      <Box
        sx={{
          textAlign: 'center',
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {showPersonalDetails && repoURL && (
          <Box sx={{ mb: 2 }}>
            <IconButton href={repoURL}>
              <GitHubIcon />
            </IconButton>
          </Box>
        )}
        <Box>
          <Button component={Link} to="/changes" color="inherit">
            Changes
          </Button>
        </Box>
        <Box>
          <Button onClick={() => setFeedbackOpen(true)} color="inherit">
            Feedback
          </Button>
        </Box>
      </Box>
      <FeedbackDialog
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />
    </Fragment>
  );
};

export default FooterSection;
