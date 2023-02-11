import {
  ChallengeProgress,
  ChallengesStorageKey,
} from '../../types/challenges';
import { createContext, useContext } from 'react';

import { UnitGrouping } from '../../data/unitGroupings';

export type StorageContextType = {
  localStorage: {
    dailies: Record<number, ChallengeProgress>;
    weeklies: Record<number, ChallengeProgress>;
    userGroupings: UnitGrouping[];
  };
  updateChallenge: (
    type: ChallengesStorageKey,
    key: number,
    challenge?: ChallengeProgress,
  ) => void;
  resetChallenges: (type: ChallengesStorageKey) => void;
  updateUserGroupings: (grouping: UnitGrouping) => void;
};

export const defaultStorageContext: StorageContextType = {
  localStorage: { dailies: {}, weeklies: {}, userGroupings: [] },
  updateChallenge: () => {},
  resetChallenges: () => {},
  updateUserGroupings: () => {},
};

export const StorageContext = createContext(defaultStorageContext);

export const useStorageContext = () => useContext(StorageContext);
