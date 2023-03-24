import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getIncompleteChallengeUnits } from '../../helpers/challengeHelpers';
import { unitOptions } from '../../data/units';
import { useStorageContext } from '../storage/storageContext';

export type RecommendationContextValue = {
  recommendations: { challenges: number; units: string[] }[];
};

export const defaultRecommendationContextValue: RecommendationContextValue = {
  recommendations: [],
};

export const RecommendationContext = createContext<RecommendationContextValue>(
  defaultRecommendationContextValue,
);

export const useRecommendationContext = () => useContext(RecommendationContext);

const RECOMMENDATION_COUNT = 3;

export const RecommendationProvider = ({ children }: PropsWithChildren) => {
  const {
    localStorage: { dailies, weeklies },
  } = useStorageContext();
  const [unitMap, setUnitMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const unitIds = [
      ...getIncompleteChallengeUnits(Object.values(dailies)),
      ...getIncompleteChallengeUnits(Object.values(weeklies)),
    ];

    const map: typeof unitMap = {};
    unitIds.forEach(id => {
      if (map[id] === undefined) {
        map[id] = 0;
      }
      map[id]++;
    });
    setUnitMap(map);
  }, [dailies, weeklies]);

  const recommendations = useMemo(() => {
    const map = new Map<number, string[]>();
    Object.keys(unitMap).forEach(key => {
      const count = unitMap[key];
      if (count <= 1) {
        return;
      }
      if (!map.has(count)) {
        map.set(count, []);
      }

      map.set(count, [...(map.get(count) ?? []), key]);
    });
    return [...map.entries()]
      .sort((a, b) => (a[0] > b[0] ? -1 : 1))
      .map(entry => ({
        challenges: entry[0],
        units: entry[1].sort((a, b) =>
          unitOptions[a].name.toLocaleLowerCase() >
          unitOptions[b].name.toLocaleLowerCase()
            ? 1
            : -1,
        ),
      }))
      .slice(0, RECOMMENDATION_COUNT);
  }, [unitMap]);

  const contextValue: RecommendationContextValue = {
    recommendations,
  };

  return (
    <RecommendationContext.Provider value={contextValue}>
      {children}
    </RecommendationContext.Provider>
  );
};
