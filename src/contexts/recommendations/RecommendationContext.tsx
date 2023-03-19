import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { ChallengeProgress } from '../../types/challenges';
import { useStorageContext } from '../storage/storageContext';

export type RecommendationContextValue = {
  recommendations: string[];
};

export const defaultRecommendationContextValue: RecommendationContextValue = {
  recommendations: [],
};

export const RecommendationContext = createContext<RecommendationContextValue>(
  defaultRecommendationContextValue,
);

export const useRecommendationContext = () => useContext(RecommendationContext);

const RECOMMENDATION_COUNT = 3;

const getIncompleteChallengeUnits = (challenges: ChallengeProgress[]) =>
  challenges
    .filter(c => c.progress < c.total)
    .map(c => c.grouping)
    .flat();

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

  const orderedUnits = useMemo(
    () =>
      Object.keys(unitMap)
        .sort((a, b) => (unitMap[a] > unitMap[b] ? -1 : 1))
        .slice(0, RECOMMENDATION_COUNT)
        .filter(key => unitMap[key] > 1),
    [unitMap],
  );

  const contextValue: RecommendationContextValue = {
    recommendations: orderedUnits,
  };

  return (
    <RecommendationContext.Provider value={contextValue}>
      {children}
    </RecommendationContext.Provider>
  );
};
