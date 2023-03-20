import ChallengesSection from './ChallengesSection';
import { Divider } from '@mui/material';
import { Fragment } from 'react';
import RecommendationSection from './RecommendationSection';
import { useResets } from '../../hooks/useResets';

const ListSection = () => {
  const { daily, weekly } = useResets();
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default ListSection;
