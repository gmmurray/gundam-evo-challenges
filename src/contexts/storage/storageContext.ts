import {
  ChallengeProgress,
  ChallengesStorageKey,
} from '../../types/challenges';
import { createContext, useContext } from 'react';

import { UnitGrouping } from '../../data/unitGroupings';
import { specialThemeDefinitions } from '../../theme/theme';

export type StorageContextType = {
  localStorage: {
    dailies: Record<number, ChallengeProgress>;
    weeklies: Record<number, ChallengeProgress>;
    userGroupings: UnitGrouping[];
    theme: keyof typeof specialThemeDefinitions;
  };
  updateChallenge: (
    type: ChallengesStorageKey,
    key: number,
    challenge?: ChallengeProgress,
  ) => void;
  resetChallenges: (type: ChallengesStorageKey) => void;
  updateUserGroupings: (grouping: UnitGrouping) => void;
  updateTheme: (newTheme: keyof typeof specialThemeDefinitions) => void;
};

export const defaultStorageContext: StorageContextType = {
  localStorage: {
    dailies: {},
    weeklies: {},
    userGroupings: [],
    theme: 'default',
  },
  updateChallenge: () => {},
  resetChallenges: () => {},
  updateUserGroupings: () => {},
  updateTheme: () => {},
};

export const StorageContext = createContext(defaultStorageContext);

export const useStorageContext = () => useContext(StorageContext);
