import { Box, IconButton } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import { usePersonalDetailsContext } from '../../contexts/personal/PersonalDetailsContext';

const FooterSection = () => {
  const { showPersonalDetails } = usePersonalDetailsContext();
  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      {showPersonalDetails && (
        <IconButton href="https://github.com/gmmurray/gundam-evo-challenges">
          <GitHubIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default FooterSection;
