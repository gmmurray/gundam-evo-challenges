import { Context, createContext, useContext } from 'react';

type PersonalDetailsContextValue = {
  showPersonalDetails: boolean;
};

const defaultPersonalDetailsValue: PersonalDetailsContextValue = {
  showPersonalDetails: false,
};

export const PersonalDetailsContext: Context<PersonalDetailsContextValue> =
  createContext(defaultPersonalDetailsValue);

export const usePersonalDetailsContext = () =>
  useContext(PersonalDetailsContext);
