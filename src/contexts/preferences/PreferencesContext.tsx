import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  defaultStorageContext,
  useStorageContext,
} from '../storage/storageContext';

import { IUserPreferences } from '../../types/userPreferences';
import PreferencesEditor from '../../components/preferences/PreferencesEditor';

export type PreferencesContextValue = {
  preferences: IUserPreferences;
  dialog: {
    open: boolean;
  };
  onDialogToggle: () => void;
  onPreferencesChange: (key: keyof IUserPreferences, value: any) => void;
};

export const defaultPreferencesContextValue: PreferencesContextValue = {
  preferences: {
    ...defaultStorageContext.localStorage.userPreferences,
  },
  dialog: {
    open: false,
  },
  onDialogToggle: () => {},
  onPreferencesChange: () => {},
};

export const PreferencesContext = createContext<PreferencesContextValue>(
  defaultPreferencesContextValue,
);

export const usePreferences = () => useContext(PreferencesContext);

type Props = {} & PropsWithChildren;

export const PreferencesProvider = (props: Props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const { localStorage, updatePreferences } = useStorageContext();

  const handleUpdatePreferences = useCallback(
    (key: keyof IUserPreferences, value: any) => {
      updatePreferences({ ...localStorage.userPreferences, [key]: value });
    },
    [localStorage, updatePreferences],
  );

  const handleDialogOpenToggle = useCallback(() => {
    setDialogVisible(state => !state);
  }, []);

  const contextValue: PreferencesContextValue = {
    preferences: {
      ...localStorage.userPreferences,
    },
    dialog: {
      open: dialogVisible,
    },
    onDialogToggle: handleDialogOpenToggle,
    onPreferencesChange: handleUpdatePreferences,
  };

  return (
    <PreferencesContext.Provider value={contextValue}>
      {props.children}
      <PreferencesEditor
        open={dialogVisible}
        onClose={handleDialogOpenToggle}
      />
    </PreferencesContext.Provider>
  );
};
