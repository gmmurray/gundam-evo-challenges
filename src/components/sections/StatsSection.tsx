import { Fragment, useMemo } from 'react';

import ChallengeCompletionStats from '../stats/ChallengeCompletionStats';
import ChallengeDetailStats from '../stats/ChallengeDetailStats';
import UnitChallengeStats from '../stats/UnitChallengeStats';
import { getStatTotals } from '../../helpers/userStatHelpers';
import { useStats } from '../../contexts/stats/StatsProvider';

const StatsSection = () => {
  const { completedChallenges } = useStats();

  const statTotals = useMemo(
    () => getStatTotals(completedChallenges),
    [completedChallenges],
  );

  return (
    <Fragment>
      <ChallengeCompletionStats data={statTotals.challengeCount} />
      <ChallengeDetailStats data={statTotals.challengeProgress} />
      <UnitChallengeStats data={statTotals.units} />
    </Fragment>
  );
};

export default StatsSection;
