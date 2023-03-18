import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Remark } from 'react-remark';

export const loadMarkdown = async () => {
  let markdownString = '';
  try {
    // @ts-ignore
    const file = await import('./CHANGELOG.md');

    if (file) {
      const res = await fetch(file.default);
      markdownString = await res.text();
    }
  } catch (error) {
    console.log('error loading changelog markdown file');
  }

  return markdownString;
};

const Changes = () => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const getMarkdown = async () => {
      setMarkdownContent(await loadMarkdown());
    };
    getMarkdown();
  }, []);
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h3" component="h1">
              Changes
            </Typography>
          </Box>
          <Button sx={{ ml: 'auto' }} component={Link} to="/">
            Home
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
      </Box>
      <Remark>{markdownContent}</Remark>
    </Container>
  );
};

export default Changes;
