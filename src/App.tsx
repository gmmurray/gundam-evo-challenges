import { Badge, Box, Fade, Tab } from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
import FooterSection from './components/sections/FooterSection';
import HeaderSection from './components/sections/HeaderSection';
import ListSection from './components/sections/ListSection';
import { RecommendationProvider } from './contexts/recommendations/RecommendationContext';
import SummaryProvider from './contexts/summary/SummaryContext';
import SummarySection from './components/sections/SummarySection';

function App() {
  const [currentTab, setCurrentTab] = useState('1');

  const handleTabChange = useCallback(
    (event: SyntheticEvent, newValue: string) => setCurrentTab(newValue),
    [],
  );

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <HeaderSection />
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb:2 }}>
          <TabList
            onChange={handleTabChange}
            sx={{ '& .MuiTabs-flexContainer': { paddingTop: 2 } }}
          >
            <Tab label="List" value="1" />
            <Tab
              label="Summary"
              value="2"
              component={Badge}
              badgeContent="New"
              color="primary"
              sx={{ overflow: 'visible' }}
            />
          </TabList>
        </Box>
        <RecommendationProvider>
          <TabPanel value="1" sx={{ p: 0 }}>
            <Fade in={currentTab === '1'} timeout={500}>
              <Box>
                <ListSection />
              </Box>
            </Fade>
          </TabPanel>
        </RecommendationProvider>
        <SummaryProvider>
          <TabPanel value="2">
            <Fade in={currentTab === '2'} timeout={500}>
              <Box>
                <SummarySection />
              </Box>
            </Fade>
          </TabPanel>
        </SummaryProvider>
      </TabContext>
      <Divider sx={{ my: 2 }} />
      <FooterSection />
    </Container>
  );
}

export default App;
