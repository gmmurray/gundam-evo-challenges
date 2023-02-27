import { Unit, unitOptions } from '../data/units';

import { UnitGrouping } from '../data/unitGroupings';
import { firstBy } from 'thenby';

export const getUnitsFromGrouping = (grouping: UnitGrouping): Unit[] => {
  return grouping.map(id => unitOptions[id]);
};

export const getUnitAvatarUrl = (unit: Unit) =>
  `/images/units/avatars/${unit.imageName}`;

export const getUnitFullUrl = (unit: Unit) =>
  `/images/units/full/${unit.imageName}`;

export const getUnitOfficialUrl = (unit: Unit) =>
  `https://gundamevolution.com/en/unit/${unit.websiteId}`;

export const groupingsAreEqual = (
  grouping1: UnitGrouping,
  grouping2: UnitGrouping,
) => grouping1.every(id => grouping2.includes(id));

export const groupingAlreadyExists = (
  current: UnitGrouping[],
  added: string[],
) => {
  return (
    current.findIndex(g => groupingsAreEqual(added as UnitGrouping, g)) !== -1
  );
};

export const groupingIsCorrectLength = (added: string[]) => added.length === 4;

export const sortUnitGroupings = (groupings: UnitGrouping[]) => {
  const input = [...groupings];
  return input.sort(
    firstBy<UnitGrouping>((v1, v2) => sorter(v1, v2, 0), {
      ignoreCase: true,
    }).thenBy<UnitGrouping>((v1, v2) => sorter(v1, v2, 1), {
      ignoreCase: true,
    }),
  );
};

const sorter = (v1: UnitGrouping, v2: UnitGrouping, index: number) =>
  v1[index] > v2[index] ? 1 : -1;
