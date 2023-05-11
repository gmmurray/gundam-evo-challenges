import { ChallengeProgress, ChallengesStorageKey } from './challenges';

export interface IUserStats {
  completedChallenges: (ChallengeProgress & { reset: ChallengesStorageKey })[];
}
