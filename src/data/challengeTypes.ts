import { ChallengeType } from '../types/challenges';

const defaultIncrement: ChallengeType['increment'] = prev => prev + 1;
const damageIncrement: ChallengeType['increment'] = prev => prev + 1000;

export const challengeTypes: Record<string, ChallengeType> = {
  wins: {
    title: 'Win matches',
    increment: defaultIncrement,
    options: [1, 7],
  },
  damage: {
    title: 'Inflict damage',
    increment: damageIncrement,
    options: [20000, 100000],
  },
  revives: {
    title: 'Revive teammates',
    increment: defaultIncrement,
    options: [1, 5],
  },
  games: {
    title: 'Play matches',
    increment: defaultIncrement,
    options: [2, 15],
  },
  crits: {
    title: 'Get critical hit kills',
    increment: defaultIncrement,
    options: [5],
  },
  repair: {
    title: 'Repair HP for self or team members',
    increment: damageIncrement,
    options: [2500, 10000],
  },
  kills: {
    title: 'Kills',
    increment: defaultIncrement,
    options: [5, 30],
  },
  gman: {
    title: 'Use G-Maneuver',
    increment: defaultIncrement,
    options: [3, 20],
  },
};
