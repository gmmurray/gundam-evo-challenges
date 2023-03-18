import { Box, Button, IconButton } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { usePersonalDetailsContext } from '../../contexts/personal/PersonalDetailsContext';

const FooterSection = () => {
  const { showPersonalDetails } = usePersonalDetailsContext();
  const repoURL = process.env.REACT_APP_REPO_URL ?? undefined;
  return (
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
    </Box>
  );
};

export default FooterSection;
