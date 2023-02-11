import ChallengesSection from './components/sections/ChallengesSection';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
import FooterSection from './components/sections/FooterSection';
import HeaderSection from './components/sections/HeaderSection';

function App() {
  return (
    <Container maxWidth="md">
      <HeaderSection />
      <ChallengesSection
        title="Dailies"
        challengePoints={100}
        challengeCount={3}
        storageKey={'dailies'}
      />
      <Divider sx={{ my: 2 }} />
      <ChallengesSection
        title="Weeklies"
        challengePoints={600}
        challengeCount={6}
        storageKey={'weeklies'}
      />
      <Divider sx={{ my: 2 }} />
      <FooterSection />
    </Container>
  );
}

export default App;
