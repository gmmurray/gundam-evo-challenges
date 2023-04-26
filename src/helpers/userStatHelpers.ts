import { IUserStats } from '../types/userStats';

type GetStatTotals = {
  challengeCount: Record<string, number>; // # of each challenge
  challengeProgress: Record<string, number>; // # of kills/revives/etc (daily quantity / weekly quantity)
  units: Record<string, number>;
};

export const getStatTotals = (
  challenges: IUserStats['completedChallenges'],
): GetStatTotals => {
  let results: GetStatTotals = {
    challengeCount: {},
    challengeProgress: {},
    units: {},
  };
  challenges.forEach(c => {
    if (!results.challengeCount[c.type]) {
      results.challengeCount[c.type] = 0;
      results.challengeProgress[c.type] = 0;
    }
    results.challengeCount[c.type] += 1;
    results.challengeProgress[c.type] += c.total;

    c.grouping.forEach(g => {
      if (!results.units[g]) {
        results.units[g] = 0;
      }
      results.units[g] += 1;
    });
  });
  return results;
};
