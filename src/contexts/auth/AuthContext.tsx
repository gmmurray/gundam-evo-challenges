import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import firebase from 'firebase/compat/app';
import { firebaseAuth } from '../../config/firebase';

export type AuthContextValueType = {
  user?: firebase.User;
};

export const defaultAuthContextValue: AuthContextValueType = {
  user: undefined,
};

export const AuthContext = createContext<AuthContextValueType>(
  defaultAuthContextValue,
);

export const useAuthContext = () => useContext(AuthContext);

type Props = {} & PropsWithChildren;

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthContextValueType['user']>(undefined);

  useEffect(() => {
    const unregister = firebaseAuth.onAuthStateChanged(user => {
      setUser(user ?? undefined);
    });

    return () => unregister();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
