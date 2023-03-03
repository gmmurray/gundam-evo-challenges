import { ChallengesStorageKey } from '../types/challenges';
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
