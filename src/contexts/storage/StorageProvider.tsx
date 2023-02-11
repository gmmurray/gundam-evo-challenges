import { PropsWithChildren, useCallback } from 'react';
import {
  StorageContext,
  StorageContextType,
  defaultStorageContext,
} from './storageContext';

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

  const contextValue: StorageContextType = {
    localStorage: {
      ...localStorageState,
    },
    updateChallenge: handleUpdateChallenge,
    resetChallenges: handleResetChallenges,
    updateUserGroupings: handleUpdateUserGroupings,
  };

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
