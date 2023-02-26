import { Box, IconButton } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import { usePersonalDetailsContext } from '../../contexts/personal/PersonalDetailsContext';

const FooterSection = () => {
  const { showPersonalDetails } = usePersonalDetailsContext();
  const repoURL = process.env.REACT_APP_REPO_URL ?? undefined;
  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      {showPersonalDetails && repoURL && (
        <IconButton href={repoURL}>
          <GitHubIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default FooterSection;
