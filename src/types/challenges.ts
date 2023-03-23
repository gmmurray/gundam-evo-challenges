import { UnitGrouping } from '../data/unitGroupings';

export type ChallengeProgress = {
  type: string;
  progress: number;
  total: number;
  grouping: UnitGrouping;
};

export type ChallengeType = {
  title: string;
  updateProgress: (prev: number, total: number, isIncrement: boolean) => number;
  options: number[];
};

export type ChallengesStorageKey = 'dailies' | 'weeklies';

export type ChallengeSummary = Record<
  string,
  {
    progress: number;
    total: number;
  }
>;

export type UnitChallengeSummary = Record<string, ChallengeSummary>;
