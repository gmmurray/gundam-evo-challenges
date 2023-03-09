import {
  DataContext,
  DataContextValueType,
  defaultDataContextValue,
} from './dataContext';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAuthContext } from '../auth/AuthContext';
import useLocalStorageState from 'use-local-storage-state';

// TODO: if a user is signed in, server state is the source of truth updates should go to server which should then update the local state based on a successful server update
type Props = {} & PropsWithChildren;
const DataContextProvider = ({ children }: Props) => {
  const [localStorageState, setLocalStorageState] = useLocalStorageState<
    DataContextValueType['challengeData']
  >('gundam-evo-challenges', {
    defaultValue: { ...defaultDataContextValue.challengeData },
  });
  const [serverStorageState, setServerStorageState] = useState<
    DataContextValueType['challengeData']
  >({ ...defaultDataContextValue.challengeData });
  const { user } = useAuthContext();

  const dataSourceOfTruth = useMemo(
    () => (user ? serverStorageState : localStorageState),
    [localStorageState, serverStorageState, user],
  );

  useEffect(() => {
    if (user) {
      setLocalStorageState(serverStorageState);
    }
  }, [serverStorageState, setLocalStorageState, user]);

  const handleDataUpdate = useCallback(
    (data: DataContextValueType['challengeData']) => {
      if (user) {
        // save to server
        setServerStorageState(data);
      } else {
        setLocalStorageState(data);
      }
    },
    [setLocalStorageState, user],
  );

  const handleUpdateChallenge = useCallback<
    DataContextValueType['updateChallenge']
  >(
    (type, key, challenge) => {
      const newValue = {
        ...dataSourceOfTruth,
        [type]: {
          ...dataSourceOfTruth[type],
          [key]: challenge,
        },
      };
      handleDataUpdate(newValue);
      // setLocalStorageState(state => ({
      //   ...state,
      //   [type]: {
      //     ...state[type],
      //     [key]: challenge,
      //   },
      // }));
    },
    [dataSourceOfTruth, handleDataUpdate],
  );

  const handleResetChallenges = useCallback<
    DataContextValueType['resetChallenges']
  >(
    type => {
      handleDataUpdate({
        ...dataSourceOfTruth,
        [type]: {},
      });
      // setLocalStorageState(state => ({
      //   ...state,
      //   [type]: {},
      // }));
    },
    [dataSourceOfTruth, handleDataUpdate],
  );

  const handleUpdateUserGroupings = useCallback<
    DataContextValueType['updateUserGroupings']
  >(
    newGrouping => {
      const existingIndex = dataSourceOfTruth.userGroupings.findIndex(g =>
        newGrouping.every(ng => g.includes(ng)),
      );

      // remove the grouping if it already exists, otherwise add it
      const userGroupings =
        existingIndex !== -1
          ? dataSourceOfTruth.userGroupings.filter(
              (_, index) => index !== existingIndex,
            )
          : [...dataSourceOfTruth.userGroupings, newGrouping];

      handleDataUpdate({
        ...dataSourceOfTruth,
        userGroupings,
      });
      // setLocalStorageState(state => {
      //   const existingIndex = state.userGroupings.findIndex(g =>
      //     newGrouping.every(ng => g.includes(ng)),
      //   );

      //   // remove the grouping if it already exists, otherwise add it
      //   const userGroupings =
      //     existingIndex !== -1
      //       ? state.userGroupings.filter((_, index) => index !== existingIndex)
      //       : [...state.userGroupings, newGrouping];

      //   return {
      //     ...state,
      //     userGroupings,
      //   };
      // });
    },
    [dataSourceOfTruth, handleDataUpdate],
  );

  const contextValue: DataContextValueType = {
    challengeData: {
      ...localStorageState,
    },
    updateChallenge: handleUpdateChallenge,
    resetChallenges: handleResetChallenges,
    updateUserGroupings: handleUpdateUserGroupings,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
