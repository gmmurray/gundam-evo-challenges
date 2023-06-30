import { ChallengeType } from '../types/challenges';

const incrementer = (
  prev: number,
  total: number,
  amount: number,
  isIncrement: boolean,
) => Math.min(Math.max(prev + (isIncrement ? amount : -amount), 0), total);
const incrementByOne: ChallengeType['updateProgress'] = (
  prev,
  total,
  isIncrement,
) => incrementer(prev, total, 1, isIncrement);
const incrementByThousands: ChallengeType['updateProgress'] = (
  prev,
  total,
  isIncrement,
) => {
  const incrementAmount = total === 100000 ? 5000 : 1000;
  return incrementer(prev, total, incrementAmount, isIncrement);
};

export const challengeTypes: Record<string, ChallengeType> = {
  wins: {
    title: 'Win matches',
    updateProgress: incrementByOne,
    options: [1, 7],
    shortTitle: 'Wins',
  },
  damage: {
    title: 'Inflict damage',
    updateProgress: incrementByThousands,
    options: [20000, 100000],
    shortTitle: 'Damage',
  },
  revives: {
    title: 'Revive teammates',
    updateProgress: incrementByOne,
    options: [1, 5],
    shortTitle: 'Revives',
  },
  games: {
    title: 'Play matches',
    updateProgress: incrementByOne,
    options: [1, 15, 2],
    shortTitle: 'Games',
  },
  crits: {
    title: 'Get critical hit kills',
    updateProgress: incrementByOne,
    options: [1, 5],
    shortTitle: 'Crit kills',
  },
  repair: {
    title: 'Repair HP for self or team members',
    updateProgress: incrementByThousands,
    options: [2500, 10000],
    shortTitle: 'Heals',
  },
  kills: {
    title: 'Kills',
    updateProgress: incrementByOne,
    options: [5, 30],
    shortTitle: 'Kills',
  },
  gman: {
    title: 'Use G-Maneuver',
    updateProgress: incrementByOne,
    options: [3, 20],
    shortTitle: 'G-Maneuvers',
  },
};
