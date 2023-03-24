import {
  ChallengeProgress,
  ChallengesStorageKey,
  SummarySortOptions,
  UnitChallengeSummary,
  UnitSummaryRecord,
} from '../types/challenges';

import { challengeTypes } from '../data/challengeTypes';
import { unitOptions } from '../data/units';

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

export const getSummaryRecordsFromMap = (
  summary: UnitChallengeSummary,
): UnitSummaryRecord[] =>
  Object.keys(summary).map(key => ({
    unitId: key,
    summary: summary[key],
  }));

const searchSummaryRecords = (
  summaries: UnitSummaryRecord[],
  search: string,
) => {
  let result: UnitSummaryRecord[];

  if (search === '') {
    result = summaries;
  } else {
    result = summaries.filter(s => {
      const name = unitOptions[s.unitId].name.toLocaleLowerCase();
      return name.includes(search.toLocaleLowerCase());
    });
  }

  return result;
};

const sortSummaryRecords = (
  summaries: UnitSummaryRecord[],
  { sort, order }: SummarySortOptions,
): UnitSummaryRecord[] => {
  const result = [...summaries];
  const condition = (a: UnitSummaryRecord, b: UnitSummaryRecord) => {
    if (sort === 'challengeCount') {
      return Object.values(a.summary).length > Object.values(b.summary).length;
    } else {
      return unitOptions[a.unitId].name > unitOptions[b.unitId].name;
    }
  };

  result.sort((a, b) => {
    let sortResult = condition(a, b) ? 1 : -1;
    if (order === 'desc') {
      sortResult *= -1;
    }
    return sortResult;
  });

  return result;
};

export const searchAndSortSummaryRecords = (
  summaries: UnitSummaryRecord[],
  search: string,
  sortOptions: SummarySortOptions,
): UnitSummaryRecord[] => {
  const searched = searchSummaryRecords(summaries, search);
  const sorted = sortSummaryRecords(searched, sortOptions);
  return [...sorted];
};
