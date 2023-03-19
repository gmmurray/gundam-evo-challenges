import { ChallengeType } from '../types/challenges';

const incrementer = (prev: number, total: number, amount: number) =>
  Math.min(prev + amount, total);
const incrementByOne: ChallengeType['increment'] = (prev, total) =>
  incrementer(prev, total, 1);
const incrementByThousands: ChallengeType['increment'] = (prev, total) => {
  const incrementAmount = total === 100000 ? 5000 : 1000;
  return incrementer(prev, total, incrementAmount);
};

export const challengeTypes: Record<string, ChallengeType> = {
  wins: {
    title: 'Win matches',
    increment: incrementByOne,
    options: [1, 7],
  },
  damage: {
    title: 'Inflict damage',
    increment: incrementByThousands,
    options: [20000, 100000],
  },
  revives: {
    title: 'Revive teammates',
    increment: incrementByOne,
    options: [1, 5],
  },
  games: {
    title: 'Play matches',
    increment: incrementByOne,
    options: [2, 15],
  },
  crits: {
    title: 'Get critical hit kills',
    increment: incrementByOne,
    options: [1, 5],
  },
  repair: {
    title: 'Repair HP for self or team members',
    increment: incrementByThousands,
    options: [2500, 10000],
  },
  kills: {
    title: 'Kills',
    increment: incrementByOne,
    options: [5, 30],
  },
  gman: {
    title: 'Use G-Maneuver',
    increment: incrementByOne,
    options: [3, 20],
  },
};
