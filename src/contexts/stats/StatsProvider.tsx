import React, { PropsWithChildren, createContext, useContext } from 'react';

import { IUserStats } from '../../types/userStats';
import { useStorageContext } from '../storage/storageContext';

type StatsContextValue = {
  completedChallenges: IUserStats['completedChallenges'];
};

export const defaultStatsContextValue: StatsContextValue = {
  completedChallenges: [],
};

export const StatsContext = createContext<StatsContextValue>(
  defaultStatsContextValue,
);

export const useStats = () => useContext(StatsContext);

type Props = {} & PropsWithChildren;

const StatsProvider = ({ children }: Props) => {
  const {
    localStorage: { userStats },
  } = useStorageContext();

  const contextValue: StatsContextValue = {
    completedChallenges: userStats.completedChallenges,
  };

  return (
    <StatsContext.Provider value={contextValue}>
      {children}
    </StatsContext.Provider>
  );
};

export default StatsProvider;
