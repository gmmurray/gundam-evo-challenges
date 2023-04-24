import React, { PropsWithChildren } from 'react';

import { IUserStats } from '../../types/userStats';

type StatsContextValue = {
  completedChallenges: IUserStats;
};

type Props = {} & PropsWithChildren;

const StatsProvider = ({ children }: Props) => {
  return <div>StatsProvider</div>;
};

export default StatsProvider;
