import { ChallengeProgress, ChallengeResetType } from '../../types/challenges';
import { createContext, useContext } from 'react';

import { UnitGrouping } from '../../data/unitGroupings';

export type DataContextValueType = {
  challengeData: {
    dailies: Record<number, ChallengeProgress>;
    weeklies: Record<number, ChallengeProgress>;
    userGroupings: UnitGrouping[];
  };
  updateChallenge: (
    type: ChallengeResetType,
    key: number,
    challenge?: ChallengeProgress,
  ) => void;
  resetChallenges: (type: ChallengeResetType) => void;
  updateUserGroupings: (grouping: UnitGrouping) => void;
};

export const defaultDataContextValue: DataContextValueType = {
  challengeData: { dailies: {}, weeklies: {}, userGroupings: [] },
  updateChallenge: () => {},
  resetChallenges: () => {},
  updateUserGroupings: () => {},
};

export const DataContext = createContext(defaultDataContextValue);

export const useDataContext = () => useContext(DataContext);
