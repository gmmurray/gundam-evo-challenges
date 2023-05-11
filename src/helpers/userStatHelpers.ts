import { ChallengesStorageKey } from '../types/challenges';
import { IUserStats } from '../types/userStats';

export type GetStatTotals = {
  challengeCount: Record<ChallengesStorageKey, Record<string, number>>;
  challengeProgress: Record<string, number>;
  units: Record<ChallengesStorageKey, Record<string, number>>;
};

export const getStatTotals = (
  challenges: IUserStats['completedChallenges'],
): GetStatTotals => {
  let results: GetStatTotals = {
    challengeCount: {
      dailies: {},
      weeklies: {},
    },
    challengeProgress: {},
    units: {
      dailies: {},
      weeklies: {},
    },
  };
  challenges.forEach(c => {
    if (!results.challengeCount[c.reset][c.type]) {
      results.challengeCount[c.reset][c.type] = 0;
    }
    if (!results.challengeProgress[c.type]) {
      results.challengeProgress[c.type] = 0;
    }
    results.challengeCount[c.reset][c.type] += 1;
    results.challengeProgress[c.type] += c.total;

    c.grouping.forEach(g => {
      if (!results.units[c.reset][g]) {
        results.units[c.reset][g] = 0;
      }
      results.units[c.reset][g] += 1;
    });
  });
  return results;
};
