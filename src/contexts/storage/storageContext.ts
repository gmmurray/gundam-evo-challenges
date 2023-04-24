import {
  ChallengeProgress,
  ChallengesStorageKey,
  defaultSummarySortOptions,
} from '../../types/challenges';
import { createContext, useContext } from 'react';

import { IUserPreferences } from '../../types/userPreferences';
import { IUserStats } from '../../types/userStats';
import { UnitGrouping } from '../../data/unitGroupings';

export type StorageContextType = {
  localStorage: {
    dailies: Record<number, ChallengeProgress>;
    weeklies: Record<number, ChallengeProgress>;
    userGroupings: UnitGrouping[];
    userPreferences: IUserPreferences;
    userStats: IUserStats;
  };
  updateChallenge: (
    type: ChallengesStorageKey,
    key: number,
    challenge?: ChallengeProgress,
  ) => void;
  resetChallenges: (type: ChallengesStorageKey) => void;
  updateUserGroupings: (grouping: UnitGrouping) => void;
  updatePreferences: (value: IUserPreferences) => void;
};

export const defaultStorageContext: StorageContextType = {
  localStorage: {
    dailies: {},
    weeklies: {},
    userGroupings: [],
    userPreferences: {
      list: {
        hideCompleted: false,
      },
      summary: {
        sortOptions: {
          ...defaultSummarySortOptions,
        },
      },
      theme: 'default',
    },
    userStats: {
      completedChallenges: [],
    },
  },
  updateChallenge: () => {},
  resetChallenges: () => {},
  updateUserGroupings: () => {},
  updatePreferences: () => {},
};

export const StorageContext = createContext(defaultStorageContext);

export const useStorageContext = () => useContext(StorageContext);
