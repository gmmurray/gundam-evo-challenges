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
      setLocalStorageState(state => ({
        ...state,
        [type]: {
          ...state[type],
          [key]: challenge,
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

  const contextValue: StorageContextType = {
    localStorage: {
      ...deepMerge(defaultStorageContext.localStorage, localStorageState),
    },
    updateChallenge: handleUpdateChallenge,
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
