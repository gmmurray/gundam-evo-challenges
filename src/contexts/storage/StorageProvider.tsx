import { PropsWithChildren, useCallback } from 'react';
import {
  StorageContext,
  StorageContextType,
  defaultStorageContext,
} from './storageContext';

import deepMerge from 'ts-deepmerge';
import useLocalStorageState from 'use-local-storage-state';

type Props = {} & PropsWithChildren;
const StorageProvider = ({ children }: Props) => {
  const [localStorageState, setLocalStorageState] = useLocalStorageState<
    StorageContextType['localStorage']
  >('gundam-evo-challenges', {
    defaultValue: { ...defaultStorageContext.localStorage },
  });

  const handleUpdateChallenge = useCallback<
    StorageContextType['updateChallenge']
  >(
    (type, key, challenge) => {
      const isCompletion = challenge && challenge.progress === challenge.total;
      setLocalStorageState(state => ({
        ...state,
        [type]: {
          ...state[type],
          [key]: challenge,
        },
        userStats: {
          ...(state.userStats ?? {}),
          completedChallenges: [
            ...((state.userStats ?? {}).completedChallenges ?? []),
            ...(isCompletion ? [{ ...challenge, reset: type }] : []),
          ],
        },
      }));
    },
    [setLocalStorageState],
  );

  const handleResetChallenges = useCallback<
    StorageContextType['resetChallenges']
  >(
    type => {
      setLocalStorageState(state => ({
        ...state,
        [type]: {},
      }));
    },
    [setLocalStorageState],
  );

  const handleUpdateUserGroupings = useCallback<
    StorageContextType['updateUserGroupings']
  >(
    newGrouping => {
      setLocalStorageState(state => {
        const existingIndex = state.userGroupings.findIndex(g =>
          newGrouping.every(ng => g.includes(ng)),
        );

        // remove the grouping if it already exists, otherwise add it
        const userGroupings =
          existingIndex !== -1
            ? state.userGroupings.filter((_, index) => index !== existingIndex)
            : [...state.userGroupings, newGrouping];

        return {
          ...state,
          userGroupings,
        };
      });
    },
    [setLocalStorageState],
  );

  const handleUpdatePreferences = useCallback<
    StorageContextType['updatePreferences']
  >(
    userPreferences => {
      setLocalStorageState(state => ({ ...state, userPreferences }));
    },
    [setLocalStorageState],
  );

  const handleSwapChallenges = useCallback<
    StorageContextType['swapChallenges']
  >(
    (first, second, type) => {
      setLocalStorageState(state => {
        const newFirst = state[type][second]
          ? { ...state[type][second] }
          : undefined;
        const newSecond = state[type][first]
          ? { ...state[type][first] }
          : undefined;
        return {
          ...state,
          [type]: {
            ...state[type],
            [first]: newFirst,
            [second]: newSecond,
          },
        };
      });
    },
    [setLocalStorageState],
  );

  const contextValue: StorageContextType = {
    localStorage: {
      ...deepMerge(defaultStorageContext.localStorage, localStorageState),
    },
    updateChallenge: handleUpdateChallenge,
    swapChallenges: handleSwapChallenges,
    resetChallenges: handleResetChallenges,
    updateUserGroupings: handleUpdateUserGroupings,
    updatePreferences: handleUpdatePreferences,
  };

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
