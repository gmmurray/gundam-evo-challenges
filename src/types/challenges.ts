import { UnitGrouping } from '../data/unitGroupings';

export type ChallengeProgress = {
  type: string;
  progress: number;
  total: number;
  grouping: UnitGrouping;
};

export type ChallengeType = {
  title: string;
  increment: (prev: number, total: number) => number;
  options: number[];
};

export type ChallengesStorageKey = 'dailies' | 'weeklies';
