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
  },
  damage: {
    title: 'Inflict damage',
    updateProgress: incrementByThousands,
    options: [20000, 100000],
  },
  revives: {
    title: 'Revive teammates',
    updateProgress: incrementByOne,
    options: [1, 5],
  },
  games: {
    title: 'Play matches',
    updateProgress: incrementByOne,
    options: [2, 15],
  },
  crits: {
    title: 'Get critical hit kills',
    updateProgress: incrementByOne,
    options: [1, 5],
  },
  repair: {
    title: 'Repair HP for self or team members',
    updateProgress: incrementByThousands,
    options: [2500, 10000],
  },
  kills: {
    title: 'Kills',
    updateProgress: incrementByOne,
    options: [5, 30],
  },
  gman: {
    title: 'Use G-Maneuver',
    updateProgress: incrementByOne,
    options: [3, 20],
  },
};
