import {
  ChallengeProgress,
  ChallengesStorageKey,
  UnitChallengeSummary,
} from '../types/challenges';

import { challengeTypes } from '../data/challengeTypes';

export const getDefaultChallengeTotal = (
  resetType: ChallengesStorageKey,
  type?: keyof typeof challengeTypes,
): number | undefined => {
  if (!type) {
    return undefined;
  }

  const { options } = challengeTypes[type];
  const index = resetType === 'dailies' ? 0 : 1;
  return options[index];
};

export const getIncompleteChallenges = (challenges: ChallengeProgress[]) =>
  challenges.filter(c => c.progress < c.total);

export const getIncompleteChallengeUnits = (challenges: ChallengeProgress[]) =>
  getIncompleteChallenges(challenges)
    .map(c => c.grouping)
    .flat();

// given a list of challenges, create a map where the key is the unitId and the value is
// a list of total progress required for each challenge type
export const createUnitChallengeMap = (challenges: ChallengeProgress[]) => {
  const unitIds = [...new Set(getIncompleteChallengeUnits(challenges))];

  const result: UnitChallengeSummary = {};

  unitIds.forEach(unitId => {
    challenges.forEach(challenge => {
      if (!challenge.grouping.includes(unitId)) {
        return;
      }

      if (!result[unitId]) {
        result[unitId] = {};
      }

      if (!result[unitId][challenge.type]) {
        result[unitId][challenge.type] = {
          progress: 0,
          total: 0,
        };
      }

      result[unitId][challenge.type].progress += challenge.progress;
      result[unitId][challenge.type].total += challenge.total;
    });
  });

  return result;
};
