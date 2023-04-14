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
  shortTitle: string;
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

export type UnitSummaryRecord = {
  unitId: string;
  summary: ChallengeSummary;
};

export type SummarySortOptions = {
  sort: 'name' | 'challengeCount';
  order: 'asc' | 'desc';
};

export const defaultSummarySortOptions: SummarySortOptions = {
  sort: 'challengeCount',
  order: 'desc',
};
