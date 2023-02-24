import { Unit, unitOptions } from '../data/units';

import { UnitGrouping } from '../data/unitGroupings';

export const getUnitsFromGrouping = (grouping: UnitGrouping): Unit[] => {
  return grouping.map(id => unitOptions[id]);
};

export const getUnitAvatarUrl = (unit: Unit) => `/images/units/${unit.avatar}`;

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
