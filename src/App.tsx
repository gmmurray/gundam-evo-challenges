import ChallengesSection from './components/sections/ChallengesSection';
import { Container } from '@mui/system';
import Divider from '@mui/material/Divider';
import FooterSection from './components/sections/FooterSection';
import HeaderSection from './components/sections/HeaderSection';
import RecommendationSection from './components/sections/RecommendationSection';
import { useResets } from './hooks/useResets';

function App() {
  const { daily, weekly } = useResets();
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <HeaderSection />
      <RecommendationSection />
      <ChallengesSection
        title="Dailies"
        challengeCount={3}
        storageKey={'dailies'}
        nextReset={daily}
      />
      <Divider sx={{ my: 2 }} />
      <ChallengesSection
        title="Weeklies"
        challengeCount={6}
        storageKey={'weeklies'}
        nextReset={weekly}
      />
      <Divider sx={{ my: 2 }} />
      <FooterSection />
    </Container>
  );
}

export default App;
