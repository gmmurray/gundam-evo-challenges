import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { UnitChallengeSummary } from '../../types/challenges';
import { createUnitChallengeMap } from '../../helpers/challengeHelpers';
import { useStorageContext } from '../storage/storageContext';

export type SummaryContextValue = {
  unitSummary: UnitChallengeSummary;
};

export const defaultSummaryContextValue: SummaryContextValue = {
  unitSummary: {},
};

export const SummaryContext = createContext<SummaryContextValue>(
  defaultSummaryContextValue,
);

export const useSummaryContext = () => useContext(SummaryContext);

const SummaryProvider = ({ children }: PropsWithChildren) => {
  const {
    localStorage: { dailies, weeklies },
  } = useStorageContext();
  const [unitSummary, setUnitSummary] = useState<
    SummaryContextValue['unitSummary']
  >(defaultSummaryContextValue.unitSummary);

  useEffect(() => {
    const summary = createUnitChallengeMap([
      ...Object.values(dailies),
      ...Object.values(weeklies),
    ]);
    setUnitSummary(summary);
  }, [dailies, weeklies]);

  const contextValue: SummaryContextValue = {
    unitSummary,
  };

  return (
    <SummaryContext.Provider value={contextValue}>
      {children}
    </SummaryContext.Provider>
  );
};

export default SummaryProvider;
