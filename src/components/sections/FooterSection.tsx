import { Box, IconButton } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

const FooterSection = () => {
  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <IconButton href="https://github.com/gmmurray">
        <GitHubIcon />
      </IconButton>
    </Box>
  );
};

export default FooterSection;
